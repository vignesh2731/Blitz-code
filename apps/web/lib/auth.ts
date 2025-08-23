import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from '@repo/db/client';
export const authOption={
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{label:"Email",placeholder:"user@gmail.com",type:"text"},
                password:{label:"Password",placeholder:"secret",type:"password"}
            },
            async authorize(credentials, req) {
                const user=await prisma.user.findFirst({
                    where:{
                        email:credentials?.email,
                        password:credentials?.password
                    }
                })
                if(!user)return null;
                return user;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    callbacks:{
        async redirect({url,baseUrl}:any)
        {
            return "/dashboard";
        },
        async jwt({user,token}:any)
        {
            if(user)token.id=user.id;
            return token;
        },
        async session({session,token,user}:any)
        {
            if(session && session.user)session.user.id=(token.id || user.id) as string ;
            return session;
        }
    },
    secret:process.env.NEXTAUTH_SECRET
}