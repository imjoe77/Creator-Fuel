'use client';
import { updateProfile } from '@/actions/useractions';
import React from 'react';
const initialState = { success: null, message: '' };
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

//Function to fill up dashboard form details
export default function DashboardSignup() {
  //Controls whether the success/error message is visible.
  const [showMessage, setShowMessage] = React.useState(false);
  //Connects form → server action.
  const [state, formAction] = React.useActionState(updateProfile, initialState);
  //Holds the current user data fetched from DB.
  const [user, setUser] = React.useState(null);
  //State variable for email toast to prevent from mutliple continuous rendering
  const [toastShown, setToastShown] = useState(false);


  const handleClick = () => {
    if (toastShown) return;

    toast.error("Email cannot be changed! Contact support.");
    setToastShown(true);

    // allow toast again after 5 seconds
    setTimeout(() => {
      setToastShown(false);
    }, 5000);
  };

  //Fetches data of current user from the Database
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user/me");
      const data = await res.json();
      setUser(data.user);
    };

    fetchUser();
  }, []);

  //Refetches current user's data to fill in updated data from Database
  useEffect(() => {
    if (!state?.message) return;

    // Trigger toast based on success or failure
    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);


  useEffect(() => {
    //Controls visibility of message returned from server  
    if (!state?.message) return;
    setShowMessage(true);

    //Timer for the message  
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [state]);

  //Fallback case if user not logged in or data not fetched
  if (!user) {
    return <p style={{ color: "white" }}>Loading profile...</p>;
  }

  //Load Form
  return (
    <form action={formAction}>



      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <div style={{ width: '100%', maxWidth: '42rem' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '0.5rem'
            }}>
              Welcome to your Dashboard
            </h1>
          </div>

          {/* Form Container */}
          <div style={{
            background: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(12px)',
            borderRadius: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            padding: '2rem',
            border: '1px solid rgba(71, 85, 105, 0.5)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Name Field */}
              <div>
                <label htmlFor="name" style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#cbd5e1',
                  marginBottom: '0.5rem'
                }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={user?.name || ""}

                  placeholder="Enter your name"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(51, 65, 85, 0.5)',
                    border: '1px solid #475569',
                    borderRadius: '0.5rem',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#475569';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#cbd5e1',
                  marginBottom: '0.5rem'
                }}>
                  Email
                </label>
                <div
                  className="relative w-full"
                  onClickCapture={handleClick}
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={user?.email || ""}
                    readOnly
                    className="cursor-not-allowed"
                    placeholder="Enter your email"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid #475569',
                      borderRadius: '0.5rem',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6';
                      e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.5)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#475569';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
               
              </div>
              <p className="text-[10px] text-gray-500">
                Security Restriction: Email cannot be changed.
              </p>
              {/* Username Field */}
              <div>
                <label htmlFor="username" style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#cbd5e1',
                  marginBottom: '0.5rem'
                }}>
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  defaultValue={user?.username || ""}

                  placeholder="Enter your username"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(51, 65, 85, 0.5)',
                    border: '1px solid #475569',
                    borderRadius: '0.5rem',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#475569';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Profile Picture Field */}
              <div>
                <label htmlFor="profilePicture" style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#cbd5e1',
                  marginBottom: '0.5rem'
                }}>
                  Profile Picture URL
                </label>
                <input
                  type="text"
                  id="profilePicture"
                  name="profilePicture"
                  defaultValue={user?.profilePicture || ""}

                  placeholder="https://example.com/profile.jpg"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(51, 65, 85, 0.5)',
                    border: '1px solid #475569',
                    borderRadius: '0.5rem',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#475569';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Cover Picture Field */}
              <div>
                <label htmlFor="coverPicture" style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#cbd5e1',
                  marginBottom: '0.5rem'
                }}>
                  Cover Picture URL
                </label>
                <input
                  type="text"
                  id="coverPicture"
                  name="coverPicture"
                  defaultValue={user?.coverPicture || ""}

                  placeholder="https://example.com/cover.jpg"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(51, 65, 85, 0.5)',
                    border: '1px solid #475569',
                    borderRadius: '0.5rem',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#475569';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Razorpay Credentials Section */}
              <div style={{
                marginTop: '0.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(71, 85, 105, 0.5)'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '1rem'
                }}>
                  Razorpay Credentials
                </h3>

                {/* Razorpay ID */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="razorpayId" style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#cbd5e1',
                    marginBottom: '0.5rem'
                  }}>
                    Razorpay ID
                  </label>
                  <input
                    type="text"
                    id="razorpayId"
                    name="razorpayId"


                    placeholder="Enter Razorpay ID"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid #475569',
                      borderRadius: '0.5rem',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6';
                      e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.5)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#475569';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Razorpay Secret */}
                <div>
                  <label htmlFor="razorpaySecret" style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#cbd5e1',
                    marginBottom: '0.5rem'
                  }}>
                    Razorpay Secret
                  </label>
                  <input
                    type="password"
                    id="razorpaySecret"
                    name="razorpaySecret"


                    placeholder="Enter Razorpay Secret"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid #475569',
                      borderRadius: '0.5rem',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6';
                      e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.5)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#475569';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                style={{
                  width: '100%',
                  background: '#2563eb',
                  color: 'white',
                  fontWeight: '600',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  marginTop: '0.5rem'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#1d4ed8';
                  e.target.style.transform = 'scale(1.02)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#2563eb';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                Save
              </button>

            </div>
          </div>
        </div>
      </div>
    </form>

  );
}
