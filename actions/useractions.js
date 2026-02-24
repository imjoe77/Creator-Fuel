"use server"
import mongoose from "mongoose";
import connectDB from "@/db/connectDb";
import User from "@/app/models/User";
import { getServerSession } from "next-auth";
import Razorpay from "razorpay"        // <--- To talk to Razorpay
import Payment from "@/app/models/Payment" // <--- To save payment records
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache"; 

export const updateProfile = async (prevState, formData) => {
    const updatedData = {};
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            throw new Error("Not authenticated");
        }
        
        const emailFromSession = session.user.email.trim().toLowerCase();
        await connectDB();

        const currentUser = await User.findOne({ email: emailFromSession });
        if (!currentUser) {
            throw new Error("User not found");
        }

        // 1. EXTRACT ALL FIELDS 
        const name = formData.get("name")?.trim();
        const uname = formData.get("username")?.trim();
        const ppic = formData.get("profilePicture")?.trim();
        const cpic = formData.get("coverPicture")?.trim();
        const rid = formData.get("razorpayId")?.trim();
        const rsc = formData.get("razorpaySecret")?.trim();

        // 2. CHECK AND ASSIGN EACH FIELD
        if (name && name !== currentUser.name) {
            updatedData.name = name;
        }

        if (uname && uname !== currentUser.username) {
            const exisuname = await User.findOne({ username: uname });
            if (exisuname && exisuname._id.toString() !== currentUser._id.toString()) {
                return { success: false, message: "Username already exists" };
            }
            updatedData.username = uname;

            try {
                await Payment.updateMany(
                    { to_user: currentUser.username }, 
                    { to_user: uname }                 
                );
            } catch (err) {
                console.error("Failed to update old payments:", err);
            }
        }

        if (ppic && ppic !== currentUser.profilePicture) {
            updatedData.profilePicture = ppic;
        }

        if (cpic && cpic !== currentUser.coverPicture) {
            updatedData.coverPicture = cpic;
        }

   if (rid && rid !== currentUser.razorpayId) {
            updatedData.razorpayId = rid;
        }

   if (rsc && rsc !== currentUser.razorpaySecret) {
            updatedData.razorpaySecret = rsc;
        }

        // 3. SAVE TO DATABASE
        if (Object.keys(updatedData).length > 0) {
            await User.findByIdAndUpdate(
                currentUser._id,
                { $set: updatedData }
            );

            // Update the public profile for your fans!
            if (updatedData.username || currentUser.username) {
                revalidatePath(`/${updatedData.username || currentUser.username}`);
            }

            return {
                success: true,
                message: "Profile updated Successfully!",
                id: Math.random() // 👈 THIS forces React to trigger the Toast every time!
            }
        }
        else {
            return {
                success: true,
                message: "No changes detected",
                id: Math.random() // 👈 Here too!
            }
        }
    } catch (error) {
        console.error("Update profile error:", error);
        return {
            success: false,
            message: "Something went wrong. Please try again."
        };
    }
};

//Function to initiate payments
export const initiate = async (amount, to_username, payment_form) => {
    // 1. Connect to the database
    await connectDB()

    // 2. Fetch the CREATOR (Receiver) to get THEIR specific keys
    let creator = await User.findOne({ username: to_username });

    // 3. Validation: Stop if the creator hasn't set up their keys yet
    if (!creator || !creator.razorpayId || !creator.razorpaySecret) {
        throw new Error("Creator has not added their Razorpay credentials yet.");
    }

    // 4. Setup the Razorpay "Cashier"
    var instance = new Razorpay({
        key_id: creator.razorpayId,
        key_secret: creator.razorpaySecret
    })

    // 5. Create the "Bill" (Order)
    let options = {
        amount: Number.parseInt(amount) * 100,
        currency: "INR",
    }

    // 6. Send the bill to Razorpay and wait for the Order ID
    let x = await instance.orders.create(options)

    // 5. Create a Receipt in YOUR Database
    await Payment.create({
        oid: x.id,                   
        amount: amount,              
        to_user: to_username,        
        name: payment_form.name,     
        message: payment_form.message,
        done: false,                 
    })

    // 6. Return the Order details to the frontend so it can open the popup
    return x
}

//Function to fetch payments
export const fetchPayments = async (username) => {
    await connectDB()

    let p = await Payment.find({ to_user: username, done: true })
        .sort({ amount: -1 }) 
        .limit(10) 
        .lean() 

    // FIX THE SERIALIZATION ERROR
    let plainPayments = p.map((doc) => ({
        ...doc,
        _id: doc._id.toString(), 
    }))

    return plainPayments
}

//Function to calculate payments summary
export const fetchUserStats = async (username) => {
    await connectDB();

    const stats = await Payment.aggregate([
        { $match: { to_user: username, done: true } },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$amount" },
                totalCount: { $sum: 1 }
            }
        }
    ]);

    return stats.length > 0 ? stats[0] : { totalAmount: 0, totalCount: 0 };
}

// Function to search for creators
export const searchUsers = async (query) => {
    if (!query || query.length < 2) return [];

    await connectDB();

    let users = await User.find({
        $or: [
            { username: { $regex: query, $options: 'i' } },
            { name: { $regex: query, $options: 'i' } }
        ]
    })
        .limit(5)
        .select('username name profilePicture')
        .lean();

    return users.map(u => ({
        ...u,
        _id: u._id.toString()
    }));
}

export const fetchUser = async (email) => {
    await connectDB();
    const user = await User.findOne({ email: email.trim().toLowerCase() }).lean();
    if (!user) return null;
    return {
        ...user,
        _id: user._id.toString(),
    };
}
