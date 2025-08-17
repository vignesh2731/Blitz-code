"use client"

import { use, useEffect, useState } from "react"
import { fetchQuestion, leaveContest } from "../../../../lib/lib";
import { Button } from "@repo/ui/button";

export default function ContestStarted({params}:{params:Promise<{code:string}>})
{
    const {code}=use(params);
    const [question,setQuestion]=useState("");
    const [title,setTitle]=useState("");
    const [language,setLanguage]=useState("C++");
    useEffect(()=>{
        async function main()
        {
            const response=await fetchQuestion(code);
            const question=response.res?.problem[0]?.question;
            const title=response.res?.problem[0]?.title;
            setQuestion(question || "");
            setTitle(title || "");
        }
        main();
    },[])

    return <div className="mt-6 mb-10">
        <div className="flex justify-end items-center mb-5 pr-20 gap-16">
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
            <Button label="Submit" onClick={()=>{

            }}/>
            <Button label="Leave contest" onClick={async()=>{
                await leaveContest(code);
            }}/>
        </div> 
        <div className="min-h-screen mx-10 grid grid-cols-2 gap-10">
                <div className="bg-slate-100 flex flex-col gap-10 px-10 py-10 rounded-lg border-4 border-black">
                    <div className="text-4xl font-bold w-full flex justify-center">
                        {"Two sum"}
                    </div>
                    <div>
                        <p className="flex-nowrap">{"fasdfjasdfkljsad sa fsdfjas;dfl asdf asdkhf ldsfasd faskd jadksflahsd flhasdophasdfiuhasdfkjasdkflds fasdkflaskjfaskjdaskdhasdkfhdsakjflaskdflasd   sdflhdkjsfa sdfaiusdf lkdsf h akdjslasodifasodiuhasdifauhdfoisdhaskdflkdsfasiodu asdiu asd ifasdio fhasdiu hasidohasoidaosidasdiosda fdsa fasid fasdi fasdif hasodfasiufhasdf hasdofhasdifhasdkflhaswerfweoifhasdiuhadsds   asd fhasdiuf asoid uasiudf aioswu dsaiuf hadsiuf asiudfg sdf asdiuasodi uasudif"}</p>
                    </div>
                </div>
                <textarea id="message" rows={4} className="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none" placeholder="Start writing your code from here"></textarea>
        </div>  
    </div>
}