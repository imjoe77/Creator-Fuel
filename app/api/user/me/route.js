import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/db/connectDb";
import User from "@/app/models/User";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  await connectDB();

  const user = await User.findOne(
    { email: session.user.email.toLowerCase() },
    { name: 1, email: 1, username: 1, profilePicture: 1, coverPicture: 1, razorpayId: 1, razorpaySecret: 1 }
  ).lean();

  const hasSecret = !!user?.razorpaySecret;

  return NextResponse.json({ 
    user: { ...user, razorpaySecret: undefined, hasRazorpaySecret: hasSecret } 
  });
}
