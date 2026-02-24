"use client"
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"
import SearchBar from "@/components/SearchBar";

const CNavbar = () => {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [RealUsername, setRealUsername] = useState("");

  useEffect(() => {
    if (session) {
      setRealUsername(session.user.username);
      fetch("/api/user/me")
        .then(res => res.json())
        .then(data => { if (data?.user?.username) setRealUsername(data.user.username); })
        .catch(err => console.error("Failed to fetch fresh user data", err));
    }
  }, [session]);

  const handleWrapperBlur = (e) => {
    if (dropdownRef.current && dropdownRef.current.contains(e.relatedTarget)) return;
    setOpen(false);
  };

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%', backgroundColor: '#111827', color: 'white' }}>
      <div style={{ display: 'flex', alignItems: 'center', height: 68, padding: '0 24px', gap: 16 }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'white', flexShrink: 0 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
            <img src="coffee.gif" alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <span style={{ fontSize: 16, fontWeight: 600, whiteSpace: 'nowrap' }}>Get Me a Coffee</span>
        </Link>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

     {/* Desktop: search + account side by side on the right */}
        {/* 👇 Changed gap from 16 to 6 to pull the search bar right next to the button */}
        <div className="navbar-links" style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <SearchBar />

          {!session && (
            <Link href="/login" style={{ backgroundColor: '#7c3aed', color: 'white', padding: '9px 22px', borderRadius: 10, textDecoration: 'none', fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap' }}>
              Sign up
            </Link>
          )}

          {session && (
            <div ref={dropdownRef} style={{ position: 'relative' }} tabIndex="-1" onBlur={handleWrapperBlur}>
              
              {/* 👇 Increased maxWidth from 230 to 350 to show the full email */}
              <button
                onClick={() => setOpen(prev => !prev)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, backgroundColor: '#7c3aed', color: 'white', border: 'none', padding: '9px 20px', borderRadius: 12, cursor: 'pointer', fontSize: 15, fontWeight: 600, maxWidth: 350 }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  Welcome {session.user.email}
                </span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <path d="m19 9-7 7-7-7" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>

              {open && (
                {/* 👇 Changed width to minWidth: '100%' so the menu stretches perfectly with the wider button */}
                <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', minWidth: '100%', borderRadius: 16, background: 'linear-gradient(135deg, #111827, #1f2937)', color: '#f1f5f9', boxShadow: '0 8px 40px rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.1)', zIndex: 99999 }}>
                  <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'white', margin: 0 }}>Signed in as</p>
                    <p style={{ fontSize: 12, color: '#94a3b8', margin: '3px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{session.user.email}</p>
                  </div>
                  <ul style={{ listStyle: 'none', padding: '8px 0', margin: 0, fontSize: 14 }}>
                    <li><Link href="/dashboard" tabIndex="0" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', color: '#f1f5f9', textDecoration: 'none', borderRadius: 8, margin: '0 8px' }}>🏠 Dashboard</Link></li>
                    <li><Link href={`/${RealUsername}`} tabIndex="0" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', color: '#f1f5f9', textDecoration: 'none', borderRadius: 8, margin: '0 8px' }}>🧑‍💻 My Page</Link></li>
                    <li><button tabIndex="0" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', width: '100%', background: 'none', border: 'none', color: '#f1f5f9', cursor: 'pointer', fontSize: 14, borderRadius: 8, margin: '0 8px' }}>⚙️ Settings</button></li>
                    <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '4px 16px' }} />
                    <li><button tabIndex="0" onClick={() => { setOpen(false); signOut({ callbackUrl: "/" }); }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', width: '100%', background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: 14, borderRadius: 8, margin: '0 8px' }}>🚪 Sign out</button></li>
                  </ul>
                </div>
              )}
            </div>
          )}

        {/* Hamburger */}
        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 6, display: 'none', flexShrink: 0 }}
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

      {/* Mobile dropdown — includes search bar at the top */}
      {menuOpen && (
        <div style={{ backgroundColor: '#1f2937', borderTop: '1px solid #374151', padding: '12px 20px 16px', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 15 }}>
          {/* Search bar inside mobile menu */}
          <div style={{ paddingBottom: 8, borderBottom: '1px solid #374151', marginBottom: 4 }}>
            <SearchBar />
          </div>
          {session && <p style={{ fontSize: 12, color: '#94a3b8', padding: '4px 0', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{session.user.email}</p>}
          {session && <Link href="/dashboard" onClick={() => setMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', padding: '11px 14px', borderRadius: 8 }}>🏠 Dashboard</Link>}
          {session && <Link href={`/${RealUsername}`} onClick={() => setMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', padding: '11px 14px', borderRadius: 8 }}>🧑‍💻 My Page</Link>}
          {session && <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', color: 'white', textAlign: 'left', padding: '11px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 15 }}>⚙️ Settings</button>}
          {session && <button onClick={() => { setMenuOpen(false); signOut({ callbackUrl: "/" }) }} style={{ background: 'none', border: 'none', color: '#f87171', textAlign: 'left', padding: '11px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 15 }}>🚪 Sign out</button>}
          {!session && <Link href="/login" onClick={() => setMenuOpen(false)} style={{ backgroundColor: '#7c3aed', color: 'white', textDecoration: 'none', padding: '11px 14px', borderRadius: 10, textAlign: 'center', marginTop: 4, fontWeight: 600 }}>Sign up</Link>}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .navbar-links { display: none !important; }
          .navbar-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

export default CNavbar;
