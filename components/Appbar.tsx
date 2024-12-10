"use client";

import { useState, useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AppBar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      //@ts-expect-error: ignore this error
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-black text-white p-4 flex justify-between items-center h-[5rem]">
      {/* Logo Section */}
      <div className="text-xl font-bold">
        <Link href="/">CMS</Link>
      </div>

      {/* Login/Profile Section */}
      <div className="flex items-center space-x-4">
        {!session ? (
          <div
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => router.push("/signin")}
          >
            <Link href="/signin">Login</Link>
          </div>
        ) : (
          <div ref={profileRef} className="relative">
            {/* Profile Icon */}
            <div
              className="flex items-center cursor-pointer space-x-2"
              onClick={() => setOpenProfile(!openProfile)}
              aria-expanded={openProfile}
              aria-haspopup="true"
            >
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="User Image"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center text-white">
                  U
                </div>
              )}
            </div>

            {/* Dropdown Menu */}
            {openProfile && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10"
                role="menu"
              >
                <div className="p-4">
                  {session.user && (
                    <>
                      <p className="font-semibold">
                      {session.user.name.charAt(0).toUpperCase() + session.user.name.slice(1)}
                    </p>
                      <p className="text-xs text-gray-500">{session.user.email}</p>
                    </>
                  )}
                </div>
                <hr className="my-2" />
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  onClick={() => router.push("/profile")}
                >
                  Your Courses
                </button>
                {session.user?.role !== "user" && (
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    onClick={() => router.push("/admin")}
                  >
                    Admin Panel
                  </button>
                )}
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  onClick={handleSignOut}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Navigation Placeholder */}
      <div className="md:hidden flex">
        <button
          className="text-white focus:outline-none"
          aria-label="Open navigation menu"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AppBar;
