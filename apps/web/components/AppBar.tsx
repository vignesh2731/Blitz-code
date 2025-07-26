"use client"
import { motion } from "framer-motion";
import {Button} from '@repo/ui/button'
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export function AppBar()
{
    const session=useSession();
    return (
         <motion.div
      className="w-full bg-slate-200 h-20  flex flex-col justify-center px-10 shadow-md"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
        <div className="flex justify-between items-center">
            <div className="flex gap-10">
                <div className="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
                <div className="text-2xl font-bold font-serif text-blue-900">
                    Blitz Code
                </div>
            </div>
            <div className="flex justify-end col-span-2 gap-20">
                <div>
                    <Button label={session.data?"Logout" : "Login"} onClick={async()=>{
                        if(!session.data)redirect('/api/auth/signin');
                        else await signOut();
                    }}/>
                </div>
                <div className="cursor-pointer pt-3">
                    {session.data && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                        </svg>
                    }
                </div>
            </div>
        </div>
    </motion.div>
    )
}