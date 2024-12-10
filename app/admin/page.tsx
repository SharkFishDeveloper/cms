"use client"

import axios from "axios";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Admin = () => {
  const session = useSession();
  const router = useRouter();
  const [password,setPassword] = useState<string|undefined>();
  const [admin,setAdmin] = useState(false);
  const [courses,setCourses] = useState([]);

  //* Check if only admin is accessing this route
  useEffect(()=>{
    const adminCheck = async()=>{
        if(session.data?.user){
            if(session.data?.user.role==="user"){
               router.replace("/");
               return toast.error("GET OUT")
            }
        }
    }
    adminCheck()
  })  

  //* Check admin password
  const handleAdminPasswordClick = async ()=>{
    const userId = session.data?.user.id;
    const role = session.data?.user.role;
    if(userId && role){
      const response = await axios.post(`api/verify_admin_password`,
      {userId,password,role});
      if(response.data.status!=="200"){
        return toast.error(response.data.message)
      }else{
        setAdmin(true);
        setCourses(response.data.data)
        console.log(response.data.data)
        return toast.success(response.data.message)
      }
    }else{
      return toast.error("Invalid request")
    }
  }

  return (
    <div>
      
      <div>
        Admin panel
      </div>

      <input type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={handleAdminPasswordClick}>Submit</button>

      {admin && (
        <>
        <div>
          Admin
        </div>
        <p>{JSON.stringify(courses)}</p>
        </>
      )
      }

    </div>
  )
}

export default Admin