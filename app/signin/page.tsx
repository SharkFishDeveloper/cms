"use client";
import React, { useState } from "react";
import google from "../../public/google.png";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (provider: string) => {
    try {
      const result = await signIn(provider, { callbackUrl: "/" });
      console.log("Login result:", result?.url);

      if (result) {
        if (result?.error || !result.ok) {
          setErrorMessage(result.error || "An error occurred during sign-in.");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setErrorMessage("Something went wrong during sign-in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-2xl max-w-sm w-full">
        {errorMessage && (
          <div className="mb-4 text-red-600 text-center text-lg font-semibold">
            {errorMessage}
          </div>
        )}
        <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center">Login</h1>
        <div className="space-y-4">
          <button
            onClick={() => handleLogin('google')}
            className="flex items-center justify-center bg-white text-gray-900 px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 w-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300"
          >
            <Image src={google} alt="Google" height={24} width={24} className="mr-3" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
