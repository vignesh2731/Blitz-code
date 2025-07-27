"use client"
import { useRouter } from "next/navigation"
export function SideBarItem({name,link}:{name:string,link:string})
{
    const router=useRouter();
    return <div className="border-b border-black cursor-pointer" onClick={()=>{
             router.push(link);
    }}>
        <b>{name}</b>
    </div>
}