"use client"
import InputBox from "@components/InputBox";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@repo/ui/button";
import { updateUserData } from "@lib/lib";
import { redirect } from "next/navigation";


export default function UserDetails()
{
    const [email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const [name,setName]=useState("");
    const userDetails=useSession();
    const user=userDetails.data?.user;
    if(!user)redirect('/api/auth/signin')
    return <div className="flex flex-col mt-24 h-screen">
        <div className="bg-slate-200 mr-72 ml-72 h-[500px] flex items-center gap-10 pl-10 rounded-lg shadow-lg">
            <div>
                <img src="https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Panda-512.png" alt="" height={"12px"} width={"400"} />
            </div>
            <div className="flex  justify-center h-full">
                <div className="flex flex-col justify-center gap-10">
                        <InputBox label="Email : " placeholder={user?.email || ""} type="string" onChange={(value)=>{
                            setEmail(value);
                        }}/>
                        <InputBox label="Password : " placeholder={"********"} type="string" onChange={(value)=>{
                            setPassword(value);
                        }}/>
                        <InputBox label="Name : " placeholder={user?.name || ""} type="string" onChange={(value)=>{
                            setName(value);
                        }}/>

                        <Button label="Submit" onClick={async ()=>{
                             await updateUserData({email,password,name});
                             alert('Credentials updated ')
                        }}/>
                </div>
            </div>
            
        </div>
    </div>
}