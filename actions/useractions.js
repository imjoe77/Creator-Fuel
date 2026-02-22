"use server"
import mongoose from "mongoose";
import connectDB from "@/db/connectDb";
import User from "@/app/models/User";
import { getServerSession } from "next-auth";
import Razorpay from "razorpay"        // <--- To talk to Razorpay
import Payment from "@/app/models/Payment" // <--- To save payment records




//Authoptions contains the auth configuration(providers,callbacks,etc)
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

//Function to update user details and check validations
export const updateProfile = async (prevState, formData) => {
    //Object to carry updated data fields
    const updatedData = {};
    try {
        const session = await getServerSession(authOptions);
        //Runs only if a user is logged in
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

        const ppic = formData.get("profilePicture")?.trim();
        const cpic = formData.get("coverPicture")?.trim();
        const rid = formData.get("razorpayId")?.trim();
        const rsc = formData.get("razorpaySecret")?.trim();

        //Validations check before saving and updating info
        // 1st check - Name exists and Making sure form's data and database data are not same
        if (uname && uname !== currentUser.username) {
            //Query only if form data and DB data is unique
            const exisuname = await User.findOne({ username: uname });
            //2nd check - Validating new name is unique in DB and Checking if existing name doesn't belong to current user
            if (exisuname && exisuname._id.toString() !== currentUser._id.toString()) {
                return {
                    success: false,
                    message: "Username already exists"
                };
            }
            //Pushing the changed data into an empty object
            updatedData.username = uname;

            // Transfer all past payments to the new username! 
            try {
                await Payment.updateMany(
                    { to_user: currentUser.username }, // Find every payment with the OLD username
                    { to_user: uname }                 // Replace it with the NEW username
                );
            } catch (err) {
                console.error("Failed to update old payments:", err);
            }

        }





        //3rd check-Profile Picture 
        if (ppic && ppic !== currentUser.profilePicture) {
            const exisppic = await User.findOne({ profilePicture: ppic });
            if (exisppic && exisppic._id.toString() !== currentUser._id.toString()) {
                return {
                    success: false,
                    message: "Same Pic uploaded"
                };
            }
            updatedData.profilePicture = ppic;
        }

        //4th check-Cover Picture 
        if (cpic && cpic !== currentUser.coverPicture) {
            const exiscpic = await User.findOne({ coverPicture: cpic });
            if (exiscpic && exiscpic._id.toString() !== currentUser._id.toString()) {
                return {
                    success: false,
                    message: "Same Pic uploaded"
                };
            }
            updatedData.coverPicture = cpic;
        }


        //5th check-RazorPay Id check
        if (rid && rid !== currentUser.razorpayId) {
            updatedData.razorpayId = rid;
        }

        //6th check-RazorPay Secret check
        if (rsc && rsc !== currentUser.razorpaySecret) {
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
    // We search by the username passed to this function
    let creator = await User.findOne({ username: to_username });

    // 3. Validation: Stop if the creator hasn't set up their keys yet
    if (!creator || !creator.razorpayId || !creator.razorpaySecret) {
        throw new Error("Creator has not added their Razorpay credentials yet.");
    }

    // 4. Setup the Razorpay "Cashier"
    // We use the keys from .env file (NEVER hardcode them here)
    var instance = new Razorpay({
        key_id: creator.razorpayId,
        key_secret: creator.razorpaySecret
    })

    // 5. Create the "Bill" (Order)
    // Razorpay deals in PAISA. So we multiply by 100 (e.g., 10 Rs = 1000 Paisa)
    let options = {
        amount: Number.parseInt(amount) * 100,
        currency: "INR",
    }

    // 6. Send the bill to Razorpay and wait for the Order ID
    let x = await instance.orders.create(options)

    //Now x will have the following with order id
    // 5. Create a Receipt in YOUR Database
    // We save this as "done: false" because they haven't paid yet. 
    // We just want a record that they *tried* to pay.
    await Payment.create({
        oid: x.id,                   // The ID Razorpay gave us
        amount: amount,              // We store it in Rupees (easier to read)
        to_user: to_username,        // Who gets the money?
        name: payment_form.name,     // Who is sending it?
        message: payment_form.message,
        done: false,                 // Default is false until verified
    })

    // 6. Return the Order details to the frontend so it can open the popup
    return x
}

//Function to fetch payments
export const fetchPayments = async (username) => {
    await connectDB()

    // Find all payments where 'to_user' matches the profile we are visiting
    // AND 'done' is true (we don't want to show failed/pending payments)
    let p = await Payment.find({ to_user: username, done: true })
        .sort({ amount: -1 }) // Sort by amount (Highest first). Change to { createdAt: -1 } for Newest first.
        .limit(10) // Let's only load the top 10 to keep the page fast
        .lean() // Converts Mongoose objects to plain JavaScript objects (makes it faster)


    // 4. FIX THE SERIALIZATION ERROR
    // We must convert the "_id" (which is an ObjectId) to a simple String
    // We basically create a new "clean" list to send to the frontend
    let plainPayments = p.map((doc) => ({
        ...doc,
        _id: doc._id.toString(), // Convert ObjectId to String
        // If you have dates, you might need to convert them too:
        // createdAt: doc.createdAt ? doc.createdAt.toISOString() : null
    }))

    return plainPayments


}

//Function to calculate payments summary
export const fetchUserStats = async (username) => {
    await connectDB();

    // Aggregate: Group all payments for this user and sum them up
    const stats = await Payment.aggregate([
        //Only completed payments
        { $match: { to_user: username, done: true } },

        // 2. Group: Calculate the totals
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$amount" },
                totalCount: { $sum: 1 }
            }
        }
    ]);

    // If no payments exist, return 0. Otherwise return the calculated stats.
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