export default defineNuxtRouteMiddleware((to) => {
  const userSession = useUserSession().session.value.user

  if (to.path.startsWith('/admin')) {
    if (!userSession) {
      return abortNavigation('请使用含有管理员权限的 Github 账户进行登录')
    }

    if (!userSession.hasPermission) {
      return abortNavigation({
        statusCode: 403,
        message: '对不起，您没有权限访问此页面，请联系管理员处理此问题'
      })
    }

    return
  }

  return
})
