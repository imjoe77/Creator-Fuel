'use client'
import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { initiate } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify';
import { useSearchParams, useRouter } from 'next/navigation'

const defaultprofilepic = "https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUyZ241eGN6MWt1dmVobGlwaWNjMnQ1dXlocWgyZHMyNWN4NWEwY2d6dCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/Ll22OhMLAlVDb8UQWe/giphy.gif"
const defaultbannerpic = 'https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/20.gif?token-hash=81uhFp0MW20Qivf1LInhJegiH8RHtwe14ZvuDKLj4RU%3D&token-time=1772582400'

const PaymentsPage = ({ username, payments, profilePic, bannerPic, stats }) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (searchParams.get("payment") === "success") {
      toast.success("Payment successful! Thanks for your support. ❤️")
      router.push(`/${username}`)
    }
  }, [])

  const { data: session } = useSession()
  const [paymentForm, setPaymentForm] = useState({ name: '', message: '', amount: '' })

  const handleChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value })
  }

  const isDisabled =
    paymentForm.name.trim().length === 0 ||
    Number(paymentForm.amount) <= 0;

 const pay = async (amount) => {
    if (!session) {
      toast.error("Please login to pay! 🔒")
      router.push('/login')
      return
    }
    if (!paymentForm.name || paymentForm.name.length < 3) {
      toast.error("Please enter a valid name!")
      return
    }
    if (paymentForm.amount === "" || paymentForm.amount < 1) {
      toast.error("Please enter a valid amount!")
      return
    }
 let loadingToast = null
    try {
      loadingToast = toast.loading("Processing payment...")
      let a = await initiate(amount, username, paymentForm)
      toast.dismiss(loadingToast)
      let orderId = a.id
      var options = {
        "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        "amount": amount * 100,
        "currency": "INR",
        "name": "Get Me A Coffee",
        "description": "Support Creator",
        "order_id": orderId,
        "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
        "prefill": {
          "name": paymentForm.name,
          "email": session?.user?.email,
        },
        "theme": { "color": "#3399cc" }
      }
      var rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      toast.dismiss(loadingToast)
      toast.error("Failed to initiate payment. Try again or check your razorPay credentials!")
    }
  }

  // Top 5 only
  const topPayments = payments.slice(0, 5)

  return (
    <>
   
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="w-full text-white bg-gray-950 min-h-screen">

     {/* BANNER */}
<div className="w-full flex flex-col items-center justify-center mb-8 sm:mb-12">
  <img
    src={bannerPic || defaultbannerpic}
    className="w-full h-48 sm:h-64 md:h-80 object-cover object-center shadow-lg"
    alt="Banner"
  />
          <img
            src={profilePic || defaultprofilepic}
            className="-mt-20 sm:-mt-24 md:-mt-28 h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52 rounded-full object-cover ring-4 ring-white shadow-2xl bg-black transition-transform duration-300 hover:scale-105"
            alt="Profile"
          />
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold">@{username}</h2>
          <h3 className="mt-1 text-sm sm:text-base text-gray-300 font-medium text-center px-4">Let's help @{username} get a Coffee🧃</h3>
          <h3 className="text-gray-400 mt-1 text-xs sm:text-sm text-center px-4">{stats.totalCount} payments • ₹{stats.totalAmount} raised • Every bit matters</h3>
        </div>

        {/* MAIN */}
        <div className="flex flex-col md:flex-row gap-6 px-4 md:px-10 w-full max-w-6xl mx-auto pb-12">

          {/* SUPPORTERS */}
          <div className="w-full md:w-1/2 bg-gray-900 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-800/50">
            <h2 className="text-xl md:text-2xl font-bold mb-5 text-white text-center">Supporters</h2>

            {topPayments.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-6">No supporters yet. Be the first!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {topPayments.map((p, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                    padding: '12px 14px',
                    background: 'rgba(55,65,81,0.5)',
                    borderRadius: 12,
                    // No overflow, no scroll — just natural height
                  }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: '#374151' }}>
                      <img
                        src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                        alt="User"
                      />
                    </div>
                    <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.6, minWidth: 0, wordBreak: 'break-word' }}>
                      <span style={{ fontWeight: 600, color: '#e5e7eb' }}>{p.name}</span>
                      {' '}donated{' '}
                      <span style={{ fontWeight: 700, color: '#4ade80' }}>₹{p.amount}</span>
                      {p.message && (
                        <span style={{ color: '#d1d5db' }}> · "{p.message}"</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {payments.length > 5 && (
              <p style={{ textAlign: 'center', fontSize: 12, color: '#6b7280', marginTop: 14 }}>
                +{payments.length - 5} more supporters
              </p>
            )}
          </div>

          {/* PAYMENT FORM */}
          <div className="w-full md:w-1/2 bg-gray-900 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-800/50">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-white text-center">Make a Payment</h2>
            <div className="flex flex-col gap-4">
              <input name="name" value={paymentForm.name} onChange={handleChange} className="w-full bg-gray-800/50 border border-gray-700/50 text-gray-200 rounded-lg px-4 py-3 outline-none" placeholder="Enter Name" />
              <input name="message" value={paymentForm.message} onChange={handleChange} className="w-full bg-gray-800/50 border border-gray-700/50 text-gray-200 rounded-lg px-4 py-3 outline-none" placeholder="Enter Message" />
              <input name="amount" type="number" min="1" value={paymentForm.amount} onChange={handleChange} className="w-full bg-gray-800/50 border border-gray-700/50 text-gray-200 rounded-lg px-4 py-3 outline-none" placeholder="Enter Amount" />
              <button
                onClick={() => pay(paymentForm.amount)}
                disabled={isDisabled}
                className={`w-full font-bold py-3 rounded-lg mt-2 transition-all shadow-lg text-sm uppercase tracking-wide text-white ${isDisabled ? "bg-gray-700 cursor-not-allowed opacity-60" : "bg-purple-600 hover:bg-purple-700 cursor-pointer active:scale-95"}`}
              >
                {session ? "Pay" : "Login to Pay"}
              </button>
              <div className="flex gap-3 mt-1">
                {[10, 20, 30].map((amt) => (
                  <button key={amt} onClick={() => setPaymentForm({ ...paymentForm, amount: amt })} className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2.5 rounded-lg transition-colors border border-gray-700 text-xs md:text-sm">
                    Pay ₹{amt}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default PaymentsPage
