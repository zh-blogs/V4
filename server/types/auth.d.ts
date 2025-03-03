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

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface SecureSessionData {}
}
export {}
