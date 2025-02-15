export default defineOAuthGitHubEventHandler({
  config: {
    scope: ["read:org"]
  },
  async onSuccess(event, { user, tokens }) {
    try {
      const response = await fetch('https://api.github.com/orgs/zh-blogs/members/' + user.login, {
        headers: {
          'Authorization': `Bearer ${tokens.access_token}`,
          'Accept': 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
      if (response.status === 204) {
        await setUserSession(event, {
          user: {
            github: user.login + user.id,
            hasPermission: true
          }
        })
        return sendRedirect(event, '/admin')
      } else {
        throw createError({
          statusCode: 403,
          message: '您不是组织成员，无权访问'
        })
      }
    } catch (error) {
      console.error('检查组织成员身份失败:', error)
      throw createError({
        statusCode: 500,
        message: '验证组织成员身份时出错'
      })
    }
  },
  onError(event, error) {
    console.error('GitHub OAuth error:', error)
    throw createError({
      statusCode: error.statusCode,
      message: error.message
    })
  },
})