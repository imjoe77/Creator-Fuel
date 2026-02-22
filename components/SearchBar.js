"use client"
import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { searchUsers } from '@/actions/useractions'

const SearchBar = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  const handleSearch = async (e) => {
    const value = e.target.value
    setQuery(value)
    if (value.length >= 2) {
      const users = await searchUsers(value)
      setResults(users)
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }

  // Close only when focus truly leaves the whole container
  const handleWrapperBlur = (e) => {
    if (containerRef.current && containerRef.current.contains(e.relatedTarget)) return;
    setIsOpen(false);
  };

  const handleSelect = () => {
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div
      ref={containerRef}
      tabIndex="-1"
      onBlur={handleWrapperBlur}
      style={{ position: 'relative', zIndex: 9999, outline: 'none' }}
      className="w-40 sm:w-56 md:w-64 lg:w-80"
    >
      <input
        type="text"
        placeholder="Search creators..."
        value={query}
        onChange={handleSearch}
        onFocus={() => { if (results.length > 0) setIsOpen(true) }}
        className="
          w-31 h-10 rounded-full
          bg-white/10 backdrop-blur-md
          border border-white/20
          px-4 sm:px-4 md:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base text-white placeholder-white/50
          outline-none transition-all duration-300
          focus:bg-white/15 focus:border-white/40
          focus:ring-2 focus:ring-purple-500/60
        "
      />

      {isOpen && results.length > 0 && (
        <div
          className="absolute left-0 right-0 mt-2 rounded-2xl overflow-hidden w-80 h-50"
          style={{
            top: '100%',
            background: '#1e1b2e',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,92,246,0.2)',
            zIndex: 99999,
          }}
        >
          {results.map((user) => (
            <Link
              href={`/${user.username}`}
              key={user._id}
              tabIndex="0"
              onClick={handleSelect}
              style={{ display: 'block', textDecoration: 'none' }}
            >
              <div
                className="flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 cursor-pointer transition-colors hover:bg-purple-500/15"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <img
                  src={user.profilePicture || "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="}
                  alt={user.username}
                  style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                />
                <div className="flex flex-col min-w-0">
                  <span style={{ color: '#ffffff', fontSize: 'clamp(12px, 2vw, 14px)', fontWeight: 600, lineHeight: 1.3 }}>
                    {user.name || "Creator"}
                  </span>
                  <span style={{ color: '#94a3b8', fontSize: 'clamp(10px, 1.5vw, 12px)' }}>
                    @{user.username}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && (
        <div
          className="absolute left-0 right-0 mt-2 rounded-2xl p-4 text-center text-sm w-60"
          style={{
            top: '100%',
            background: '#1e1b2e',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.7)',
            color: '#94a3b8',
            zIndex: 99999,
          }}
        >
          No creators found.
        </div>
      )}
    </div>
  )
}

export default SearchBar