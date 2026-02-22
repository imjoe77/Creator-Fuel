"use client"
import React from 'react';
import Link from 'next/link';

const stats = [
  { value: '5,000+', label: 'Creators Joined' },
  { value: '₹12M+', label: 'Paid Out' },
  { value: 'Global', label: 'Community' },
];

const features = [
  {
    icon: '🎨',
    title: 'For Creators',
    description: 'Build a page in minutes. Share your work, connect with fans, and get funded directly.',
  },
  {
    icon: '🤝',
    title: 'For Supporters',
    description: 'A simple way to say "thank you" to the people who inspire, entertain, and educate you.',
  },
  {
    icon: '⚡',
    title: 'Instant Payouts',
    description: 'We partner with major payment gateways to ensure your earnings go straight to you — fast.',
  },
];

const About = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif', position: 'relative', overflow: 'hidden' }}>

      {/* Background Glows */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -10, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: 0, left: '20%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(88,28,135,0.25) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: 0, right: '20%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(29,78,216,0.2) 0%, transparent 70%)', borderRadius: '50%' }} />
      </div>

      <div style={{ position: 'relative', maxWidth: 960, margin: '0 auto', padding: '80px 24px' }}>

        {/* ── Hero ── */}
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <span style={{
            display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#c084fc', background: 'rgba(192,132,252,0.1)',
            padding: '6px 16px', borderRadius: 999, marginBottom: 24,
          }}>
            About Us
          </span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, lineHeight: 1.1,
            marginBottom: 24, background: 'linear-gradient(90deg, #c084fc, #60a5fa)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Helping creators do<br />what they love.
          </h1>
          <p style={{ fontSize: 18, color: '#9ca3af', maxWidth: 580, margin: '0 auto', lineHeight: 1.7 }}>
            We are a team of developers, artists, and creators who believe that
            getting paid for your work should be simple, direct, and transparent.
          </p>
        </div>

        {/* ── Mission ── */}
        <div style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24, padding: '48px 40px', marginBottom: 72,
          display: 'flex', alignItems: 'center', gap: 56, flexWrap: 'wrap',
        }}>
          {/* Image */}
          <div style={{
            flexShrink: 0, width: 200, height: 200, borderRadius: 20, overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(192,132,252,0.1), rgba(96,165,250,0.1))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img src="/collaboration.png" alt="CreatorFuel" style={{ width: 160, height: 'auto', objectFit: 'contain' }} />
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Our Mission</h2>
            <p style={{ color: '#9ca3af', lineHeight: 1.8, marginBottom: 16 }}>
              The creator economy is booming, but for many, it's still hard to make a living.
              Algorithms change, ad revenue fluctuates, and platforms take huge cuts.
            </p>
            <p style={{ color: '#9ca3af', lineHeight: 1.8, marginBottom: 16 }}>
              <span style={{ color: '#c084fc', fontWeight: 600 }}>CreatorFuel</span> was born from a simple idea:{' '}
              <em style={{ color: '#e5e7eb' }}>What if fans could just buy their favorite creator a coffee?</em>
            </p>
            <p style={{ color: '#9ca3af', lineHeight: 1.8 }}>
              No subscriptions. No hidden fees. Just direct support — we handle the rest.
            </p>
          </div>
        </div>

        {/* ── Why CreatorFuel ── */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Why CreatorFuel?</h2>
            <p style={{ color: '#6b7280', fontSize: 14 }}>Built with creators at the center — always.</p>
          </div>

          {/* 3-Column Grid — inline style guarantees it works */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {features.map(({ icon, title, description }) => (
              <div key={title} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                padding: '36px 24px', background: '#0d0d0d',
                border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20,
                transition: 'border-color 0.2s, background 0.2s',
                gap: 16,
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'rgba(192,132,252,0.08)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: 24,
                }}>
                  {icon}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: '#fff' }}>{title}</h3>
                <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.7 }}>{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Stats ── */}
        <div style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24, padding: '48px 40px', marginBottom: 72,
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, textAlign: 'center',
        }}>
          {stats.map(({ value, label }, i) => (
            <React.Fragment key={label}>
              <div>
                <div style={{ fontSize: 48, fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 8 }}>
                  {value}
                </div>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#6b7280', fontWeight: 600 }}>
                  {label}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* ── CTA ── */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
            Ready to get started?
          </h2>
          <p style={{ color: '#9ca3af', maxWidth: 400, margin: '0 auto 32px', lineHeight: 1.7 }}>
            Join thousands of creators already building a sustainable income with CreatorFuel.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/dashboard" style={{
              padding: '12px 28px', borderRadius: 12, fontWeight: 600, fontSize: 14,
              background: 'linear-gradient(90deg, #a855f7, #3b82f6)', color: '#fff',
              textDecoration: 'none', display: 'inline-block',
            }}>
              Get Started — It's Free
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;