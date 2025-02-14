import mongoose from "mongoose";
const { Schema, model } = mongoose;

const paymentSchema = new Schema({
  order_id: { type: String, required: true },
  amount: { type: Number, required: true },
  to_user: { type: String, required: true },
  name: { type: String, required: true },
  message: { type: String },
  createdDate: { type: Date, default: ()=>Date.now() },
  done: { type: Boolean, default: false }
});

export default mongoose.models.Payment || model("Payment",paymentSchema);
