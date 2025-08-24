"use client"

import { useEffect, useState } from "react"
import { fetchContestData } from "@lib/lib";
import { ContestsResult } from "@components/ContestsResult";

export default function CheckResult()
{
    const[createdData,setCreatedData]=useState<{code:string,winnerUser:{name:string}| null}[]>([]);
    const[givenData,setGivenData]=useState<{code:string,winnerUser:{name:string}| null}[]>([]);
    const [selectedData,setSelectedData]=useState<{code:string,winnerUser:{name:string}| null}[]>([]);
    async function fetchData(){
        const data=await fetchContestData();
        if(!data || !data.res)return;
        if(data.res.createdContests)
            {
                setCreatedData(data.res.createdContests);
                setSelectedData(data.res.createdContests)
            }
        if(data.res.contestsParticipated)setGivenData(data.res.contestsParticipated);
    }
    useEffect(()=>{
        fetchData();
    },[])
    return <div className="flex justify-center">
        <div className="bg-slate-200 flex flex-col gap-10 pt-10 min-h-[700px] w-[800px] mt-10 mb-20 pb-10"  >
            <div className="flex justify-evenly border-b-2 border-black pb-10">
                <div className="text-3xl font-bold cursor-pointer border-r-2 border-black pr-20" onClick={()=>{
                    setSelectedData(createdData)
                }}>
                    Contests created
                </div>
                <div className="text-3xl font-bold cursor-pointer" onClick={()=>{
                    setSelectedData(givenData);
                }}>
                    Contests given
                </div>
            </div>
            <div className="flex justify-center">
                <div className="flex flex-col gap-10">
                    {selectedData.map((sd,key)=>(
                        <ContestsResult code={sd.code} winner={sd.winnerUser?.name || "Contest not completed yet"} key={key}/>
                    ))}
                    
                </div>
            </div>
        </div>
    </div>
}