import Paymentpage from '@/components/paymentpage'
import React from 'react'
import { notFound } from 'next/navigation'
import connectDb from '@/db/connectDb'
import User from '@/models/User'
// import { useSession } from 'next-auth/react'

const Username = async ({params}) => {
  // const {data:session}=useSession();
  // if(!session){
  //   const router=useRouter();
  //   router.push('/login');
  // }
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
