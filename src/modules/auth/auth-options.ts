import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'

import { BACKEND_URL } from '../../lib/constants'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password', placeholder: '*****' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const { email, password } = credentials

        try {
          const response = await fetch(BACKEND_URL + '/auth/iniciar-sesion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo: email, contraseña: password }),
          })
          if (!response.ok) {
            const errorBody = await response.json()

            const message = errorBody.message?.[0] || 'Error desconocido'
            throw new Error(message)
          }

          const user = await response.json()
          return user
        } catch (e) {
          if (e instanceof Error)
            throw new Error(e.message || 'Error desconocido')
          console.error('Error en la solicitud:', e)
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user }
      return token
    },
    async session({ session, token }) {
      session.user = token.user
      session.tokens = token.tokens
      return session
    },
  },
}
