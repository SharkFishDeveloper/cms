"use client"
import { useSession } from "next-auth/react";


export default function Home() {
  const session = useSession();
  return (
   <div className="">
    <p>Hello</p>
    <p>{JSON.stringify(session.data?.user)}</p>
   </div>
  );
}
