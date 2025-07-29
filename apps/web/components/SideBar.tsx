"use client"
import { motion } from "framer-motion";
import { SideBarItem } from "./SideBarItem";
export function SideBar(){
    let sideBarArray=[{name:"Create a Contest",link:"/createContest"},{name:"Join Contest",link:"/joinContest"},{name:"Check Result",link:"/checkResult"},{name:"Report an issue",link:"/report-issue"},]
    return  <motion.div
      className="h-screen bg-slate-200  flex flex-col justify-evenly px-10 shadow-md relative pb-20"
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x:0 }}
      exit={{opacity:0,x:-200}}
      transition={{ duration: 0.4 }}
    >
        {sideBarArray.map((item,key)=>(
            <SideBarItem name={item.name} link={item.link} key={key}/>
        ))}
    </motion.div>
}