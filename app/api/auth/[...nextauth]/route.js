import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import User from "@/app/models/User";
import Payment from "@/app/models/Payment"; 
import connectDb from "@/db/connectDb"; // <--- FIXED: You missed importing this!

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Make sure this is in your .env file
  callbacks: {
    async signIn({ user, account, profile }) {
      // Connect to DB immediately for any login attempt
      if (account.provider === "github" || account.provider === "google") {
        await connectDb();

        try {
          // Check if user exists
          const currentUser = await User.findOne({ email: user.email });

          if (!currentUser) {
            // Create new user if they don't exist
            const newUser = new User({
              email: user.email,
              username: user.email.split("@")[0], // e.g. "john" from "john@gmail.com"
              name: user.name,
            });
            await newUser.save();
          }
          return true; // Login successful
        } catch (error) {
          console.log("Error saving user to DB:", error);
          return false; // Stop login if DB error occurs
        }
      }
      return true;
    },

    // FIXED: Added this crucial callback so your frontend can access the username
    async session({ session }) {
      await connectDb();
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        
        session.user.username = dbUser.username;
        // session user id
         session.user.id = dbUser._id.toString();
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };