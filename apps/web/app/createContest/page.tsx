"use client"

import { useState } from "react";
import InputBox from "../../components/InputBox"
import { Button } from "@repo/ui/button";

export default function createContest()
{
    const [code,setCode]=useState("");
    const [password,setPassword]=useState("");
    const [question,setQuestion]=useState("");
    const[title,setTitle]=useState("");
    const [testcases,setTestcases]=useState("");
    const[answers,setAnswers]=useState("");
    return <div className="flex flex-col justify-center">
        <div className="bg-slate-200 mt-12 mx-56 h-[600px] flex justify-evenly">
            <div className="flex flex-col justify-center">
                <img src="https://media.licdn.com/dms/image/v2/C5612AQElHynLERUgKw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1645430400252?e=2147483647&v=beta&t=s7F-DBH9gQFi5CKspLJ19xSWLTsz77UemS7nQTHiaXU" className="h-[300px] w-[400px]"></img>
            </div>
            <div className="flex flex-col justify-center gap-10">
                <div className="text-3xl font-bold pl-40">
                    Create a Contest
                </div>
                <InputBox label="Code : " type="text" placeholder="xyz" onChange={(value)=>{
                    setCode(value);
                }}/>
                <InputBox label="Password : " type="text" placeholder="*****" onChange={(value)=>{
                    setPassword(value);
                }}/>
                <InputBox label="Title :   " type="text" placeholder="Question name" onChange={(value)=>{
                    setTitle(value);
                }}/>
                <InputBox label="Question : " type="text" placeholder="Two Sum" onChange={(value)=>{
                    setQuestion(value);
                }}/> 
                <InputBox label="TestCases : " type="text" placeholder="[{5,1,2,3,4},{1,2}]" onChange={(value)=>{
                    setTestcases(value);
                }}  />
                <InputBox label="Answer : " type ="text" placeholder="[10,2]" onChange={(value)=>{
                    setAnswers(value);
                }} />
                <Button label="Create Contest" onClick={()=>{

                }}/>
            </div>
        </div>
    </div>
}