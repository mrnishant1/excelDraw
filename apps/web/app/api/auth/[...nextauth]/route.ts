import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../../lib/db";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions= { 
providers: [
  CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Email",
      credentials: {
        Email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req)
      {
        const user = await prisma.user.findFirst({where:{email: credentials?.Email}});
        if(!user) return null;
        if(credentials?.password !== user.password) return null
        console.log(JSON.stringify(user.id))
        return {id: user.id.toString(), email:user.email}
      },
    }),

GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
],



secret: process.env.NEXTAUTH_SECRET,



callbacks: {
  async signIn({ user }) {
    if (!user.email) return false;

    // Ensure user exists in DB
    const dbUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: { email: user.email, name: user.name ?? "" },
    });
    console.log(JSON.stringify(dbUser))

    // Attach DB id to user object
    user.id = dbUser.id.toString();
    return true;
  },

     async jwt({ token, user }) {
      if (user) {
        token.id = user.id;   // consistent across providers
        token.email = user.email;
      }
      return token;
    },


    async session({ session, token }) {
  if (session.user) {
    session.user.id = token.id as string;   // attach from jwt
    session.user.email = token.email as string;
  }
  return session;
}
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
