"use client";
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
// import Image from 'next/image';
import Link from 'next/link';
// import userIcon from "../util/images/user.png";
import { useRouter } from 'next/navigation';


const AppBar = () => {
  const router = useRouter();
  const { data: session } =  useSession();
  const [openProfile, setOpenProfile] = useState(false);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="bg-black text-white p-4 flex justify-between items-center h-[5rem]">
      <div className="text-xl font-bold">
        <Link href="/" >
          CMS
        </Link>
      </div>

      

      {/* Conditional Login Button */}
      {!session ? (
        <div className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md cursor-pointer" onClick={()=>router.replace("signin")}>
          <Link href="/signin">Login</Link>
        </div>
      ) : (
        <div className="relative">
          {/* User Profile Icon */}
          <div className="relative">
            <div className="bg-white rounded-full p-1 cursor-pointer hover:bg-gray-100" onClick={() => setOpenProfile(!openProfile)}>
                <p>User</p>
            </div>
            {/* Profile Dropdown */}
            {openProfile && (
              <div className="absolute right-0 mt-2 w-[15rem] bg-white text-black rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-2 p-2">

                  {/* <Image src={session.user?.image!} alt="User Icon" width={30} height={30} className="rounded-full" /> */}
                    {/* TODO: Add user images */}
                  <div>
                    {session.user && (
                      <>
                        <p className="font-semibold ml-4">{session.user.name}</p>
                        <p className="text-xs text-gray-500 ml-4">{session.user.email}</p>
                      </>
                    )}
                  </div>
                </div>
                <hr className="my-2" />
                <div className="text-gray-800 w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={()=>router.push("/profile")}>My profile</div>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100" onClick={handleSignOut}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Navigation (Hamburger Menu) */}
      <div className="md:hidden flex">
        <button className="text-white focus:outline-none">
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AppBar;