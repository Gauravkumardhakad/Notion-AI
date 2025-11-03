import NextAuth from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./db";
import bcrypt from "bcryptjs";


export const handler=NextAuth({
    adapter:PrismaAdapter(prisma),
    providers:[
        CredentialsProvider({
            name:"Sign in with Email",

            credentials:{
                email:{label:"Username", type:"text" , placeholder:"enter email"},
                password:{label:"password", type:"password", placeholder:"enter password"}
            },

            async authorize(credentials){
                // logic here to verify the credentials
                const enteredEmail=credentials?.email;
                const enteredPassword=credentials?.password;

                const user=await prisma.user.findUnique({where:{email:enteredEmail}});

                if(!user) {
                    return null;
                }
                // i will implement bcrypt logic later here
                const isValid=(user.password===enteredPassword);

                if(isValid){
                    return user;
                }
                else{
                    return null;
                }
            },
            
        })
    ],
    secret:process.env.NEXTAUTH_SECRET
})