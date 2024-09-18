import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { IoSearchSharp } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
  const navigate = useNavigate();

  const goToadminlogin = () => {
    navigate('/adminlogin'); 
  };

  return (
    <div className='flex px-[100px] justify-between items-center h-[60px] bg-[#F37116]'>
      <img width="50px" src="images/logo1.svg" alt="Logo" />
      
      <ul className='flex gap-5 list-none text-white'>
        <li>
          <Link to="/" className="text-white hover:text-gray-400 cursor-pointer">Home</Link>
        </li>
        <li>
          <Link to="/Menu" className="text-white hover:text-gray-400 cursor-pointer">Menu</Link>
        </li>
        <li>
          <Link to="/Category" className="text-white hover:text-gray-400 cursor-pointer">Category</Link>
        </li>
        <li>
          <Link to="/insert" className="text-white hover:text-gray-400 cursor-pointer">Insert Food</Link>
        </li>
        <li>
          <Link to="/lsearch" className="text-white hover:text-gray-400 cursor-pointer">Linear Search</Link>
        </li>
        <li>
          <Link to="/csearch" className="text-white hover:text-gray-400 cursor-pointer">Character Search</Link>
        </li>
        <li>
          <Link to="/Contact" className="text-white hover:text-gray-400 cursor-pointer">Contact</Link>
        </li>
      </ul>
      <div className='flex flex-row items-center text-white gap-5'>
        <IoSearchSharp className='text-2xl' />
        <li>
          <Link to="/cart" className="text-white hover:text-gray-400 cursor-pointer">
            <FaCartShopping className='text-2xl'/>
          </Link>
        </li>
        <Button text="Log in" onClick={goToadminlogin} />
      </div>
    </div>
  );
};

export default Navbar;
