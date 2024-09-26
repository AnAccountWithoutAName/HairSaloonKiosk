import React from 'react'

const Navbar = () => {
  return (
    <div className = "sticky w-full h-24 bg-green-700 backdrop-blur-sm border-b border-green-900">
        <div className="flex flex-wrap justify-between items-center max-w-[1240px] text-white m-auto">
            <h1 className='text-3xl font-bold font-serif mx-3 my-6'>HAIRCUTS. Inc</h1>
            <ul className = "flex justify-between items-center ">
                <li className='p-4 text-xl'>Home</li>
                <li className='p-4 text-xl'>Services</li>
                <li className='p-4 text-xl'>About</li>
                <li className='p-4 text-xl'>Contact Us</li>
                
            </ul>

        </div>
    </div>
  )
}

export default Navbar