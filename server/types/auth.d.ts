declare module '#auth-utils' {
  interface UserSession {
    user?: User
    secure?: SecureSessionData
  }

  interface User {
    id: string
    name: string
    hasPermission: boolean
    isAdmin: boolean
  }

  interface SecureSessionData {
  }
}
export {}