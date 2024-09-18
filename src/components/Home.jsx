import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import Button from './Button';
import Category from './Category';
import Menu from './Menu';

const Home = () => {
  return (
    <>   
    <div className="relative bg-[url('images/bg.png')] bg-cover bg-center h-screen">
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className='text-white  flex  w-[800px] flex-col gap-8 h-full mx-[100px] justify-center z-10 relative'>
        <h1 className='font-bold text-6xl'>We deliver the taste of life</h1>
        <p className='text-2xl'>Italian food makes people think of big family dinners. So you may want to position your restaurant as a place to bring the whole family.Get it delivered right to your door.</p> 
          
        <div className='flex flex-row gap-8 items-center'>
            {/* <p className="text-[#F37116] text-1xl font-bold">Easy Way To Order Your Food</p> */}
            <Button text="Order Now"/>
            <TbTruckDelivery className='text-6xl font-bold ' />
        
        </div>
    </div>
    <Category/>
    <Menu/>
    </div>

      
    </>
  )
}

export default Home
