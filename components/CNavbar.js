"use client"
import React from 'react'
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useRef, useEffect } from "react";



const DNavbar = () => {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  return (
    <div className="h-20 w-full bg-gray-900 sticky top-0 z-[100]
 text-white flex items-center px-6">
      <img src='coffee.gif' className='w-10 h-10' /> <h1>Get Me a Coffee 2</h1>
      <ul className="flex gap-6 items-center ml-auto">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search creators..."
            className="
      w-[100]
      rounded-full
      bg-white/10
      backdrop-blur-md
      border border-white/20
      px-5 py-3
      text-white
      placeholder-white/50
      outline-none
      transition-all duration-300
      focus:bg-white/15
      focus:border-white/40
      focus:ring-2 focus:ring-purple-500/60
    "
          />



        </div>

        {!session && <li>Sign up</li>}
        {session && (
          <>
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center whitespace-nowrap text-white bg-purple-600 px-4 py-2 rounded-2xl w-[100px] hover:cursor-pointer"

              >
                Welcome {session.user.email}
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none">
                  <path d="m19 9-7 7-7-7" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>


              {/* Dropdown menu */}
              {open && (
                <div className="absolute right-1 mt-3 w-56 rounded-2xl z-50
                  bg-gradient-to-br from-gray-900 to-gray-800 
                  text-gray-100 shadow-2xl ring-1 ring-white/10">

                  {/* Header */}
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-sm font-semibold text-white">
                      Signed in as
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {session.user.email}
                    </p>
                  </div>

                  {/* Menu */}
                  <ul className="py-2 text-sm ">
                    <li>
                      <Link
                        href="/dashboard"
                        className="group flex items-center gap-3 px-4 py-2 
                     hover:bg-white/10 transition rounded-lg mx-2"
                      >
                        <span className="group-hover:scale-110 transition">🏠</span>
                        Dashboard
                      </Link>
                    </li>

                    <li>
                      <button
                        className="group flex w-full items-center gap-3 px-4 py-2 
                     hover:bg-white/10 transition rounded-lg mx-2 text-left"
                      >
                        <span className="group-hover:rotate-90 transition">⚙️</span>
                        Settings
                      </button>
                    </li>

                    <div className="my-2 mx-4 h-px bg-white/10" />

                    <li>
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="group flex w-full items-center gap-3 px-4 py-2 
                     text-red-400 hover:bg-red-500/10 hover:text-red-300 
                     transition rounded-lg mx-2 text-left"
                      >
                        <span className="group-hover:translate-x-1 transition">🚪</span>
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}

            </div>
          </>
        )}

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

export default DNavbar;