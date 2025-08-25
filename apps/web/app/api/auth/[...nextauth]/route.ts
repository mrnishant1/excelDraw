import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../../lib/db";


const handler = NextAuth({
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
      async authorize(credentials, req) {
        // const prisma = new PrismaClient();
        const email = credentials?.Email;
        const password = credentials?.password;
        //do the db checks
        const res = await prisma.user.findFirst({
          where: { email: email },
        });

        if (res) {
          if (password != res.password) {
            return null;
          }
          const user = { id: res.id.toString(), email: res.email };
          return user;
        } else {
          if (email && password) {
            const creation = await prisma.user.create({
              data: { email: email, password: password },
            });
            let user = { id: creation.id.toString(), email: creation.email };
            return user;
          }
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      await prisma.user.upsert({
        where: { email: user.email ?? undefined},
        update: {},
        create: {
            email: user.email??"",
            firstName: user.name??""
        },
      });

      return true;
    },
    
  },
});

export { handler as GET, handler as POST };
