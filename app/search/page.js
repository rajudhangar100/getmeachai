'use client'
import React from 'react';
import { useState } from 'react';
import { findUser } from '@/actions/useractions';
import { useRouter,notFound } from 'next/navigation'
import { set } from 'mongoose';

const Search = () => {
    // pt-[120px] pb-72
    const router=useRouter();
    const [userName, setuserName] = useState(''); 
    const [check,setCheck]=useState(false);
    const [arr,setArr]=useState(["namaste","duniyaa","just","information"]);

    const handleChange=(e)=>{
        setuserName(e.target.value);
    }

    const handleSubmit= async (uName)=>{
       let a=await findUser(uName);
       if(a){
            router.push(`/${uName}`);
       }else{
            return notFound();
       }
    }

    // const ClientSideSubmit=()=>{
    //     setArr([...arr,userName]);
    // }

    //Provide history of recent searches of different usernames
    // const handleFocus=()=>{
    //     check=true;
    // }

  return (
    <>
        <form action={()=>{handleSubmit(userName)}}> 
        <div className="contianer h-[77vh] flex justify-center items-center pb-32">
            <div className="h-{50vh} w-96 ">
                <input autoComplete='off' name='uname' onFocus={()=>{setCheck(true)}} onBlur={()=>{setCheck(false)}}  onChange={handleChange} type='text' id="uname" value={userName} className="bg-gray-50   border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-7 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search your Favourite Content Creator" required />
                <ul className='absolute'>
            {check && arr.map((e,i)=>{
            return <li key={i} className='bg-gray-50 w-96 py-3 px-3 dark:bg-gray-700 hover:bg-gray-500 cursor-pointer '>
                {e}
            </li>
        }) }
            </ul>
            </div>
            <div className="button">
                <button id="search" onClick={()=>{handleSubmit(userName)}}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-2 max-md:mb-3" type="button">
                    Search 
                </button>
            </div>
        </div>
        </form>   
    </>
  )
}

export default Search
