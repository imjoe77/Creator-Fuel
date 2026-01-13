'use client'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'

const Page = () => {
  const { username } = useParams()

  const [messages, setMessages] = useState([
    { name: "Shubham", message: "I support you bro. Lots of ❤️", amount: 30 },
    { name: "Rohan", message: "Great work! Keep it up.", amount: 10 },
    { name: "Priya", message: "Love your content!", amount: 50 },
    { name: "Alex", message: "Can't wait for the next video", amount: 20 },
  ])

  const [paymentForm, setPaymentForm] = useState({ name: '', message: '', amount: '' })

  // Load messages from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem(`chat_${username}`)
    if (saved) {
      setMessages(JSON.parse(saved))
    }
  }, [username])

  const handleSendMessage = () => {
    // Logic for handling payment/message
    if (!paymentForm.message) return
    const newMsg = { name: paymentForm.name || "Anonymous", message: paymentForm.message, amount: paymentForm.amount || 0 }

    const updatedMessages = [...messages, newMsg]
    setMessages(updatedMessages)
    // Save to localStorage
    localStorage.setItem(`chat_${username}`, JSON.stringify(updatedMessages))

    setPaymentForm({ name: '', message: '', amount: '' })
  }

  return (
    <>
      <div className="w-full text-white">

        {/* --- BANNER SECTION --- */}
        <div className="w-full h-[500px] flex flex-col items-center relative z-0 mb-12">
          <img
            src='https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/19.gif?token-hash=dgfPCvgUc-lglN4rJhaKtYn5CiJCJCDGvvb2BHi2FWg%3D&token-time=1770163200'
            className='w-full h-1/3 object-cover shadow-lg'
            alt="Banner"
          />
          <img
            src="https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUyZ241eGN6MWt1dmVobGlwaWNjMnQ1dXlocWgyZHMyNWN4NWEwY2d6dCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/Ll22OhMLAlVDb8UQWe/giphy.gif"
            className="
              -mt-18
              h-[150px] w-[150px]
              rounded-full
              object-cover
              ring-4 ring-white
              shadow-2xl
              bg-black
              transition-transform duration-300
              hover:scale-105
            "
            alt="Profile"
          />
          <h2 className="mt-3 text-4xl font-bold">@{username}</h2>
          <h3 className='mt-1 text-xl text-gray-300 font-medium'>Creating animated art's for VTT's</h3>
          <h3 className='text-gray-400 mt-1'>9,719 members • 82 posts • $15,817/release</h3>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex flex-col md:flex-row gap-6 px-4 md:px-10 w-full max-w-6xl mx-auto mt-10">

          {/* DIV 1: SUPPORTERS SECTION (Left Side) */}
          <div className="w-full md:w-1/2 bg-gray-900 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-800/50">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-white text-center">Supporters</h2>

            <div className="h-[400px]  overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {messages.map((msg, i) => (
                <div key={i} className="flex items-center gap-3 p-2 ">
                  <div className="rounded-full mx-10 bg-gray-800 overflow-hidden shrink-0 border border-gray-700" style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                    <img
                      src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                      className="w-full  h-full object-cover"
                      alt="User"
                    />
                  </div>
                  <div className="text-sm text-gray-400 leading-snug ">
                    <span className="font-semibold text-gray-200">{msg.name}</span> donated <span className="font-semibold text-green-400">${msg.amount}</span> with a message: <span className="text-gray-300">"{msg.message}"</span> ❤️
                  </div>
                </div>
              ))}
              {messages.length === 0 && <p className="text-gray-500 text-sm text-center">No supporters yet. Be the first!</p>}
            </div>
          </div>


          {/* DIV 2: PAYMENT SECTION (Right Side) */}
          <div className="w-full md:w-1/2 bg-gray-900 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-800/50">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-white text-center">Make a Payment</h2>

            <div className="flex flex-col gap-4">
              <input
                value={paymentForm.name}
                onChange={(e) => setPaymentForm({ ...paymentForm, name: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700/50 text-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder-gray-500 text-sm"
                placeholder="Enter Name"
              />
              <input
                value={paymentForm.message}
                onChange={(e) => setPaymentForm({ ...paymentForm, message: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700/50 text-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder-gray-500 text-sm"
                placeholder="Enter Message"
              />
              <input
                type="number"
                value={paymentForm.amount}
                onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700/50 text-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder-gray-500 text-sm"
                placeholder="Enter Amount"
              />

              <button
                onClick={handleSendMessage}
                className="w-full bg-purple-600 hover:bg-purple-700 cursor-pointer text-white font-bold py-3 rounded-lg mt-2 transition-all shadow-lg shadow-purple-900/20 active:scale-95 text-sm uppercase tracking-wide"
              >
                Pay
              </button>

              {/* Quick Amount Buttons */}
              <div className="flex gap-3 mt-1">
                {[10, 20, 30].map((amt) => (
                  <button key={amt} className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2.5 rounded-lg transition-colors border border-gray-700 text-xs md:text-sm">
                    Pay ${amt}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Spacer for Footer */}
        <div className="h-24 md:h-32 w-full"></div>

      </div>
      <div className='mt-10 view-hidden'>
      s
      </div>
    </>
  )
}

export default Page