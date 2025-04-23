'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { HiOutlineUsers } from 'react-icons/hi';
import {
  MdDashboard,
  MdOutlineSettings,
  MdOutlineNotifications,
  MdOutlineAnalytics,
  MdOutlineSubscriptions,
} from 'react-icons/md';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { useState } from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const isActive = (path) => router.pathname === path;

  return (
    <div className="relative">
      <div
        className={`fixed md:relative top-0 left-0 h-screen bg-[#9E4D02] text-white p-4 flex flex-col transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:w-72 w-64`}
      >
        {/* User Profile */}
        <div className="flex flex-col items-center mb-6">
          <FaUserCircle className="text-8xl md:mt-10 mt-5 mb-2" />
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 space-y-4">
          <SidebarItem href="/clients" icon={<MdDashboard />} text="Dashboard" active={isActive('/clients')} />

          <DropdownItem
            title="User Management"
            icon={<HiOutlineUsers />}
            isOpen={openDropdown === 'userManagement'}
            toggle={() => toggleDropdown('userManagement')}
            items={[
              { href: '/clients/add_student', text: 'Add Student' },
              { href: '/clients/manually_register', text: 'Manually Register Student' },
            ]}
            router={router}
          />

          <SidebarItem href="/clients/subscription" icon={<MdOutlineSubscriptions />} text="Subscription & Billing" active={isActive('/clients/subscription')} />
          <SidebarItem href="/clients/analytics" icon={<MdOutlineAnalytics />} text="Reports & Analytics" active={isActive('/clients/analytics')} />
          <SidebarItem href="/notifications" icon={<MdOutlineNotifications />} text="Notifications & Messaging" active={isActive('/notifications')} />

          <DropdownItem
            title="Customization & Settings"
            icon={<MdOutlineSettings />}
            isOpen={openDropdown === 'settings'}
            toggle={() => toggleDropdown('settings')}
            items={[
              { href: '/corporate-info', text: 'Corporate Information' },
              { href: '/corporate-list', text: 'Corporate List' },
            ]}
            router={router}
          />
        </nav>

        {/* Setup */}
        <div className="mt-auto space-y-4">
          <div>Setup</div>
          <SidebarItem href="/profile" icon={<FaUserCircle />} text="Profile" active={isActive('/profile')} />
          <SidebarItem href="/logout" icon={<FaSignOutAlt />} text="Log Out" active={isActive('/logout')} />
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 md:hidden z-30" onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

const SidebarItem = ({ href, icon, text, active }) => (
  <Link href={href} legacyBehavior>
    <a
      className={`flex items-center py-3 px-3 rounded-md cursor-pointer transition-colors ${
        active ? 'bg-[#5C3711]' : 'hover:bg-[#6A3E17]'
      }`}
    >
      <span className="mr-3 text-lg">{icon}</span> {text}
    </a>
  </Link>
);

const DropdownItem = ({ title, icon, isOpen, toggle, items, router }) => (
  <div>
    <button
      onClick={toggle}
      className="flex items-center justify-between w-full py-3 px-3 rounded-md cursor-pointer transition-colors hover:bg-[#BB5D06]"
    >
      <div className="flex items-center">
        <span className="mr-3 text-lg">{icon}</span>
        {title}
      </div>
      <span>{isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}</span>
    </button>
    {isOpen && (
      <div className="ml-6 space-y-2">
        {items.map((item) => (
          <SidebarItem key={item.href} href={item.href} icon={null} text={item.text} active={router.pathname === item.href} />
        ))}
      </div>
    )}
  </div>
);

export default Sidebar;
