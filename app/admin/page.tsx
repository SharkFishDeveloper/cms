"use client"

import CourseForm from "@/components/CourseForm";
import CourseInterface from "@/util/interfaces/courseInterface";
import axios from "axios";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Admin = () => {
  const session = useSession();
  const router = useRouter();
  const [password,setPassword] = useState<string|undefined>();
  const [createCourse,setCreateCourse] = useState(false);
  const [admin,setAdmin] = useState<string|undefined>();
  const [courses,setCourses] = useState<CourseInterface[]|[]>([]);

  //* Check if only admin is accessing this route
  useEffect(()=>{
    const adminCheck = async()=>{
      // setAdmin();
        if(session.data?.user){
            if(session.data?.user.role==="user"){
               router.replace("/");
               return toast.error("Unauthorised")
            }
        }
    }
    adminCheck()
  },[router, session.data?.user])  

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
        setAdmin(response.data.role);
        setCourses(response.data.data)
        return toast.success(response.data.message)
      }
    }else{
      return toast.error("Invalid request")
    }
  }

  return (
    <div>
      
      {!admin && (
        <div>
        <div>
        Admin panel
        </div>

      <input type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={handleAdminPasswordClick}>Submit</button>
      </div>
      )}


      { admin && (
        <>
        <div>
          You are on Admin page
        </div>
        <p>All courses - {JSON.stringify(courses)}</p>

        <div>
          <div onClick={()=>setCreateCourse((p)=>!p)}>{!createCourse ? "Create course" :"Back"}</div>

          {createCourse && session.data?.user.name && session.data?.user.id && (
            <div>
              <CourseForm instructorId={session.data?.user.id} />
            </div>
          )}

        </div>

        </>
      )
      }

    </div>
  )
}

export default Admin