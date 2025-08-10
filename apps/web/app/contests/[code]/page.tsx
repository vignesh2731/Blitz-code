"use client"

import { use, useEffect, useState } from "react";
import ParticipantsBox from "../../../components/ParticipantsBox";
import ContestOwner, { getParticipants, leaveContest } from "../../../lib/lib";
import { notFound, useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";

export default function ContestStartPage({params}:{params:Promise<{code:string}>})
{
    const router=useRouter();
    const {code}= use(params);
    const [participants,setPariticipants]=useState<{name:string}[]>([]);
    const [isContestCreator,setIsContestCreator]=useState(false);
    async function fetchParticipants(){
        const res=await getParticipants(code);
        const resp=await ContestOwner(code);
        console.log(resp)
        setIsContestCreator(resp);
        if(res.msg==="Contest found" && res.participants)setPariticipants(res.participants);
        else router.push("/404")
    }
    useEffect(()=>{
        fetchParticipants();
    },[])
    return <div className="flex flex-col mt-10">
        {isContestCreator && <div className="flex justify-center">
                <Button label="Start Contest" onClick={()=>{
                    
                }}/>
                <Button label="Leave Contest" onClick={async()=>{
                    await leaveContest(code);
                }}/>
            </div>}
        <div className="grid grid-cols-4 mt-10 ml-24 gap-10">
            {participants.map((p,key)=>(
                <ParticipantsBox name={p.name} key={key} />
            ))}
        </div>
    </div>
}