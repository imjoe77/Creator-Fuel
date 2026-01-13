"use server"
import mongoose from "mongoose";
import connectDB from "@/db/connectDb";
import User from "@/app/models/User";
import { getServerSession } from "next-auth";
//Authoptions contains the auth configuration(providers,callbacks,etc)
import { authOptions } from "@/app/api/auth/[...nextauth]/route";



//Function fetching existing user info and auto fills saved info
export const fetchUser = async (email) => {
    try {
        if (!email) return null; //If new user dont return anything

        const nemail = email.trim().toLowerCase();
        await connectDB();
        //.lean() returns plain json object parsing complex mongodb objects
        const user = await User.findOne({ email:nemail }).lean();
        return user; //If exists return user info
    } catch (error) {
        console.error("Fetch user error:", error);
        return null;
    }
};

export const updateProfile = async (prevState,formData) => {
    //Object to carry updated data fields
    const updatedData = {};
    try {
        const session = await getServerSession(authOptions);


        if (!session) {
            throw new Error("Not authenticated");
        }
        //Get username from sessions for current user info
        const emailFromSession = session.user.email.trim().toLowerCase();


        await connectDB();

        //Finding current user from sessions username
        const currentUser = await User.findOne({ email: emailFromSession });

        if (!currentUser) {
            throw new Error("User not found");
        }

        //Namings
        const uname = formData.get("username")?.trim();
        const name = formData.get("name")?.trim();
        const email = formData.get("email")?.trim();
        const rid = formData.get("razorpayId")?.trim();
        const rsc = formData.get("razorpaySecret")?.trim();



        //1st check - Name exists and Making sure form's data and database data are not same
        if (uname && uname !== currentUser.username) {
            //Query only if form data and DB data is unique
            const exisuname = await User.findOne({ name: name });
            //2nd check - Validating new name is unique in DB and Checking if existing name doesn't belong to current user
            if (exisuname && exisuname._id.toString() !== currentUser._id.toString()) {
                return {
                    success: false,
                    message: "Username already exists"
                };
            }
            //Pushing the changed data into an empty object
            updatedData.username = uname;
        }


        //The checks should run only if the old value and new value r not same
        if (email && email !== currentUser.email) {
            const exismail = await User.findOne({ email: email });
            //2nd condition to avoid duplicate credentials
            if (exismail && exismail._id.toString() !== currentUser._id.toString()) {
                return {
                    success: false,
                    message: "Email already exists"
                };
            }
            updatedData.email = email;
        }

        if (name && name !== currentUser.name) {
            const exisname = await User.findOne({ name: name });
            //2nd condition to avoid duplicate credentials
            if (exisname && exisname._id.toString() !== currentUser._id.toString()) {
                return {
                    success: false,
                    message: "Email already exists"
                };
            }
            updatedData.name = name;
        }


        if (rid && rid !== currentUser.razorpayId) {
            const exisrid = await User.findOne({ razorpayId: rid });
            if (exisrid && exisrid._id.toString() !== currentUser._id.toString()) {
                return {
                    success: false,
                    message: "Duplicate RazorPay Id, already exists"
                };
            }
            updatedData.razorpayId = rid;
        }

        if (rsc && rsc !== currentUser.razorpaySecret) {
            const exisrsc = await User.findOne({ razorpaySecret: rsc });
            if (exisrsc && exisrsc._id.toString() !== currentUser._id.toString()) {
                return {
                    success: false,
                    message: "Duplicate Razor Secret, already exists"
                };
            }
            updatedData.razorpaySecret = rsc;
        }

        //Checking if updated object has values in it and pushing all changes altogether in the DB
        if (Object.keys(updatedData).length > 0) {
            await User.findByIdAndUpdate(
                currentUser._id,
                { $set: updatedData }
            );
            return {
                success: true,
                message: "Profile updated Successfully..."
            }
        }
        else {
            return {
                success: true,
                message: "No changes detected"
            }
        }


    } catch (error) {
        console.error("Update profile error:", error);
        return null;
    }
};
