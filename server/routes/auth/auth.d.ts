declare module '#auth-utils' {
  interface UserSession {
    user?: User
    secure?: SecureSessionData
  }

  interface User {
    github: string
    hasPermission: boolean
    isAdmin: boolean
  }

  interface SecureSessionData {
  }
}
export {}