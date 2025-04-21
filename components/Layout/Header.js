'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Bell, Menu } from 'lucide-react';
import { IoChevronDown, IoChevronForward } from 'react-icons/io5';

export default function Navbar({ toggleSidebar }) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    if (router.isReady) {
      setCurrentPath(router.pathname);
    }
  }, [router]);

  const pageTitles = {
    '/clients': 'Dashboard',
    '/clients/add-students': 'User Management',
    '/clients/manually-register': 'Manually Register student',
  };

  const currentPage = pageTitles[currentPath] || 'Dashboard';

  return (
    <nav className="bg-white px-8 py-4 flex items-center justify-between relative border-b">
      {/* Sidebar Toggle Button (Only on Mobile) */}
      <button className="lg:hidden p-2 text-gray-600" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>

      {/* Page Title */}
      <h1 className="text-lg font-semibold text-black lg:ml-4">{currentPage}</h1>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <Bell size={22} className="text-gray-600 cursor-pointer" />
          <span className="absolute -top-1 -right-2 bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            6
          </span>
        </div>

        {/* Profile Dropdown */}
        <div
          className="relative flex items-center space-x-2 cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-500">A</span>
          </div>
          <span className="text-gray-800 font-medium">Admin</span>
          <span className="text-gray-500">
            {isDropdownOpen ? <IoChevronDown /> : <IoChevronForward />}
          </span>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-14 w-38 bg-white shadow-lg rounded-lg z-50">
              <ul className="py-2 text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                <li className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
