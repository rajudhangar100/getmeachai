"use client"
import { useState } from 'react';
import Image from 'next/image';
import { useSession,signIn,signOut } from 'next-auth/react' //-- This is the place where we'll be using sessions
import React from 'react'
import Link from "next/link";
//data-dropdown-toggle="dropdown"
const Navbar = () => {
  const [showdropdown,setShowdropdown]=useState(false);
  const { data : session }=useSession();
  return (
    <nav className='py-2 bg-gray-900  flex   md:justify-between px-7 max-md:gap-1 items-center text-white max-md:flex-col '>
      <div className='Logo font-bold flex items-center'><Link href={"/"}>GetMeaChai</Link>
      <span className='relative -top-2'>
        <Image unoptimized src="/tea.gif"  width={40} height={40} alt="not found" />
        </span>
      </div>
      <div className='max-md:flex max-md:flex-col max-md:items-center'>
      {session && 
       <>
        <button id="dropdownDefaultButton"  onMouseOver={()=>{setShowdropdown(!showdropdown)}}  data-dropdown-toggle="dropdown"  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-4 max-md:mb-3" type="button">welcome {session.user.name} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
        </button>

        <div id="dropdown" onBlur={()=>{
          setTimeout(()=>{setShowdropdown(false)},100)
        }} className={`z-10 ${showdropdown?" ":"hidden"} absolute right-40  max-md:right-12  bg-white divide-y divide-gray-100 rounded-lg shadow w-44  dark:bg-gray-700`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <Link href="/dashboard" onClick={()=>{setShowdropdown(!showdropdown)}} className="block px-4  py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
              </li>
              <li>
                <Link href="/search" onClick={()=>{setShowdropdown(!showdropdown)}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Search</Link>
              </li>
              <li>
                <Link href={`/${session.user.name}`}  onClick={()=>{setShowdropdown(!showdropdown)}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
              </li>
              <li>
                <Link href="#" onClick={()=>signOut()} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
              </li>
            </ul>
        </div>
      </>
      }
      
      {session && <button onClick={()=>{ signOut() }} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-[6px] text-center me-2 mb-2">
        Logout</button>}
      {!session && 
      <Link href={"/login"}>
      <button  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-[6px] text-center me-2 mb-2">
        Login
      </button>
        </Link>}</div>
    </nav>
  )
}

export default Navbar
