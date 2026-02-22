"use client"
import Link from "next/link";
export default function Home() {
  return (
    <>
      {/* 1. Hero Section */}
      <div className="flex flex-col gap-4 items-center justify-center text-white h-[44vh] px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-purple-500">
          GET ME A COFFEE
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-gray-300">
          Get Me a Coffee makes supporting fun and easy. <br />
          In just a couple of taps, your fans can make the payment and leave a message.
        </p>
        <div className="flex gap-6 mt-5">
          <button type="button" className="text-white cursor-pointer bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            <Link href="/dashboard">
              Start Here</Link>
          </button>
          <button type="button" className="text-white cursor-pointer bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            <Link href="/about">Read More</Link>
          </button>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.2)' }} />

      {/* 2. Fans Section */}
      <div style={{ padding: '60px 40px' }}>

        <h2 style={{ textAlign: 'center', fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 56 }}>
          Your Fans can buy you a Coffee
        </h2>

        {/* Cards Grid — fixed 3 columns, consistent sizing */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 40,
          maxWidth: 900,
          margin: '0 auto',
        }}>

          {/* Card 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
            <div style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <img
                src="/telecommuting.gif"
                alt="Fans want to help"
                style={{ width: 72, height: 72, objectFit: 'contain' }}
              />
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>
                Fans want to help
              </h3>
              <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>
                Fans are available to support you
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
            <div style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <img
                src="/dollar.gif"
                alt="Fans want to contribute"
                style={{ width: 72, height: 72, objectFit: 'contain' }}
              />
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>
                Fans want to contribute
              </h3>
              <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>
                Fans are willing to contribute financially
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
            <div style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <img
                src="/collaboration.png"
                alt="Fans want to collaborate"
                style={{ width: 72, height: 72, objectFit: 'contain' }}
              />
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>
                Fans want to collaborate
              </h3>
              <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>
                Fans are ready to collaborate with you
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.2)', marginTop: 20 }} />

      {/* 3. Learn More / Video */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 24px' }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 32 }}>
          Learn more about us
        </h2>
        <div style={{
          width: '100%',
          maxWidth: 768,
          aspectRatio: '16/9',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
        }}>
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