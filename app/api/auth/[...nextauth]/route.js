import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import User from "@/app/models/User";
import connectDB from "@/db/connectDb";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectDB();
        
        const email = user.email.toLowerCase();
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
          // Create new user if they don't exist
          await User.create({
            name: user.name,
            email: email,
            username: email.split("@")[0], // Default username
            profilePicture: user.image,
          });
        }
        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },

    // MERGED SESSION CALLBACK
    async session({ session, token, user }) {
      try {
        // 1. Validate session
        if (!session?.user?.email) return session;

        // 2. Connect to DB
        await connectDB();
        
        // 3. Find the user in DB
        const dbUser = await User.findOne({ email: session.user.email });
        
        if (dbUser) {
          // 4. Inject the data into the session
          session.user.name = dbUser.name;
          session.user.username = dbUser.username; // <--- THIS is what you need for the links!
          session.user.id = dbUser._id.toString(); // Useful to have ID too
        }
        
        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return session;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };