'use client'
import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { initiate } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams, useRouter } from 'next/navigation' // To check for success URL


//Variables
const defaultprofilepic = "https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUyZ241eGN6MWt1dmVobGlwaWNjMnQ1dXlocWgyZHMyNWN4NWEwY2d6dCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/Ll22OhMLAlVDb8UQWe/giphy.gif"
const defaultbannerpic = 'https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/20.gif?token-hash=81uhFp0MW20Qivf1LInhJegiH8RHtwe14ZvuDKLj4RU%3D&token-time=1772582400'



const PaymentsPage = ({ username, payments, profilePic, bannerPic, stats }) => {
  //Searches for the payments
  const searchParams = useSearchParams()
  const router = useRouter()
  useEffect(() => {
    if (searchParams.get("payment") === "success") {
      toast.success("Payment successful! Thanks for your support. ❤️")
      router.push(`/${username}`)
    }
  }, [])

  const { data: session } = useSession()
  //Stores giver's info
  const [paymentForm, setPaymentForm] = useState({ name: '', message: '', amount: '' })
  //Synamic state update
  const handleChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value })
  }

  const isDisabled =
    paymentForm.name.trim().length === 0 ||
    Number(paymentForm.amount) <= 0;

  //Payment logic
  const pay = async (amount) => {

    //  SECURITY CHECK: If not logged in, stop immediately.
    if (!session) {
      toast.error("Please login to pay! 🔒")
      router.push('/login') // Redirects them to login page
      return
    }
    // Validation: Don't let them pay if name is empty
    if (!paymentForm.name || paymentForm.name.length < 3) {
      toast.error("Please enter a valid name!")
      return
    }

    // Validation: Don't let them pay if amount is empty or negative
    if (paymentForm.amount === "" || paymentForm.amount < 1) {
      toast.error("Please enter a valid amount!")
      return
    }
    try {
      // 1. Get the Order ID by calling initiate function
      let a = await initiate(amount, username, paymentForm)
      let orderId = a.id

      // 2. Razorpay Configuration
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

      // 3. Open Popup
      var rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      toast.error("Failed to initiate payment. Try again!")
    }
  }
  return (
    <>
   
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="w-full text-white bg-gray-950 min-h-screen">

        {/* --- BANNER SECTION --- */}
        <div className="w-full h-[500px] flex flex-col items-center justify-center mb-12">


          <img
             src={bannerPic || defaultbannerpic} //if correct banner pic provided we can use bannerPic
            className='w-full h-1/3 object-cover shadow-lg'
            alt="Banner"
          />
          {/* Profile Picture */}
          <img
            src={profilePic || defaultprofilepic}
            className="-mt-18 h-[150px] w-[150px] rounded-full object-cover ring-4 ring-white shadow-2xl bg-black transition-transform duration-300 hover:scale-105"
            alt="Profile"
          />
          <h2 className="mt-3 text-4xl font-bold">@{username}</h2>
          <h3 className='mt-1 text-l text-gray-300 font-medium'>Let's help @{username} get a Coffee🧃</h3>
          <h3 className='text-gray-400 mt-1'>{stats.totalCount} payments • ₹{stats.totalAmount} raised •Every bit matters </h3>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex flex-col md:flex-row gap-6 px-4 md:px-10 w-full max-w-6xl mx-auto mt-10">

          {/* DIV 1: SUPPORTERS SECTION (Left Side) */}
          <div className="w-full md:w-1/2 bg-gray-900 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-800/50 overflow-hidden">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-white text-center">Supporters</h2>
            <div className="h-[200px] overflow-y-auto px-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {/* Fetch real payments here later */}
              {/* 1. Check if there are any payments */}
              {payments.length === 0 && (
                <p className="text-gray-500 text-sm text-center">No supporters yet. Be the first!</p>
              )}
              {/* 2. Map through the real payments */}
              {payments.map((p, i) => (
                <div key={i} className="flex items-center gap-3 mt-5 p-3 bg-gray-800/50 rounded-lg l-10 overflow-scroll">
                  {/* User Icon */}
                  <div className="rounded-full bg-gray-700 overflow-hidden shrink-0 w-10 h-10 flex items-center justify-center">
                    <img
                      src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                      className="w-full h-full object-cover opacity-80"
                      alt="User"
                    />
                  </div>
                  {/* Message Content */}
                  <div className="text-sm text-gray-400 leading-snug">
                    <span className="font-semibold text-gray-200">{p.name}</span> donated <span className="font-bold text-green-400">₹{p.amount}</span>

                    {/* Only show message if it exists */}
                    {p.message && (
                      <span className="text-gray-300"> with a message: "{p.message}"</span>
                    )}
                  </div>
                </div>
              ))}

            </div>
          </div>


          {/* DIV 2: PAYMENT SECTION (Right Side) */}
          <div className="w-full md:w-1/2 bg-gray-900 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-800/50">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-white text-center">Make a Payment</h2>
            <div className="flex flex-col gap-4">
              <input
                name="name"
                value={paymentForm.name}
                onChange={handleChange}
                className="w-full bg-gray-800/50 border border-gray-700/50 text-gray-200 rounded-lg px-4 py-3 outline-none"
                placeholder="Enter Name"
              />
              <input
                name="message"
                value={paymentForm.message}
                onChange={handleChange}
                className="w-full bg-gray-800/50 border border-gray-700/50 text-gray-200 rounded-lg px-4 py-3 outline-none"
                placeholder="Enter Message"
              />
              <input
                name="amount"
                type="number"
                min="1"
                value={paymentForm.amount}
                onChange={handleChange}
                className="w-full bg-gray-800/50 border border-gray-700/50 text-gray-200 rounded-lg px-4 py-3 outline-none"
                placeholder="Enter Amount"
              />
              {/* Pay Button */}
              <button
                onClick={() => pay(paymentForm.amount)}
                disabled={isDisabled}
                className={`w-full font-bold py-3 rounded-lg mt-2 transition-all shadow-lg text-sm uppercase tracking-wide text-white ${isDisabled
                  ? "bg-gray-700 cursor-not-allowed opacity-60"
                  : "bg-purple-600 hover:bg-purple-700 cursor-pointer active:scale-95 shadow-purple-900/20"
                  }`}
              >
                {session ? "Pay" : "Login to Pay"}
              </button>


              {/* Quick Amount Buttons */}
              <div className="flex gap-3 mt-1">
                {[10, 20, 30].map((amt) => (
                  <button
                    key={amt}
                    // It updates the amount input instead of paying immediately
                    onClick={() => setPaymentForm({ ...paymentForm, amount: amt })}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2.5 rounded-lg transition-colors border border-gray-700 text-xs md:text-sm"
                  >
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
