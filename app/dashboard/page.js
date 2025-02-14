"use client"
import React, { useCallback, useEffect,useState } from 'react'
import { useSession,signIn,signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { fetchUser,updateUser } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'

const Dashboard = () => {
    const { data : session, update }=useSession();
    const router= useRouter();
    const [form, setform] = useState({
      email: "",
      name: "",
      username: "",
      coverpic: "",
      profilepic: "",
      razorpayid: "",
      razorpaysecret: ""
    });

    useEffect(() => {     
      if(!session){
        router.push("/login");
      }else{
        getData(); 
        console.log("run hua");
      }
    }, [session,router])
    
    const getData= useCallback(async ()=>{
      let u=await fetchUser(session.user.name);
      setform(u);
    },[session]);

    const handleChange=(e)=>{
      setform((prev_form)=>({...prev_form,[e.target.name]:e.target.value}));
    }

    const handleSubmit= async (e)=>{
      update();//updates session
      await updateUser(e,session.user.name);
      toast('Profile Updated', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }

    return (
      <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    <ToastContainer />
    <div >
      <h2 className='text-center font-semibold text-2xl  mt-2'>Welcome to Dashboard</h2>
        <form className="max-w-sm mx-auto mb-12 max-md:mx-8" action={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="block  text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="email" value={form.email} onChange={handleChange} name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="block  text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="name" name="name" value={form.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="block  text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input type="name" name="username" value={form.username} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>
          <div className="mb-3">
            <label htmlFor="profilepic" className="block  text-sm font-medium text-gray-900 dark:text-white">Profile pic</label>
            <input type="text" name="profilepic" value={form.profilepic} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="mb-3">
            <label htmlFor="coverpic" className="block  text-sm font-medium text-gray-900 dark:text-white">Cover pic</label>
            <input type="text" name="coverpic" value={form.coverpic} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="mb-3">
            <label htmlFor="razorpayid" className="block  text-sm font-medium text-gray-900 dark:text-white">RazorPay Id</label>
            <input type="text" name="razorpayid" value={form.razorpayid} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>
          <div className="mb-3">
            <label htmlFor="razorpaysecret" className="block  text-sm font-medium text-gray-900 dark:text-white">RazorPay Secret</label>
            <input type="text"  name="razorpaysecret" value={form.razorpaysecret} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
        
    </div>
    </>
  )
}

export default Dashboard
