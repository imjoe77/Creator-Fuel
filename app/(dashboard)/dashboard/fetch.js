"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchUser } from "@/actions/useractions";
import DashboardSignup from "./DashboardSignup";
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
 console.log("SESSION 👉", session);
  if (!session) {
    // optional: redirect to login
    return null;
  }

  const user = await fetchUser(session.user.email);
 console.log("FETCHED USER 👉", user);
  return <DashboardSignup user={user} />;
}
