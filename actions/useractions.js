"use server";
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import User from "@/models/User";
import connectDb from "@/db/connectDb";

//orderId initiate karna hai
export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();
  console.log("initiate start hua");

  try {
    //fetch the secret of the user who is getting paid
    let user = await User.findOne({ username: to_username });
    console.log("user mila database se");
    const secret = user.razorpaysecret;

    var instance = new Razorpay({
      key_id: user.razorpayid,
      key_secret: secret,
    });

    console.log("KEY secret ", instance.key_secret);

    let options = {
      amount: Number.parseInt(amount),
      currency: "INR",
    };

    let x = await instance.orders.create(options);
    console.log("order create hua");
    // # fBQ8pbNxklXSUSEpn4Ccd
    //Create a payment object which shows pending payment in db
    await Payment.create({
      order_id: x.id,
      amount: amount / 100,
      to_user: to_username,
      name: paymentform.name,
      message: paymentform.message,
    });
    return x;
  } catch (error) {
    console.log("Payment Error: ",error);
  }
};

export const fetchUser = async (username) => {
  await connectDb();
  let u = await User.findOne({ username: username });
  //It converts a MongoDB document (u) into a plain JavaScript object (toObject()).
  u = u.toObject({ flattenObjectIds: true });
  return u;
};

export const fetchPayment = async (username) => {
  await connectDb();
  let pay = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .limit(6)
    .lean();

    const formattedOrders = pay.map(order => ({
      ...order,
      _id: order._id.toString(),  // Convert ObjectId to string
      createdDate: order.createdDate.toISOString() // If date, convert to string
    }));
  // pay=pay.toObject({flattenObjectIds:true});
  return formattedOrders;
};

export const updateUser = async (data, oldusername) => {
  await connectDb();
  let ndata = Object.fromEntries(data);
  console.log("new data: ",ndata);
  if (ndata.username !== oldusername) {
    let u = await User.findOne({ username: ndata.username });
    if (u) {
      return { error: "Username is already in use" };
    }
    await User.updateOne({ email: ndata.email }, ndata);
    await Payment.updateMany(
      { to_user: oldusername },
      { to_user: ndata.username }
    );
  } else {
    await User.updateOne({ email: ndata.email }, ndata);
  }
};

export const findUser = async (uName) => {
  await connectDb();
  let a = User.findOne({ username: uName });
  if (!a) {
    return false;
  } else {
    return true;
  }
};
