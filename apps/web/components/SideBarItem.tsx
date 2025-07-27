import { redirect } from "next/navigation";

export function SideBarItem({name,link}:{name:string,link:string})
{
    return <div className="border-b border-black cursor-pointer" onClick={()=>{
        redirect(link)
    }}>
        <b>{name}</b>
    </div>
}