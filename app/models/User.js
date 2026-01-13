import mongoose from "mongoose";
const {Schema, model} = mongoose;
const userSchema = new Schema({
    email:{type:String, required:true},
    name:{type:String, required:true},
    username:{type:String, required:true, unique:true},
    profilePicture:{type:String},
   coverPicture:{type:String},
   razorpayId: { type: String },
   razorpaySecret: { type: String },
    createdat:{type:Date, default:Date.now},
    updatedat:{type:Date, default:Date.now},
});

//Creating a model only once and reusing it to prevent OverwriteModelError (essential for Next.js hot-reloading)
const User = mongoose.models.User || model("User", userSchema);
export default User;