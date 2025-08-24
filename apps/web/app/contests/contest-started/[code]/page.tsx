"use client"

import { use, useEffect, useState } from "react"
import { codeSubmit, fetchQuestion, getParticipants, leaveContest } from "@lib/lib";
import { Button } from "@repo/ui/button";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
export default function ContestStarted({params}:{params:Promise<{code:string}>})
{
    const {code}=use(params);
    const [question,setQuestion]=useState("");
    const [title,setTitle]=useState("");
    const [language,setLanguage]=useState("C++");
    const[userCode,setUserCode]=useState("");
    const[showParticipants,setShowParticipants]=useState(false);
    const [participants,setPariticipants]=useState<{name:string}[] | null>([]);
    const [socket,setSocket]=useState<WebSocket| null>(null);
    const session=useSession();
    enum CodeStatus{
        Accepted="Accepted",
        Wrong="Wrong",
        Waiting="Waiting",
        None="None"
    }
    const [codeStatus,setCodeStatus]=useState<CodeStatus>(CodeStatus.None);
    useEffect(()=>{
        async function main()
        {
            const userId=session?.data?.user?.id;
            const response=await fetchQuestion(code);
            const question=response.res?.problem[0]?.question;
            const title=response.res?.problem[0]?.title;
            setQuestion(question || "");
            setTitle(title || "");
            const res=await getParticipants(code);
            setPariticipants(res?.participants || null);
            if(!userId)return;
            const ws=new WebSocket(`ws://localhost:8080?userId=${userId}&contestCode=${code}`);
            setSocket(ws);
            ws.onopen = () => console.log("WebSocket connected");
            ws.onmessage=async(event)=>{
                const res=JSON.parse(event.data);
                if(res.method==="submission")
                {
                    if(res.codeStatus==="Wrong")setCodeStatus(CodeStatus.Wrong);
                    else if(res.codeStatus==="Accepted") setCodeStatus(CodeStatus.Accepted);
                }
                if(res.method==="overall")
                {
                    console.log("USER HAS WON");
                    await new Promise(r=>setTimeout(r,5000));
                    redirect(`/contests/winner/${code}`)
                }
            }
        }
        main();
    },[])

    return (
    <div className="mt-6 mb-10 h-screen w-screen sticky">
        <div className="flex justify-end items-center mb-5 pr-16 gap-16 w-full">
            <Button label="Show participants" onClick={async()=>{
                setShowParticipants(t=>!t);
            }}/>
            <div>
                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e)=>{
                    setLanguage(e.target.value);
                }}>
                    <option defaultValue={"C++"} >C++</option>
                    <option>Java</option>
                    <option>Python</option>
                    <option>C</option>
                    <option>JavaScript</option>
                </select>
            </div>
            <Button label="Submit" onClick={async()=>{
                await codeSubmit(code,userCode,language);
                setCodeStatus(CodeStatus.Waiting);
            }}/>
            <Button label="Leave contest" onClick={async()=>{
                await leaveContest(code);
                redirect('/dashboard');
            }}/>
        </div> 
        <div className="min-h-screen mx-10 grid grid-cols-2 gap-10">
                <div className="bg-slate-100 flex flex-col gap-10 px-10 py-10 rounded-lg border-4 border-black">
                    <div className="text-4xl font-bold w-full flex justify-center">
                        {title}
                    </div>
                    <div>
                        <p className="flex-nowrap">{question}</p>
                    </div>
                    {showParticipants && <motion.div
                        initial={{ x: 0, opacity: 0 }}   
                        animate={{ x: 0, opacity: 1 }}  
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className=" bg-gray-200 sticky  w-[700px] h-[700px] top-0 -mt-40 overflow-y-auto px-10 py-10 rounded-md border-4 border-black"
                        >
                        <div className="flex flex-col gap-5">
                            <div className="flex justify-end">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer" onClick={()=>{
                                    setShowParticipants(t=>!t);
                                }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <div className="text-3xl flex justify-center font-bold pb-10 underline">
                                {"Contest Participants"}
                            </div>
                            <div className="flex flex-col">
                                {participants?.map((p,idx)=>(
                                    <div className="font-semibold text-xl flex gap-10" key={idx}>
                                        <div>
                                            {(idx+1)+" ."}
                                        </div>
                                        <div className="font-bold">
                                            {p.name}
                                        </div>
                                        <div>
                                            {/* Add email too */}
                                        </div>
                                    </div>
                                ))}
                                
                            </div>
                        </div>
                      </motion.div>}
                </div>
                <textarea id="message" rows={4} className="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none" placeholder="Start writing your code from here" onChange={(e)=>{
                    setUserCode(e.target.value)
                }}></textarea>
                {codeStatus!==CodeStatus.None && <motion.div
                    initial={{ y: 200, opacity: 0 }}   
                    animate={{ y: 0, opacity: 1 }}   
                    transition={{ duration: 0.8, ease: "easeOut" }} 
                    className="fixed bottom-4 right-14 w-[750px] h-[200px] bg-gray-500 rounded-xl shadow-xl items-center justify-center text-white text-xl font-bold"
                    >
                        <div className="flex justify-end pt-3 pr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer" onClick={()=>{
                                setCodeStatus(CodeStatus.None)
                            }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                        
                        <div className="h-full flex flex-col justify-center items-center pb-14">
                            {codeStatus}
                        </div>
                </motion.div>}
        </div>  
        {codeStatus}
    </div>)
}