import React from 'react';
import { FaBars, FaBell } from 'react-icons/fa';
import Link from "next/link";

function Header({ toggleSidebar }) {
  return (
    <header className="bg-[#FCF8F3] p-6 flex justify-between items-center border-b border-gray-200">
      <button className="md:hidden text-xl" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <nav className="hidden md:flex space-x-14 text-base font-medium">
        <a href="#" className="text-black">Home</a>
        <a href="#" className="text-black">About Us</a>
        <a href="#" className="text-black">Pricing</a>
        <a href="#" className="text-black">Contact Us</a>
      </nav>
      <div className="flex items-center space-x-6">
        <FaBell className="text-xl cursor-pointer" />
        <button className="bg-[#BB5D06] text-white text-sm px-4 py-2 rounded-lg"><Link href={"/dashboard/Proverb"}>Add proverb</Link></button>
        <div className="w-8 h-8 rounded-full bg-[#BB5D06] flex items-center justify-center text-white">GM</div>
      </div>
    </header>
  );
}

export default Header;
