"use server"
import prisma from '@repo/db/client'
import { getServerSession } from 'next-auth';
import { authOption } from './auth';
export async function JoinContest(code:string,password:string)
{
    const session=await getServerSession(authOption);
    console.log(session?.user);
    if(!session.user)return {msg:"Unauthorized"};
    const user=session.user;
    const res=await prisma.contest.findFirst({
        where:{
            code:code,
        },
        include:{
            participatedUsers:{
                select:{
                    id:true
                }
            }
        }
    })
    if(!res)return {msg:"Contest not found"};
    if(res.password!==password)return {msg:"Wrong password"};
    if(res.winner!==null)return{msg:"Contest has already ended"};
    const alreadyExists=res.participatedUsers.some(u=>u.id===user.id);
    if(!alreadyExists)
    {
        await prisma.contest.update({
            where:{
                id:res.id
            },
            data:{
                participatedUsers:{
                    connect:{
                        id:session.user.id
                    }
                }
            }
        })
        return {msg:"Joined the contest, Waiting for it to begin"};
    }
    else return {msg:"User has already joined the contest"};
}

export async function removeUserFromContest(code:string)
{
    const session=await getServerSession(authOption);
    const user=session.user;
    if(!user)return {msg:"Unauthorized"};
    const contest=await prisma.contest.findFirst({
        where:{
            code:code
        },
        include:{
            participatedUsers:{
                select:{
                    id:true
                }
            }
        }
    })
    if(!contest)return {msg:"Contest doesnt exist"};
    const userExists=contest.participatedUsers.some(u=>u.id===user.id);
    if(!userExists)return {msg:"User is not in the contest"};
    await prisma.contest.update({
        where:{
            id:contest.id
        },
        data:{
            participatedUsers:{
                disconnect:{
                    id:user.id
                }
            }
        }
    })
    return {msg:"Exited from the contest"};
}
export async function usersInWaitingRoom(code:string)
{
    const users=await prisma.contest.findFirst({
        where:{
            code:code
        },
        select:{
            participatedUsers:{
                select:{
                    email:true,
                    name:true
                }
            }
        }
    })
    return users?.participatedUsers;
}

export async function updateUserData(credentials:{email?:string,password?:string,name?:string})
{   
    const session=await getServerSession(authOption);
    const data:Record<string,string>={};
    if(credentials.email)data.email=credentials.email;
    if(credentials.password)data.password=credentials.password;
    if(credentials.name)data.name=credentials.name;
    await prisma.user.update({
        where:{
            id:session?.user?.id
        },
        data
    })
    return {msg:"Credentials updated"};
}