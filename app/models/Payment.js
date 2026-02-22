import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const paymentSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    oid: { type: String, required: true },
    to_user: {type: String,required: true},
    paymentId: { type: String },
    message:{type:String,required:true},
    createdat: { type: Date, default: Date.now },
    updatedat: { type: Date, default: Date.now },
    done: { type: Boolean, default: false },
});

const Payment= mongoose.models.Payment || model('Payment', paymentSchema);
export default Payment;