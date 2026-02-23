"use client"
import Link from "next/link";

export default function Home() {
  return (
    <>
      <style>{`
        .fans-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          max-width: 900px;
          margin: 0 auto;
        }
        .hero-title {
          font-size: 3.5rem;
        }
        .hero-buttons {
          flex-direction: row;
        }
        @media (max-width: 640px) {
          .fans-grid {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 0 8px;
          }
          .hero-title {
            font-size: 2.2rem;
            text-align: center;
          }
          .hero-buttons {
            flex-direction: column;
            width: 100%;
          }
          .hero-buttons a, .hero-buttons button {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      {/* 1. Hero Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', justifyContent: 'center', color: 'white', minHeight: '44vh', padding: '40px 24px', textAlign: 'center' }}>
        <h1 className="hero-title" style={{ fontWeight: 700, color: '#a855f7', lineHeight: 1.1 }}>
          GET ME A COFFEE
        </h1>
        <p style={{ maxWidth: 600, fontSize: 16, color: '#d1d5db', lineHeight: 1.7 }}>
          Get Me a Coffee makes supporting fun and easy.{' '}
          In just a couple of taps, your fans can make the payment and leave a message.
        </p>
        <div className="hero-buttons" style={{ display: 'flex', gap: 16, marginTop: 20 }}>
          <Link href="/dashboard">
            <button type="button" style={{ color: 'white', cursor: 'pointer', background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', border: 'none', fontWeight: 600, borderRadius: 10, fontSize: 15, padding: '11px 28px' }}>
              Start Here
            </button>
          </Link>
          <Link href="/about">
            <button type="button" style={{ color: 'white', cursor: 'pointer', background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', border: 'none', fontWeight: 600, borderRadius: 10, fontSize: 15, padding: '11px 28px' }}>
              Read More
            </button>
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.2)' }} />

      {/* 2. Fans Section */}
      <div style={{ padding: '60px 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 48 }}>
          Your Fans can buy you a Coffee
        </h2>

        <div className="fans-grid">
          {/* Card 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
            <div style={{ width: 100, height: 100, borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src="/telecommuting.gif" alt="Fans want to help" style={{ width: 72, height: 72, objectFit: 'contain' }} />
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Fans want to help</h3>
              <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>Fans are available to support you</p>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
            <div style={{ width: 100, height: 100, borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src="/dollar.gif" alt="Fans want to contribute" style={{ width: 72, height: 72, objectFit: 'contain' }} />
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Fans want to contribute</h3>
              <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>Fans are willing to contribute financially</p>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
            <div style={{ width: 100, height: 100, borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src="/collaboration.png" alt="Fans want to collaborate" style={{ width: 72, height: 72, objectFit: 'contain' }} />
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Fans want to collaborate</h3>
              <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>Fans are ready to collaborate with you</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.2)' }} />

      {/* 3. Learn More / Video */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 24px' }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 32, textAlign: 'center' }}>
          Learn more about us
        </h2>
        <div style={{ width: '100%', maxWidth: 768, aspectRatio: '16/9', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
          <iframe
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            src="https://www.youtube.com/embed/fjHO4fAfCf0?rel=0&modestbranding=1"
            title="Learn more about us"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </>
  );
}
