import CredentialsProvider from "next-auth/providers/credentials";
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
        })
    ],
    callbacks:{
        async redirect({url,baseUrl}:any)
        {
            return "/dashboard";
        },
        async jwt({user,token}:any)
        {
            return token;
        },
        async session({session,token}:any)
        {
            if(session && session.user)session.user.id=token.sub;
            return session;
        }
    },
    secret:process.env.NEXTAUTH_SECRET
}