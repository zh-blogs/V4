interface GithubMembership {
  state: 'active' | 'pending'
  role: 'admin' | 'member'
}

interface UserSession {
  github: string
  hasPermission: boolean
  isAdmin: boolean
}

const GITHUB_API_VERSION = '2022-11-28'

export default defineOAuthGitHubEventHandler({
  config: {
    scope: ['read:org']
  },
  async onSuccess(event, { user, tokens }) {
    const headers = {
      'Authorization': `Bearer ${tokens.access_token}`,
      'Accept': 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': GITHUB_API_VERSION
    }

    const userSession: UserSession = {
      github: `${user.login}${user.id}${user.name}`,
      hasPermission: false,
      isAdmin: false
    }

    try {
      const isMember = await checkOrgMembership(user.login, headers)
      if (!isMember) {
        throw createError({
          statusCode: 403,
          message: '您不是组织成员，无权访问'
        })
      }

      const membership = await getOrgMembershipDetails(user.login, headers)
      if (membership.state === 'active') {
        userSession.hasPermission = true
        userSession.isAdmin = membership.role === 'admin'
      }

      await setUserSession(event, { user: userSession })
      return sendRedirect(event, '/admin')

    } catch (error) {
      if (isPermissionError(error)) {
        throw error;
      }
      console.error('验证组织成员身份时出错:', error);
      throw createError({
        statusCode: 500,
        message: '服务器处理请求时出错'
      });
    }
  },
  onError(event, error) {
    console.error('GitHub OAuth 错误:', {
      statusCode: error.statusCode,
      message: error.message,
      stack: error.stack
    })
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || '认证过程中发生错误'
    })
  },
})

function isPermissionError(error: unknown): error is { statusCode: number } {
  return (
    !!error &&
    typeof error === 'object' &&
    'statusCode' in error &&
    error.statusCode === 403
  );
}

async function checkOrgMembership(username: string, headers: HeadersInit): Promise<boolean> {
  const response = await fetch(
    `https://api.github.com/orgs/zh-blogs/members/${username}`,
    { headers }
  )
  return response.status === 204
}

async function getOrgMembershipDetails(username: string, headers: HeadersInit): Promise<GithubMembership> {
  const response = await fetch(
    `https://api.github.com/orgs/zh-blogs/memberships/${username}`,
    { headers }
  )
  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      message: '获取用户组织信息失败'
    })
  }
  return response.json()
}