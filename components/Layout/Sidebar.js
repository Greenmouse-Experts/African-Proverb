import React from 'react';
import { FaThLarge, FaUser, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import SidebarItem from './SidebarItem';

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <aside className={`fixed md:relative top-0 left-0 h-screen bg-white shadow-lg z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} w-64`}>
      <div className="py-6 space-y-6">
        <div className="px-6">
          <Logo />
        </div>
        <nav className="space-y-2">
          <SidebarItem icon={<FaThLarge />} label="Dashboard" />
          <SidebarItem icon={<FaUser />} label="Student/Employee" />
          <SidebarItem icon={<FaBell />} label="Notification" />
          <SidebarItem icon={<FaCog />} label="Settings" />
        </nav>
        <div className="mt-auto px-6">
          <SidebarItem icon={<FaSignOutAlt />} label="Sign out" />
        </div>
      </div>
      {isOpen && <div className="fixed inset-0 bg-black opacity-25 md:hidden" onClick={toggleSidebar}></div>}
    </aside>
  );
}

export default Sidebar;
