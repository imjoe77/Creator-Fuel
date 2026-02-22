"use client"
import React from 'react'
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useRef, useEffect } from "react";

const DNavbar = () => {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [RealUsername, setRealUsername] = useState("");

  useEffect(() => {
    if (session) {
      setRealUsername(session.user.username);
      fetch("/api/user/me")
        .then(res => res.json())
        .then(data => {
          if (data?.user?.username) setRealUsername(data.user.username);
        })
        .catch(err => console.error("Failed to fetch fresh user data", err));
    }
  }, [session]);

  const handleWrapperBlur = (e) => {
    if (dropdownRef.current && dropdownRef.current.contains(e.relatedTarget)) return;
    setOpen(false);
  };

  return (
    <div className="sticky top-0 z-[10000] h-20 w-full bg-gray-900 text-white flex items-center px-6">
      <img src='coffee.gif' className='w-20 h-20' alt="logo" />
      <Link href="/" className='cursor-pointer'>Get Me a Coffee</Link>

      <ul className="flex gap-6 items-center ml-auto cursor-pointer">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/creators">Creators</Link></li>

        {!session && <li>Sign up</li>}

        {session && (
          <div
            ref={dropdownRef}
            className="relative"
            tabIndex="-1"
            onBlur={handleWrapperBlur}
            style={{ outline: 'none' }}
          >
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center text-white bg-purple-600 px-4 py-2 rounded hover:cursor-pointer"
            >
              Welcome {session.user.email}
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none">
                <path d="m19 9-7 7-7-7" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            {open && (
              <div
                className="absolute right-1 mt-3 w-56 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 shadow-2xl ring-1 ring-white/10"
                style={{ zIndex: 99999 }}
              >
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-sm font-semibold text-white">Signed in as</p>
                  <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
                </div>

                <ul className="py-2 text-sm">
                  <li>
                    <Link
                      href="/dashboard"
                      tabIndex="0"
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3 px-4 py-2 hover:bg-white/10 transition rounded-lg mx-2"
                    >
                      <span className="group-hover:scale-110 transition">🏠</span> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${RealUsername}`}
                      tabIndex="0"
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3 px-4 py-2 hover:bg-white/10 transition rounded-lg mx-2"
                    >
                      <span className="group-hover:scale-110 transition">🧑‍💻</span> My Page
                    </Link>
                  </li>
                  <li>
                    <button
                      tabIndex="0"
                      onClick={() => setOpen(false)}
                      className="group flex w-full items-center gap-3 px-4 py-2 hover:bg-white/10 transition rounded-lg mx-2 text-left"
                    >
                      <span className="group-hover:rotate-90 transition">⚙️</span> Settings
                    </button>
                  </li>
                  <div className="my-2 mx-4 h-px bg-white/10" />
                  <li>
                    <button
                      tabIndex="0"
                      onClick={() => { setOpen(false); signOut({ callbackUrl: "/" }); }}
                      className="group flex w-full items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition rounded-lg mx-2 text-left"
                    >
                      <span className="group-hover:translate-x-1 transition">🚪</span> Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        {!session && (
          <Link
            href="/login"
            className="inline-block text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </Link>
        )}
      </ul>
    </div>
  );
}

export default DNavbar;