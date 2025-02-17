import Paymentpage from '@/components/paymentpage'
import React from 'react'
import { notFound } from 'next/navigation'
import connectDb from '@/db/connectDb'
import User from '@/models/User'

const Username = async ({params}) => {
    const checkUser=async ()=>{
      await connectDb()
      let c=await User.findOne({username:params.username});
      if(!c){
        return notFound();
      }
    }
    await checkUser();

    return( <>
     <Paymentpage username={params.username}/>
    </>
  )
}

export default Username
