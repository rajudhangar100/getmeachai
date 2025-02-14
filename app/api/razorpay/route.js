import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils'
import connectDb from '@/db/connectDb'
import Payment from '@/models/Payment'
import Razorpay from 'razorpay'
import { NextResponse } from 'next/server'
import User from '@/models/User'

export const POST = async (req) => {
   try {
    await connectDb()
    let body=await req.formData()
    console.log("request body: ",req);
    body=Object.fromEntries(body)

    let p=await Payment.findOne({order_id:body.razorpay_order_id})
    if(!p){
        return NextResponse.json({success:false,message:"OrderId not found"});
    }
    console.log("Order ID(from route/razorpay): ",p);
    //fetch the secret of the user who is getting paid
    let user=await User.findOne({username:p.to_user})
    const secret=user.razorpaysecret;

    //Validating Payment
    let xx=validatePaymentVerification({"order_id":body.razorpay_order_id,"payment_id":body.razorpay_payment_id},
        body.razorpay_signature,secret) 
    
    if(xx){
        const updatedPayment=await Payment.findOneAndUpdate({order_id:body.razorpay_order_id},{done:true},{new:true})
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`)
    }
    else{
        NextResponse.json({success:false,message:"Payment Verification Failed"})
    }
   } catch (error) {
     console.error("Error from route/razorpay: ",error);
   }
}
