"use client"

import { useSession } from "next-auth/react"

const Profile = () => {
    const session = useSession();


  return (
    <div>
        <div>Profile</div>
        <p>Name - {session.data?.user.name}</p>
        <p>Email - {session.data?.user.email}</p>
        <p className="text-red-500">Fetch and show courses</p>
    </div>

  )
}

export default Profile