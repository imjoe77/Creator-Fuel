"use client"
import React from 'react';
import Link from 'next/link';

const categories = [
  {
    label: 'DEVELOPERS',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    glow: 'rgba(96, 165, 250, 0.6)',
    glowSoft: 'rgba(96, 165, 250, 0.15)',
    border: 'rgba(96, 165, 250, 0.3)',
  },
  {
    label: 'ARTISTS',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" fill="#c084fc" />
        <circle cx="17.5" cy="10.5" r=".5" fill="#c084fc" />
        <circle cx="8.5" cy="7.5" r=".5" fill="#c084fc" />
        <circle cx="6.5" cy="12.5" r=".5" fill="#c084fc" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
    glow: 'rgba(192, 132, 252, 0.6)',
    glowSoft: 'rgba(192, 132, 252, 0.15)',
    border: 'rgba(192, 132, 252, 0.3)',
  },
  {
    label: 'GAMERS',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="12" x2="10" y2="12" />
        <line x1="8" y1="10" x2="8" y2="14" />
        <line x1="15" y1="13" x2="15.01" y2="13" strokeWidth="3" />
        <line x1="18" y1="11" x2="18.01" y2="11" strokeWidth="3" />
        <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <path d="M2 8h20" />
        <rect x="2" y="5" width="20" height="15" rx="4" />
      </svg>
    ),
    glow: 'rgba(52, 211, 153, 0.6)',
    glowSoft: 'rgba(52, 211, 153, 0.15)',
    border: 'rgba(52, 211, 153, 0.3)',
  },
  {
    label: 'VLOGGERS',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
    glow: 'rgba(251, 146, 60, 0.6)',
    glowSoft: 'rgba(251, 146, 60, 0.15)',
    border: 'rgba(251, 146, 60, 0.3)',
  },
];

const Explore = () => {
  return (
    <div style={{
      minHeight: '100vh',
      color: '#fff',
      fontFamily: 'sans-serif',
      position: 'relative',
      // No zIndex here to avoid creating a new stacking context that competes with navbar
      overflow: 'hidden',
    }}>

      {/* ── Background Layer (Fixed & Negative Z) ── */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: -10,
        background: 'radial-gradient(ellipse at 20% 50%, #0f1a3d 0%, #050d1f 40%, #0a0514 70%, #050d1f 100%)',
        pointerEvents: 'none'
      }}>
        {/* Geometric line overlay (SVG) */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0" />
              <stop offset="50%" stopColor="#c084fc" stopOpacity="1" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="-10%" y1="60%" x2="40%" y2="0%" stroke="url(#lineGrad1)" strokeWidth="1" />
          <line x1="-5%" y1="75%" x2="45%" y2="15%" stroke="url(#lineGrad1)" strokeWidth="0.5" />
          <line x1="0%" y1="90%" x2="40%" y2="30%" stroke="url(#lineGrad1)" strokeWidth="0.5" />
          <line x1="110%" y1="30%" x2="60%" y2="100%" stroke="url(#lineGrad2)" strokeWidth="1" />
          <line x1="105%" y1="15%" x2="65%" y2="90%" stroke="url(#lineGrad2)" strokeWidth="0.5" />
          <line x1="100%" y1="0%" x2="60%" y2="70%" stroke="url(#lineGrad2)" strokeWidth="0.5" />
          <line x1="0%" y1="50%" x2="30%" y2="50%" stroke="#60a5fa" strokeWidth="0.4" strokeOpacity="0.4" />
          <line x1="70%" y1="50%" x2="100%" y2="50%" stroke="#c084fc" strokeWidth="0.4" strokeOpacity="0.4" />
        </svg>

        {/* Corner glows */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 400, height: 400, background: 'radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 400, height: 400, background: 'radial-gradient(circle, rgba(192,132,252,0.1) 0%, transparent 70%)' }} />

        {/* Sparkle */}
        <div style={{ position: 'absolute', bottom: 32, right: 40, fontSize: 24, color: 'rgba(255,255,255,0.4)' }}>✦</div>
      </div>

      {/* ── Main Content ── */}
      {/* Removed positive zIndex to ensure it doesn't fight with navbar */}
      <div style={{ position: 'relative', textAlign: 'center', padding: '60px 24px', maxWidth: 900, width: '100%', margin: '0 auto' }}>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(2.8rem, 7vw, 5rem)',
          fontWeight: 900,
          lineHeight: 1.05,
          marginBottom: 24,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          background: 'linear-gradient(180deg, #ffffff 0%, #c084fc 60%, #818cf8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: 'none',
          filter: 'drop-shadow(0 0 40px rgba(192,132,252,0.5))',
        }}>
          Discover &amp;<br />Support Creators
        </h1>

        {/* Subtitle */}
        <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.7, marginBottom: 56, maxWidth: 440, margin: '0 auto 56px' }}>
          Your next favorite streamer, artist, or developer is just a search away.<br />
          Use the search bar in the navbar above to find them.
        </p>

        {/* ── Category Cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, maxWidth: 800, margin: '0 auto' }}>
          {categories.map(({ label, icon, glow, glowSoft, border }) => (
            <div
              key={label}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                padding: '36px 16px 32px',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: `1px solid ${border}`,
                borderRadius: 20,
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 8px 40px ${glowSoft}, 0 0 0 1px ${border}`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Bottom glow bar */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '15%',
                right: '15%',
                height: 2,
                background: `linear-gradient(90deg, transparent, ${glow}, transparent)`,
                borderRadius: 999,
                filter: `blur(2px)`,
              }} />
              {/* Soft inner glow blob */}
              <div style={{
                position: 'absolute',
                bottom: -20,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 100,
                height: 60,
                background: glowSoft,
                filter: 'blur(20px)',
                borderRadius: '50%',
                pointerEvents: 'none',
              }} />

              {/* Icon */}
              <div style={{ position: 'relative', zIndex: 1 }}>{icon}</div>

              {/* Label */}
              <span style={{
                position: 'relative', zIndex: 1,
                fontSize: 13, fontWeight: 700, letterSpacing: '0.12em',
                color: '#e2e8f0', textTransform: 'uppercase',
              }}>
                {label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Explore;