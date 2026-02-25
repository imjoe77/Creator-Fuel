"use server"
import mongoose from "mongoose";
import connectDB from "@/db/connectDb";
import User from "@/app/models/User";
import { getServerSession } from "next-auth";
import Razorpay from "razorpay"
import Payment from "@/app/models/Payment"
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

        const name = formData.get("name")?.trim();
        const uname = formData.get("username")?.trim();
        const ppic = formData.get("profilePicture")?.trim();
        const cpic = formData.get("coverPicture")?.trim();
        const rid = formData.get("razorpayId")?.trim();
        const rsc = formData.get("razorpaySecret")?.trim();

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

        // ✅ FIXED: only update if non-empty AND different from current value
        if (rid && rid !== currentUser.razorpayId) {
            updatedData.razorpayId = rid;
        }

        // ✅ FIXED: only update razorpaySecret if user actually typed something new
        // If rsc is empty (browser cleared password field), keep existing secret untouched
        if (rsc && rsc.length > 0 && rsc !== currentUser.razorpaySecret) {
            updatedData.razorpaySecret = rsc;
        }
        // If rsc is empty, we do NOT touch razorpaySecret at all — existing value stays in DB

        if (Object.keys(updatedData).length > 0) {
            await User.findByIdAndUpdate(
                currentUser._id,
                { $set: updatedData }
            );

// 1. ALWAYS clear the old username's cache so it stops haunting the server
            revalidatePath(`/${currentUser.username}`);
            
            // 2. If they typed a new username, clear that new path too!
            if (updatedData.username) {
                revalidatePath(`/${updatedData.username}`);
            }

            return {
                success: true,
                message: "Profile updated Successfully!",
                id: Math.random()
            }
        } else {
            return {
                success: true,
                message: "No changes detected",
                id: Math.random()
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

export const initiate = async (amount, to_username, payment_form) => {
    await connectDB()

    let creator = await User.findOne({ username: to_username });

    if (!creator || !creator.razorpayId || !creator.razorpaySecret) {
        throw new Error("Creator has not added their Razorpay credentials yet.");
    }

    var instance = new Razorpay({
        key_id: creator.razorpayId,
        key_secret: creator.razorpaySecret
    })

    let options = {
        amount: Number.parseInt(amount) * 100,
        currency: "INR",
    }

    let x = await instance.orders.create(options)

    await Payment.create({
        oid: x.id,                   
        amount: amount,              
        to_user: to_username,        
        name: payment_form.name,     
        message: payment_form.message,
        done: false,                 
    })

    return x
}

export const fetchPayments = async (username) => {
    await connectDB()

    let p = await Payment.find({ to_user: username, done: true })
        .sort({ amount: -1 }) 
        .limit(10) 
        .lean() 

    let plainPayments = p.map((doc) => ({
        ...doc,
        _id: doc._id.toString(), 
    }))

    return plainPayments
}

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

// Function to fetch current logged-in user details 
export const fetchUser = async () => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return null;

        await connectDB();

       const user = await User.findOne({ email: session.user.email.toLowerCase() }, { razorpaySecret: 0 }).lean();

        if (user) {
            user._id = user._id.toString(); 
            
            // 👇 THE FIX: This completely sanitizes the MongoDB object (Dates, ObjectIds, etc.) 
            // so Next.js doesn't crash in production!
            return JSON.parse(JSON.stringify(user)); 
        }
        return null;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};
