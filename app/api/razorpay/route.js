//After successful the page is redirected here as specified in the callback url
import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/app/models/Payment"
import connectDB from "@/db/connectDb";
import User from "@/app/models/User";

export const POST = async (req) => {
    await connectDB();
    
    // 1. Get the data Razorpay sent us (as FormData)
    let body = await req.formData();
    //Razorpay sends data as FormData since we use callback_url, not JSON so we convert to object.
    body = Object.fromEntries(body);

    // 2. Check if the Payment Order exists in our DB
    // We look for the "Pending" payment with this Order ID
    let p = await Payment.findOne({ oid: body.razorpay_order_id });
    if (!p) {
        return NextResponse.json({ success: false, message: "Order Not Found" });
    }

    // 👇 NEW: Fetch the specific creator to get THEIR secret key!
    let creator = await User.findOne({ username: p.to_user });
    if (!creator) {
        return NextResponse.json({ success: false, message: "Creator Not Found" });
    }

    // 3. Verify the Signature (The Security Check)
    // We match the signature Razorpay sent vs. what we generate with the CREATOR'S Secret Key
    let isValid = validatePaymentVerification(
        {
            "order_id": body.razorpay_order_id,
            "payment_id": body.razorpay_payment_id
        },
        body.razorpay_signature, 
        creator.razorpaySecret.trim() // ✅ THE FIX: Using the creator's secret from the database!
    );

    if (isValid) {
        // 4. Update the Database (The "done: true" step!)
        const updatedPayment = await Payment.findOneAndUpdate(
            { oid: body.razorpay_order_id }, 
            { done: true }, 
            { new: true }
        );
        
        // 5. Redirect User to their page with a success flag
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?payment=success`);
    } else {
        return NextResponse.json({ success: false, message: "Payment Verification Failed" });
    }
}
