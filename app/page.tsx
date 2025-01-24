"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const session = useSession();
  return (
   <div className="">
    <p>Hello</p>
    <p>{JSON.stringify(session.data?.user)}</p>
    <button className="bg-blue-600 rounded-md h-[2.5rem] w-[8rem]"><Link href={"/courses"} className="text-white">View courses</Link></button>
   </div>
  );
}
