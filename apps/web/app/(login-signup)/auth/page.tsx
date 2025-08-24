"use client"
import { checkUser } from "@lib/lib";
import { signIn } from "next-auth/react";
import { useState } from "react"

export default function Page()
{
    const[loginCreds,setLoginCreds]=useState({email:"",password:""});
    const[signupCreds,setSignupCreds]=useState({email:"",password:"",name:""});
    const[error,setError]=useState("");
    const[error2,setError2]=useState("");
    return(
    <div className="min-h-screen bg-slate-200 flex flex-col justify-center items-center">
        <div className="grid grid-cols-2 gap-40 -mt-10">
            <div className="bg-white h-[450px] w-[400px] flex justify-center rounded-lg">
                <div className="flex flex-col gap-20 pt-10">
                    <div className="flex justify-center text-2xl font-bold">
                        Login 
                    </div>
                    <div className="flex flex-col gap-10">
                        
                        <input type="text" placeholder="Username" onChange={(e)=>{
                           setLoginCreds(creds=>({
                            ...creds,
                            email:e.target.value
                           }))                        
                        }} className="border border-solid border-black p-2"/>

                        <input type="password" placeholder="Password" onChange={(e)=>{
                           setLoginCreds(creds=>({
                            ...creds,
                            password:e.target.value
                           }))                        
                        }} className="border border-solid border-black p-2"/>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-5">
                        <button className="border-2 rounded-sm border-black hover:bg-slate-200 hover:animate-bounce h-10 w-40" onClick={async()=>{
                            const res=await signIn("credentials",{email:loginCreds.email,password:loginCreds.password});
                            if(res?.error)setError("Invalid creds")
                        }}>Click here to Login</button>
                        <div className="flex justify-center text-red-500">
                        {error}
                    </div>
                    </div>
                    
                    
                </div>
            </div>
            <div className="bg-white h-[450px] w-[400px] flex justify-center rounded-lg">
                <div className="flex flex-col gap-12 pt-10">
                    <div className="flex justify-center text-2xl font-bold">
                        Signup 
                    </div>
                    <div className="flex flex-col gap-7">
                        
                        <input type="text" placeholder="Username" onChange={(e)=>{
                           setSignupCreds(creds=>({
                            ...creds,
                            email:e.target.value
                           }))                        
                        }} className="border border-solid border-black p-2"/>

                        <input type="password" placeholder="Password" onChange={(e)=>{
                           setSignupCreds(creds=>({
                            ...creds,
                            password:e.target.value
                           }))                        
                        }} className="border border-solid border-black p-2"/>

                        <input type="text" placeholder="Name" onChange={(e)=>{
                           setLoginCreds(creds=>({
                            ...creds,
                            name:e.target.value
                           }))                        
                        }} className="border border-solid border-black p-2"/>

                    </div>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <button className="border-2 rounded-sm border-black hover:bg-slate-200 hover:animate-bounce h-10 w-40" onClick={async()=>{
                            console.log("Goat foat")
                            const checkIfUserExists=await checkUser(signupCreds);
                            if(checkIfUserExists)setError2("Username already exisits");
                            else signIn("credentials",{email:signupCreds.email,password:signupCreds.password});
                        }}>Click here to Signin</button>
                        <div className="flex justify-center text-red-400">
                            {error2}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    )
}