import React from 'react'
import PaymentsPage from '@/components/PaymentsPage' 
import connectDB from "@/db/connectDb";
import User from "@/app/models/User";
import { notFound } from "next/navigation"
import { fetchPayments,fetchUserStats } from '@/actions/useractions'


//Dynamic page title function
export async function generateMetadata({ params }) {
    const {username}=await params;

  await connectDB()
  const user = await User.findOne({ username:username })
  
  if (!user) {
    return {
      title: "User Not Found | Get Me A Chai",
    }
  }

  return {
    title: `Support @${user.username} - Get Me A Coffee`,
    description: `Check out ${user.username}'s page and support their work!`,
  }
}

const Username = async ({ params }) => {
    // 1. If the username is not present in the URL, show 404
    // Note: params is a promise in newer Next.js versions, but for now this works in most setups
   const resolvedParams=await params;
    const  username  = resolvedParams.username;
    // 2. Connect to Database
    await connectDB()

    // 3. Find the user in the database
    // We use .lean() to make the object simple for the component
    // If we can't find the user 'harry', we shouldn't show the page
    let u = await User.findOne({ username: username })
    if (!u) {
        return notFound()
    }

    //4. Fetch Payments Data (Superchat list)
    let payments=await fetchPayments(username)

    //Fetching total user stats for the banner
    let stats=await fetchUserStats(username)

    
    
    
    //6. Profile pic and  Banner pic fetch
  let pics = await User.findOne(
  { username: username },
  { profilePicture: 1, coverPicture: 1, _id: 0 }
).lean()

if (!pics) {
  return <div>User not found</div>
}

//Current user details
const user = await User.findOne({ username: params.username });

//7. Render the Client Component
    // We pass the username as a prop so the component knows who to pay
    return (
        <>
            <PaymentsPage username={username} payments={payments} profilePic={pics.profilePicture} bannerPic={pics.coverPicture} stats={stats} user={user}/>
        </>
    )
}

export default Username