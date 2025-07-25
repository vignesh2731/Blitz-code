"use client"
import { useSession } from "next-auth/react"
import {Test} from '@repo/ui/Test'
import { redirect } from "next/navigation";

export default function Home() {
  const session=useSession();
  console.log(session);
  if(!session.data)redirect('/api/auth/signin')
  return (
    <Test/>
  );
}
