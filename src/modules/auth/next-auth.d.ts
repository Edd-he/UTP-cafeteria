import 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: number
      rol: string
      correo: string
      usuario: string
    }
    tokens: {
      access: string
      refresh: string
    }
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: number
      rol: string
      correo: string
      usuario: string
    }
    tokens: {
      access: string
      refresh: string
    }
  }
}
