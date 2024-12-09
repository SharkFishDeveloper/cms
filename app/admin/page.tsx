"use client"

import axios from "axios";
import { useSession } from "next-auth/react"
import { useEffect } from "react";

const Admin = () => {
  const session = useSession();

  useEffect(()=>{
    const adminCheck = async()=>{
        if(session.data?.user.id){
            const response = await axios.post(`/api/verifyadmin`,{id:session.data?.user.id});
            console.log("response",response)
        }
    }
    adminCheck()
  })

  return (
    <div>Admin</div>
  )
}

export default Admin