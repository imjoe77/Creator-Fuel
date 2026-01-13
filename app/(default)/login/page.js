"use client"
import Link from "next/link";
import { FaGoogle, FaGithub, FaApple, FaFacebook, FaLinkedin } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
    const { data: session } = useSession()
    const router=useRouter()
    useEffect(() => {
      if(session) {
        
        router.push('/dashboard')
        }
    
     
    }, [session, router])
    
        
  return (
    <>
      {/* Top Bar */}
      <div className="flex items-center px-6 py-4">
        
        <div className="ml-auto -mt-25 flex items-center gap-2 text-sm ">
          <span>Don&apos;t have an account?</span>
          <Link href="/signup" className="underline">
            Sign-up
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mt-25">WELCOME BACK</h1>

        {/* Email Login */}
        <div className="flex flex-col gap-4 mt-6 w-full max-w-sm">
          <input
            type="email"
            placeholder="Email"
            className="w-100 px-6 py-3 text-lg rounded-2xl
                       bg-[#0b1220] border border-gray-700
                       text-white placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            className="w-full py-3 rounded-3xl ml-2 mt-5
                       bg-[#D4AF37] text-black font-semibold
                       hover:bg-[#B8962E] transition"
          >
            Continue with Email
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center w-full max-w-sm my-10">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="px-4 text-sm text-gray-400">
            OR LOGIN WITH
          </span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        {/* Social Login Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-sm ">
          <button onClick={()=>{signIn("google")}} className="flex items-center cursor-pointer  text-black font-bold text-xl gap-3 bg-white border rounded-lg px-6 py-3 hover:bg-gray-200 transition">
            <FaGoogle className="text-green-600 text-2xl" />
            Continue with Google
          </button>

          <button className="flex items-center cursor-pointer text-black font-bold text-xl gap-3 bg-white border rounded-lg px-6 py-3 hover:bg-gray-200 transition">
            <FaLinkedin className="text-blue-600 text-2xl" />
            Continue with LinkedIn
          </button>

          <button className="flex items-center cursor-pointer gap-3 text-black font-bold text-xl bg-white border rounded-lg px-6 py-3 hover:bg-gray-200 transition">
            <FaFacebook className="text-blue-700 text-2xl" />
            Continue with Facebook
          </button>

          <button onClick={()=>{signIn("github")}} 
          className="flex items-center cursor-pointer gap-3 text-black font-bold text-xl bg-white border rounded-lg px-6 py-3 hover:bg-gray-200 transition">
            <FaGithub className="text-black text-2xl" />
            Continue with GitHub
          </button>

          <button className="flex items-center cursor-pointer gap-3 text-black font-bold text-xl bg-white border rounded-lg px-6 py-3 hover:bg-gray-200 transition">
            <FaApple className="text-black text-2xl" />
            Continue with Apple
          </button>
        </div>
      </div>
    </>
  );
}
