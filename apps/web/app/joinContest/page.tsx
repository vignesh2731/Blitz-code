"use client"

import { useState } from "react";
import InputBox from "../../components/InputBox";
import { Button } from "@repo/ui/button";
import { joinContest } from "../../lib/lib";
import { useRouter } from "next/navigation";

export default function JoinContest()
{
    const router=useRouter();
    const[code,setCode]=useState("");
    const[password,setPassword]=useState("");
    const[msg,setMsg]=useState("");
    return <div className="flex flex-col justify-center ">
        <div className="bg-slate-200 mt-28 mx-56 h-fit flex justify-evenly ">
            <div className="flex flex-col justify-center border-r-2 border-black pr-6">
                <img src="https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/5871197/cover_image/regular_1708x683/pasted_image_0-e026254934c0199a4e74a3682c94d523.png" className="h-64 w-96 mr-16"></img>
            </div>
            <div className="flex flex-col py-10 justify-evenly gap-10">
                <div className="font-bold text-3xl flex justify-center">
                    Join Contest
                </div>
                <div className="pl-12">
                    <InputBox label="Code : " placeholder="abcd" type="text" onChange={(value)=>{
                        setCode(value);
                    }}/>
                </div>
                <div >
                    <InputBox label="Password :" placeholder="******" type="password" onChange={(value)=>{
                        setPassword(value);
                    }}/>
                </div>
                <div className="flex justify-center">
                    <Button label="Join" onClick={async()=>{
                        const {msg}=await joinContest(code,password);
                        if(msg==="Incorrect credentials")setMsg(msg);
                        else router.push(`contests/${code}`);
                    }}/>
                </div>
                <div className="flex justify-center text-red-600 font-semibold">
                        {msg}
                </div>
            </div>
        </div>
    </div>
}