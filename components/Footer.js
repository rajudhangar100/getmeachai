import React from 'react'

const Footer = () => {
  const currYear=new Date().getFullYear();
  return (
    <footer className='py-6 bg-gray-900 flex justify-center px-7 text-white items-center text-sm max-md:text-center '>
      CopyRight &copy; {currYear}  All Rights Reserved  || Get Me a Chai-A Website for funding
    </footer>
  )
}

export default Footer
