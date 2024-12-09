"use client"

import { useSession } from "next-auth/react"
import { useState } from "react";

const Profile = () => {
    const session = useSession();
    const [makeCourse,setMakeCourse] = useState(false);


  return (
    <div>
        <div>Profile</div>
        <p>Name - {session.data?.user.name}</p>
        <p>Email - {session.data?.user.email}</p>

        <div>
            <div>
                <span onClick={()=>setMakeCourse((p)=>!p)}>{!makeCourse ? "Make course" : "Back"}</span>
                {makeCourse && (
                <div>
                <p>Course name - </p>
                <p>Course description</ p>
                <input type="text" placeholder="Thumbnail url" />
                <p>Price</p>

                </div>
            )}
            </div>
        </div>
    </div>

  )
}

export default Profile