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
export async function getUserData()
{
    const session=await getServerSession(authOption);
    const data=await prisma.user.findFirst({
        where:{
            id:session?.user?.id
        },
        omit:{
            password:true
        }
    })
    return data;
}

export async function createContest(code:string,password:string,title:string,question:string,testcases:string[],answers:string[])
{
    const session=await getServerSession(authOption);
    const alreadyExists=await prisma.contest.findFirst({
        where:{
            code:code
        }
    })
    if(alreadyExists)return {msg:"Contest code already exists"};
    const contest=await prisma.contest.create({
        data:{
            code:code,
            password:password,
            createdBy:session?.user?.id,
        }
    })
    const problem=await prisma.problem.create({
        data:{
            question:question,
            testcases:testcases,
            result:answers,
            contestId:contest.id
        }
    })
    await prisma.contest.update({
        where:{
            id:contest.id
        },
        data:{
            problem:{
                connect:[{id:problem.id}]
            }
        }
    })
    
    return {msg:"Contest created"};
}


export async function joinContest(code:string,password:string)
{
    const session=await getServerSession(authOption);
    const res=await prisma.contest.findFirst({
        where:{
            code:code,
            password:password
        }
    })
    if(!res)return{msg:"Incorrect credentials"};
    await prisma.contest.update({
        where:{
            code:code
        },
        data:{
            participatedUsers:{
                connect:[{id:session.user.id}]
            }
        }
    })
    return {msg:"User has joined the contest"};
}
export async function getParticipants(code:string)
{
    const contest=await prisma.contest.findFirst({
        where:{
            code
        }
    })
    if(!contest)return {msg:"Contest not found"};

    const p=await prisma.contest.findFirst({
        where:{
            code:code
        },
        select:{
            participatedUsers:{
                select:{
                    name:true
                }
            }
        }
    })
    return {msg:"Contest found",participants:p?.participatedUsers}
}

export default async function ContestOwner(code:string)
{
    const session=await getServerSession(authOption);
    const owner=await prisma.contest.findFirst({
        where:{code},
        select:{
            createdBy:true
        }
    })
    if(session.user.id===owner?.createdBy)return true;
    return false;
}

export async function fetchContestData(){
    const session=await getServerSession(authOption);
    if(!session || !session.user)return;
    const res=await prisma.user.findFirst({
        where:{
            id:session.user.id
        },
        select:{
            contestsParticipated:{
                select:{
                    code:true,
                    winnerUser:{
                        select:{
                            name:true
                        }
                    }
                }
            },
            createdContests:{
                select:{
                    code:true,
                    winnerUser:{
                        select:{
                            name:true
                        }
                    }
                }
            }
        }
    })
    return {res};
}