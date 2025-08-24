"use client"

import { useState } from "react"
import InputBox from "@components/InputBox";

export default function Report()
{
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    return <div className="flex flex-col justify-center px-60 pt-24">
        <div className="bg-slate-200 h-[500px]">
            <div className="flex flex-col items-center pt-32 h-full gap-10">
                <div className="text-4xl font-bold">
                    Report an Issue 
                </div>
                <InputBox label="Issue title : " placeholder="" type="text" onChange={(value)=>{
                    setTitle(value)
                }}/>
                <InputBox label="Description : " placeholder="" type="text" onChange={(value)=>{
                    setDescription(value);
                }}/>
            </div>
        </div>
    </div>
}