import React from 'react'
import logo from '../assets/logof.png'
const navbar = () => {
  return (
    <>
    <div className="bg-fuchsia-600 flex justify-between items-center w-full px-0 sm:px-25 md:px-50 m-0 h-15">
        <img src={logo} alt="" className='h-23'  />
        <ul className="flex justify-center items-center">
            <li className='m-5 text-2xl font-semibold'>Home</li>
            <li className='m-5 text-2xl font-semibold'>Your Task</li>
        </ul>
    </div>
    </>
  )
}

export default navbar
