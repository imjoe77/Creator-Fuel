"use client"
import React from 'react';
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session) {
            router.push('/dashboard')
        }
    }, [session, router])

    return (
        // 👇 CHANGED lg:grid-cols-2 TO md:grid-cols-2
        // This forces the side-by-side split on smaller laptop screens too
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-black">

            {/* --- LEFT SIDE: IMAGE --- */}
            <div className="relative hidden md:block h-full w-full">
                <img
                    src="/loginimg.avif"
                    alt="Login Background"
                    className="absolute inset-0 h-full w-full object-cover opacity-80"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black z-10" />
            </div>

            {/* --- RIGHT SIDE: LOGIN FORM --- */}
            <div className="flex flex-col justify-center items-center px-8 md:px-16 py-12 bg-black z-20 h-full">

                <div className="w-full max-w-md space-y-8 text-center">

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
                        WELCOME BACK
                    </h1>
                    <p className="text-gray-400 mb-8 text-lg">
                        Login to support your favorite creators.
                    </p>

                    <div className="flex flex-col gap-4 w-full ">
                        {/* Google Button */}
                        <button
                            onClick={() => signIn("google")}
                            className="cursor-pointer flex items-center justify-center gap-3 w-full bg-white text-black font-bold text-lg px-6 py-4 rounded-xl hover:bg-gray-200 transition-all transform active:scale-[0.98] shadow-lg"
                        >
                            <FaGoogle className="text-green-600 text-2xl" />
                            <span>Continue with Google</span>
                        </button>

                        {/* GitHub Button */}
                        <button
                            onClick={() => signIn("github")}
                            className="cursor-pointer flex items-center justify-center gap-3 w-full bg-[#24292e] border border-gray-700 text-white font-bold text-lg px-6 py-4 rounded-xl hover:bg-[#2f363d] transition-all transform active:scale-[0.98] shadow-lg"
                        >
                            <FaGithub className="text-white text-2xl" />
                            <span>Continue with GitHub</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}