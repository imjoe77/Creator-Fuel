import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/db/connectDb";
import User from "@/app/models/User";

//API route that fetches current user details from the Database
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  await connectDB();
  
  //Unique constraint to find user
  const user = await User.findOne(
    { email: session.user.email.toLowerCase() },
    //Return only these specified fields
    {
      name: 1,
      email: 1,
      username: 1,
      profilePicture: 1,
      coverPicture: 1,
      razorpayId: 1,
      razorpaySecret: 1, // 👈 ADDED THIS LINE! Now the secret goes to the frontend.
    }
  ).lean();
  
  //Sends data back to browser
  return NextResponse.json({ user });
}
