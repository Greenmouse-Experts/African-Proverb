import React from 'react';
import { FaThLarge, FaUser, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Link from "next/link";
import { useRouter } from 'next/router';
import SidebarItem from './SidebarItem';

function Sidebar({ isOpen, toggleSidebar }) {
  const router = useRouter();
  
  const isActive = (path) => router.pathname === path;

  return (
    <aside className={`fixed md:relative top-0 left-0 h-screen bg-white shadow-lg z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} w-64`}>
      <div className="py-6 space-y-6">
        <div className="px-6">
          <img
            src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1741096252/We-Immersive/primarylogo.ebc6ec00_x9uzsw.svg"
            alt="African Art"
            className="w-48 object-cover"
          />
        </div>
        <nav className="space-y-6 text-base">

          <Link href="/dashboard" passHref>
            <div className={`${isActive('/dashboard') ? 'bg-gray-100' : ''} rounded-md cursor-pointer`}>
              <SidebarItem 
                icon={<FaThLarge />} 
                label="Dashboard" 
                iconSize={24} 
                color={isActive('/dashboard') ? 'text-white' : 'text-black'}
              />
            </div>
          </Link>

          <Link href="/dashboard/EmployeePage" passHref>
            <div className={`${isActive('/dashboard/EmployeePage') ? 'bg-gray-100' : ''} rounded-md cursor-pointer`}>
              <SidebarItem 
                icon={<FaUser />} 
                label="Student/Employee" 
                iconSize={24} 
                color={isActive('/dashboard/EmployeePage') ? 'text-white' : 'text-black'}
              />
            </div>
          </Link>

          <Link href="/dashboard/NotificationPage" passHref>
            <div className={`${isActive('/dashboard/NotificationPage') ? 'bg-gray-100' : ''} rounded-md cursor-pointer`}>
              <SidebarItem 
                icon={<FaBell />} 
                label="Notification" 
                iconSize={24} 
                color={isActive('/dashboard/NotificationPage') ? 'text-white' : 'text-black'}
              />
            </div>
          </Link>

          <Link href="/settings" passHref>
            <div className={`${isActive('/settings') ? 'bg-gray-100' : ''} rounded-md cursor-pointer`}>
              <SidebarItem 
                icon={<FaCog />} 
                label="Settings" 
                iconSize={24} 
                color={isActive('/settings') ? 'text-white' : 'text-black'}
              />
            </div>
          </Link>

        </nav>

        <div className="mt-auto px-6">
          <SidebarItem 
            icon={<FaSignOutAlt />} 
            label="Sign out" 
            iconSize={24} 
            color="text-black"
          />
        </div>
      </div>

      {isOpen && <div className="fixed inset-0 bg-black opacity-25 md:hidden" onClick={toggleSidebar}></div>}
    </aside>
  );
}

export default Sidebar;
