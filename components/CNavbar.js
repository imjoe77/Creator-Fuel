"use client"
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"
import SearchBar from "@/components/SearchBar";

const CNavbar = () => {
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

  // Close when focus leaves the entire dropdown wrapper.
  // Because every interactive child has tabIndex="0", relatedTarget
  // will be the next focused element — if it's still inside the wrapper
  // we leave the dropdown open; otherwise we close it.
  const handleWrapperBlur = (e) => {
    if (dropdownRef.current && dropdownRef.current.contains(e.relatedTarget)) return;
    setOpen(false);
  };

  return (
    <div className="sticky top-0 z-[100] h-20 w-full bg-gray-900 text-white flex items-center px-6">

      <Link href="/" className="flex items-center gap-2">
        <img src='coffee.gif' className='w-20 h-20' alt="logo" />
        <h1 className="hidden md:block cursor-pointer">Get Me a Coffee</h1>
      </Link>

      <ul className="flex gap-4 md:gap-6 items-center ml-auto">

        <SearchBar />

        {!session && <li><Link href="/login">Sign up</Link></li>}

        {session && (
          <div
            ref={dropdownRef}
            className="relative"
            tabIndex="-1"
            onBlur={handleWrapperBlur}
            style={{ outline: 'none' }}
          >
            <button
              onClick={() => setOpen(prev => !prev)}
              className="flex items-center whitespace-nowrap mx-4 text-white bg-purple-600 px-4 py-2 rounded-2xl hover:cursor-pointer transition-colors"
            >
              Welcome {session.user.email}
              <svg className="w-4 h-4 ml-2 shrink-0" viewBox="0 0 24 24" fill="none">
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
      </ul>
    </div>
  );
}

export default CNavbar;