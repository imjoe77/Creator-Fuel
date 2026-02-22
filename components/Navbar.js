"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"

const Navbar = () => {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%', backgroundColor: '#111827', color: 'white' }}>
      <div style={{ display: 'flex', alignItems: 'center', height: 68, padding: '0 24px', gap: 16 }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'white', flexShrink: 0 }}>
          <div style={{ width: 70, height: 70, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
            <img src="coffee.gif" alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <span style={{ fontSize: 20, fontWeight: 600, whiteSpace: 'nowrap' }}>Get Me a Coffee</span>
        </Link>

        <div style={{ flex: 1 }} />

        {/* Desktop links */}
        <div className="navbar-links" style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 15 }}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          <Link href="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
          <Link href="/creators" style={{ color: 'white', textDecoration: 'none' }}>Creators</Link>
          {!session && (
            <Link href="/login" style={{ backgroundColor: '#7c3aed', color: 'white', padding: '9px 22px', borderRadius: 10, textDecoration: 'none', fontSize: 15, fontWeight: 600 }}>
              Login
            </Link>
          )}
          {session && (
            <Link href="/dashboard" style={{ backgroundColor: '#7c3aed', color: 'white', padding: '9px 22px', borderRadius: 10, textDecoration: 'none', fontSize: 15, fontWeight: 600 }}>
              Dashboard
            </Link>
          )}
          {session && (
            <button onClick={() => signOut({ callbackUrl: "/" })} style={{ backgroundColor: '#7c3aed', color: 'white', padding: '9px 22px', borderRadius: 10, border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
              Logout
            </button>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 6, display: 'none' }}
          aria-label="Toggle menu"
        >
          <svg width="26" height="26" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{ backgroundColor: '#1f2937', borderTop: '1px solid #374151', padding: '10px 20px 16px', display: 'flex', flexDirection: 'column', gap: 4, fontSize: 15 }}>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', padding: '11px 14px', borderRadius: 8 }}>Home</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', padding: '11px 14px', borderRadius: 8 }}>About</Link>
          <Link href="/creators" onClick={() => setMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', padding: '11px 14px', borderRadius: 8 }}>Creators</Link>
          {!session && <Link href="/login" onClick={() => setMenuOpen(false)} style={{ backgroundColor: '#7c3aed', color: 'white', textDecoration: 'none', padding: '11px 14px', borderRadius: 10, textAlign: 'center', marginTop: 6, fontWeight: 600 }}>Login</Link>}
          {session && <Link href="/dashboard" onClick={() => setMenuOpen(false)} style={{ backgroundColor: '#7c3aed', color: 'white', textDecoration: 'none', padding: '11px 14px', borderRadius: 10, textAlign: 'center', marginTop: 6, fontWeight: 600 }}>Dashboard</Link>}
          {session && <button onClick={() => { setMenuOpen(false); signOut({ callbackUrl: "/" }) }} style={{ backgroundColor: '#7c3aed', color: 'white', border: 'none', padding: '11px 14px', borderRadius: 10, textAlign: 'center', marginTop: 4, cursor: 'pointer', fontSize: 15, fontWeight: 600 }}>Logout</button>}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .navbar-links { display: none !important; }
          .navbar-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  )
}

export default Navbar;