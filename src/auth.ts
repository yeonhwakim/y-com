import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: credentials.username,
            password: credentials.password,
          }),
        })
        if (!authResponse.ok) {
          return null
        }
        const user = await authResponse.json()
        console.log('user', user);
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        }
      },
    })
  ],
})