"use client"
import React from 'react'
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
   const { data: session,status } = useSession()
   

  return (
<div className="h-20 w-full bg-gray-900
 text-white flex items-center px-6">
   <img src='coffee.gif' className='w-10 h-10'/> <h1>Get Me a Coffee</h1>
  <ul className="flex gap-6 items-center ml-auto">
    <li>Home</li>
    <li>About</li>
    <li>Projects</li>
  {!session && <li>Sign up</li>}


    {session && <Link href={"/dashboard"} className="inline-block text-white bg-gradient-to-br from-purple-600 to-blue-500 
             hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
             focus:ring-blue-300 dark:focus:ring-blue-800 
             font-medium rounded-lg text-sm px-5 py-2.5 text-center"> Dashboard
</Link>}

 {session && <button href={"/profile"}  onClick={()=>signOut({ callbackUrl: "/" })} className="inline-block text-white bg-gradient-to-br from-purple-600 to-blue-500 
             hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
             focus:ring-blue-300 dark:focus:ring-blue-800 
             font-medium rounded-lg text-sm px-5 py-2.5 text-center">Logout
</button>}

{!session && 
 <Link href="/login" className="inline-block text-white bg-gradient-to-br from-purple-600 to-blue-500 
             hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
             focus:ring-blue-300 dark:focus:ring-blue-800 
             font-medium rounded-lg text-sm px-5 py-2.5 text-center"> Login
</Link>
}
  
 </ul>
 </div>

  )
}

export default Navbar;