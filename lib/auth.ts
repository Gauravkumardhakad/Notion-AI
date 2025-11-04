import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Sign in with Email",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter email" },
        password: { label: "Password", type: "password", placeholder: "Enter password" },
      },
      async authorize(credentials):Promise<any> {
        const enteredEmail = credentials?.email;
        const enteredPassword = credentials?.password;

        const user = await prisma.user.findUnique({ where: { email: enteredEmail } });

        if (!user) return null;

        // bcrypt logic baad me 
        
        const isValid =await bcrypt.compare(enteredPassword,user.password);
        return isValid ? user : null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions);
