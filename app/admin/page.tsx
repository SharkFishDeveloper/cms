"use client"

import axios from "axios";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Admin = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(()=>{
    const adminCheck = async()=>{
        if(session.data?.user.id){
            const response = await axios.post(`/api/verifyadmin`,{id:session.data?.user.id});
            if(response.data.message.role !== session.data?.user.id){
              toast.error("GET OUT")
              await new Promise(resolve => setTimeout(resolve, 1000));
              return router.replace("/");
            }
        }
    }
    adminCheck()
  })

  return (
    <div>Admin</div>
  )
}

export default Admin