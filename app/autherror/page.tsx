"use client";

import { useRouter } from "next/navigation";

const AuthError = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/signin"); // Redirect to the sign-in page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-600 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-2xl max-w-lg w-full text-center">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">Sign-in Error</h1>
        <p className="text-lg text-gray-600 mb-6">
          Something went wrong during sign-in. Please try signing in with a different method.
        </p>
        <button
          onClick={handleRedirect}
          className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:bg-yellow-400 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300"
        >
          Go to Sign-in Page
        </button>
      </div>
    </div>
  );
};

export default AuthError;
