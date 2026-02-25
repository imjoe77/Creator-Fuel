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
      style={{ position: 'relative', zIndex: 9999, outline: 'none', width: '320px' }}
    >
      <input
        type="text"
        placeholder="Search creators..."
        value={query}
        onChange={handleSearch}
        onFocus={() => { if (results.length > 0) setIsOpen(true) }}
        style={{
          width: '100%',
          height: 42,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.2)',
          padding: '0 20px',
          fontSize: 14,
          color: 'white',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />

      {isOpen && results.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            borderRadius: 16,
            overflow: 'hidden',
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
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 16px',
                  cursor: 'pointer',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <img
                  src={user.profilePicture || "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="}
                  alt={user.username}
                  style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <span style={{ color: '#ffffff', fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>
                    {user.name || "Creator"}
                  </span>
                  <span style={{ color: '#94a3b8', fontSize: 12 }}>
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
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            borderRadius: 16,
            padding: 16,
            textAlign: 'center',
            fontSize: 13,
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
