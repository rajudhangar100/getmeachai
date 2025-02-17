import connectDb from '@/db/connectDb'
import React from 'react'

const test = () => {
    const doit= async () =>{
        console.log("started");
        await connectDb();
        console.log("completed");
    }
    doit();
  return (
    <div>
      this is test
    </div>
  )
}

export default test
