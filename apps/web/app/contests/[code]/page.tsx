"use client"

import { use, useEffect, useState } from "react";
import ParticipantsBox from "../../../components/ParticipantsBox";
import ContestOwner, { getParticipants, leaveContest } from "../../../lib/lib";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";

export default function ContestStartPage({params}:{params:Promise<{code:string}>})
{
    const router=useRouter();
    const {code}= use(params);
    const [participants,setPariticipants]=useState<{name:string}[]>([]);
    const [isContestCreator,setIsContestCreator]=useState(false);
    const [contestEnded,setContestEnded]=useState(false);
    async function fetchParticipants(){
        const res=await getParticipants(code);
        const resp=await ContestOwner(code);
        setIsContestCreator(resp);
        if(res.contestEnded===true)setContestEnded(true);
        if(res.msg==="Contest found" && res.participants)setPariticipants(res.participants);
        else router.push("/404")
    }
    useEffect(()=>{
        fetchParticipants();
    },[])
    return (
        contestEnded?<div className="flex flex-col justify-center items-center min-h-screen text-2xl gap-10">
            <div className="flex justify-center">{"Contest has already been finished."}</div>
        
            {"Go to the checkResults option in Side Bar to know the winner"}
        </div>:
    <div className="flex flex-col mt-10">
        <div className="flex justify-center">
        {isContestCreator && <div>
                <Button label="Start Contest" onClick={()=>{
                    router.push(`contest-started/${code}`)
                }}/>
                
            </div>}
            <Button label="Leave Contest" onClick={async()=>{
                    await leaveContest(code);
                    router.back();

                }}/>
            </div>
        <div className="grid grid-cols-4 mt-10 ml-24 gap-10">
            {participants.map((p,key)=>(
                <ParticipantsBox name={p.name} key={key} />
            ))}
        </div>
    </div>)
}