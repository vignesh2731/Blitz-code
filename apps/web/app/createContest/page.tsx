"use client"

import { useState } from "react";
import InputBox from "../../components/InputBox"
import { Button } from "@repo/ui/button";
import { createContest } from "../../lib/lib";
import { useRouter } from "next/navigation";
export default function CreateContest()
{
    const router=useRouter();
    const [code,setCode]=useState("");
    const[noOfTestCases,setNumberofTestCases]=useState(0);
    const [password,setPassword]=useState("");
    const [question,setQuestion]=useState("");
    const[title,setTitle]=useState("");
    const [testcases,setTestcases]=useState<string[]>([]);
    const[answers,setAnswers]=useState<string[]>([]);
    const[msg,setMsg]=useState("");
    return <div className="flex flex-col justify-center">
        <div className="bg-slate-200 mt-12 mx-56 h-fit flex justify-evenly">
            <div className="flex flex-col mt-10">
                <img src="https://media.licdn.com/dms/image/v2/C5612AQElHynLERUgKw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1645430400252?e=2147483647&v=beta&t=s7F-DBH9gQFi5CKspLJ19xSWLTsz77UemS7nQTHiaXU" className="h-[300px] w-[400px]"></img>
            </div>
            <div className="flex flex-col justify-center gap-10">
                <div className="text-3xl font-bold pl-40">
                    Create a Contest
                </div>
                <InputBox label="Code : " type="text" placeholder="xyz" onChange={(value)=>{
                    setCode(value);
                }}/>
                <InputBox label="Password : " type="password" placeholder="*****" onChange={(value)=>{
                    setPassword(value);
                }}/>
                <InputBox label="Title :   " type="text" placeholder="Question name" onChange={(value)=>{
                    setTitle(value);
                }}/>
                <InputBox label="Question : " type="text" placeholder="Two Sum" onChange={(value)=>{
                    setQuestion(value);
                }}/> 
                <InputBox label="Number of testcases" type="number" placeholder="10" onChange={(value)=>{
                    setNumberofTestCases(Number(value));
                }} />
                {Array.from({length:noOfTestCases}).map((_,key)=>(
                    <div className="flex flex-col gap-5" key={key}>
                        <InputBox type="text" placeholder="1,2,3,4" label="TestCases" onChange={(value)=>{
                            setTestcases([...testcases,value]);
                        }}/>
                        <InputBox type="text" placeholder="10" label="Answers" onChange={(value)=>{
                            setAnswers([...answers,value]);
                        }}/>
                    </div>
                ))}
                <p className="text-red-600">{msg}</p>
                <Button label="Create Contest" onClick={async()=>{
                    const res=await createContest(code,password,title,question,testcases,answers);
                    if(res.msg==="Contest created")router.push(`contests/${code}`);
                    else setMsg(res.msg);
                }}/>
            </div>
        </div>
    </div>
}