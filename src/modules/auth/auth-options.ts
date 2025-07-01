import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'

import { BACKEND_URL } from '../../lib/constants'

import { parseErrorHttpMessage } from '@/lib/http/parse-error-http'

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
          const res = await fetch(BACKEND_URL + '/auth/iniciar-sesion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo: email, contraseña: password }),
          })

          const user = await res.json()
          if (!res.ok) {
            const message = parseErrorHttpMessage(user.message)
            throw new Error(message)
          }

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
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) return { ...token, ...user }

      if (trigger === 'update' && session?.tokens) {
        token.tokens = {
          access: session.tokens.access,
          refresh: session.tokens.refresh,
        }
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user
      session.tokens = token.tokens
      return session
    },
  },
}
