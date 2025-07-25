"use server"
import prisma from '@repo/db/client'
export async function JoinContest(code:string,password:string)
{
    const res=await prisma.contest.findFirst({
        where:{
            code:code,
            password:password
        }
    })
    if(!res)return {msg:"Contest not found"};
    if(res.winner!==null)return{msg:"Contest has already ended"};
    
    return {msg:"Joined the contest, Waiting for it to begin"};
}