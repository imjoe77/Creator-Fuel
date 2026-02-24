'use client';
import { updateProfile, fetchUser } from '@/actions/useractions';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const initialState = { success: null, message: '' };

export default function DashboardSignup() {
  const [state, formAction] = React.useActionState(updateProfile, initialState);
  const [user, setUser] = useState(null);
  const [toastShown, setToastShown] = useState(false);
  const router = useRouter();

  const loadUserData = async () => {
    try {
      const data = await fetchUser();
      if (data) {
        setUser(data);
      }
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  const handleClick = () => {
    if (toastShown) return;
    toast.error("Email cannot be changed! Contact support.");
    setToastShown(true);
    setTimeout(() => { setToastShown(false); }, 5000);
  };

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    if (!state?.message) return;
    if (state.success) {
      toast.success(state.message);
      loadUserData();
      router.refresh();
    } else {
      toast.error(state.message);
    }
  }, [state]);

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: "white" }}>Loading profile...</p>
      </div>
    );
  }

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem', background: 'rgba(51, 65, 85, 0.5)',
    border: '1px solid #475569', borderRadius: '0.5rem', color: 'white',
    fontSize: '1rem', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '0.5rem',
  };

  return (
    <>
      <ToastContainer theme="dark" />
      <form action={formAction}>
        <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ width: '100%', maxWidth: '42rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
                Welcome to your Dashboard
              </h1>
            </div>
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(12px)', borderRadius: '1rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', padding: '2rem', border: '1px solid rgba(71, 85, 105, 0.5)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                <div>
                  <label htmlFor="name" style={labelStyle}>Name</label>
                  <input type="text" id="name" name="name" defaultValue={user?.name || ""} placeholder="Enter your name" style={inputStyle} onFocus={e => { e.target.style.borderColor = '#3b82f6'; }} onBlur={e => { e.target.style.borderColor = '#475569'; }} />
                </div>
                
                <div>
                  <label htmlFor="email" style={labelStyle}>Email</label>
                  <div style={{ position: 'relative' }} onClickCapture={handleClick}>
                    <input type="email" id="email" name="email" defaultValue={user?.email || ""} readOnly placeholder="Enter your email" style={{ ...inputStyle, paddingRight: '2.5rem', cursor: 'not-allowed', opacity: 0.7 }} />
                  </div>
                  <p style={{ fontSize: 10, color: '#6b7280', marginTop: 4 }}>Security Restriction: Email cannot be changed.</p>
                </div>
                
                <div>
                  <label htmlFor="username" style={labelStyle}>Username</label>
                  <input type="text" id="username" name="username" defaultValue={user?.username || ""} placeholder="Enter your username" style={inputStyle} onFocus={e => { e.target.style.borderColor = '#3b82f6'; }} onBlur={e => { e.target.style.borderColor = '#475569'; }} />
                </div>
                
                <div>
                  <label htmlFor="profilePicture" style={labelStyle}>Profile Picture URL</label>
                  <input type="text" id="profilePicture" name="profilePicture" defaultValue={user?.profilePicture || ""} placeholder="https://example.com/profile.jpg" style={inputStyle} onFocus={e => { e.target.style.borderColor = '#3b82f6'; }} onBlur={e => { e.target.style.borderColor = '#475569'; }} />
                </div>
                
                <div>
                  <label htmlFor="coverPicture" style={labelStyle}>Cover Picture URL</label>
                  <input type="text" id="coverPicture" name="coverPicture" defaultValue={user?.coverPicture || ""} placeholder="https://example.com/cover.jpg" style={inputStyle} onFocus={e => { e.target.style.borderColor = '#3b82f6'; }} onBlur={e => { e.target.style.borderColor = '#475569'; }} />
                </div>
                
                <div style={{ marginTop: '0.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(71, 85, 105, 0.5)' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>Razorpay Credentials</h3>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="razorpayId" style={labelStyle}>Razorpay ID</label>
                    <input key={user?.razorpayId || 'rid'} type="text" id="razorpayId" name="razorpayId" defaultValue={user?.razorpayId || ""} placeholder="Enter Razorpay ID" style={inputStyle} onFocus={e => { e.target.style.borderColor = '#3b82f6'; }} onBlur={e => { e.target.style.borderColor = '#475569'; }} />
                  </div>
                  
                  <div>
                    <label htmlFor="razorpaySecret" style={labelStyle}>Razorpay Secret</label>
                    <input key={user?.razorpaySecret || 'rsc'} type="password" id="razorpaySecret" name="razorpaySecret" defaultValue={user?.razorpaySecret || ""} placeholder="Enter Razorpay Secret" style={inputStyle} onFocus={e => { e.target.style.borderColor = '#3b82f6'; }} onBlur={e => { e.target.style.borderColor = '#475569'; }} />
                  </div>
                </div>

                <button type="submit" style={{ width: '100%', background: '#2563eb', color: 'white', fontWeight: '600', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '1rem', transition: 'all 0.2s', marginTop: '0.5rem' }}>
                  Save Profile
                </button>

              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
