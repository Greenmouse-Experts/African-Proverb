"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  MdDashboard,
  MdOutlineSettings,
  MdOutlineAnalytics,
  MdOutlineNotifications,
  MdOutlineSubscriptions,
  MdFlag,
  MdLanguage,
  MdQuestionAnswer,
  MdCategory,
  MdPeopleAlt,
  MdQuiz,
} from 'react-icons/md';
import { HiOutlineUsers } from 'react-icons/hi';
import { FaSignOutAlt, FaUserCircle, FaBoxes } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { GiTribalMask } from 'react-icons/gi';
import { RiCustomerService2Line } from 'react-icons/ri';
import { BsFillQuestionSquareFill } from 'react-icons/bs';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);

  // Toggle body scroll lock when sidebar is open/closed
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    // Cleanup on unmount
    return () => document.body.classList.remove('sidebar-open');
  }, [isOpen]);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const isActive = (path) => {
    if (path === '/admin') {
      return pathname === path;
    }
    return path !== '#' && pathname.startsWith(path);
  };

  return (
    <div className="relative z-50">
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 max-h-screen w-[80vw] h-full sm:w-64 md:w-72 bg-[#374151] text-white flex flex-col p-4 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 max-w-[100vw]`} // max-h-screen, w-[80vw], max-w-[100vw] to prevent overflow
      >
        {/* Profile Section */}
        <div className="flex flex-col items-center py-4 border-b border-gray-600">
          <div className="bg-gray-200 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-gray-500 text-3xl sm:text-4xl">
            <FaUserCircle />
          </div>
          <div className="flex gap-4 mt-4 text-lg sm:text-xl">
            <MdOutlineSettings />
            <FaSignOutAlt />
          </div>
        </div>

        {/* Menu */}
        <nav className="mt-6 flex-1 overflow-y-auto scrollbar-hide"> {/* scrollbar-hide for clean scrolling */}
          <SidebarItem href="/admin" text="Dashboard" icon={<MdDashboard />} isActive={isActive} />
          <SidebarItem href="/admin/proverbs" text="Proverbs" icon={<MdQuiz />} isActive={isActive} />
          <SidebarItem href="/admin/affiliated-language" text="AffiliatedLanguage" icon={<MdLanguage />} isActive={isActive} />
          <SidebarItem href="/admin/fact-questions" text="Fact Questions" icon={<MdQuestionAnswer />} isActive={isActive} />
          <SidebarItem href="/admin/flags" text="Flags" icon={<MdFlag />} isActive={isActive} />
          <SidebarItem href="/admin/ethnic-symbols" text="Ethnic Symbols" icon={<GiTribalMask />} isActive={isActive} />
          <SidebarItem href="/admin/faqs" text="Faqs" icon={<BsFillQuestionSquareFill />} isActive={isActive} />
          <SidebarItem href="/admin/packages" text="Packages" icon={<FaBoxes />} isActive={isActive} />

          <DropdownItem
            title="User Management"
            icon={<HiOutlineUsers />}
            isOpen={openDropdown === 'userManagement'} // Simplified to rely on state only
            toggle={() => toggleDropdown('userManagement')}
            items={[
              { href: '/admin/create-categories', text: 'Create Categories', icon: <MdCategory /> },
              { href: '/admin/create-user', text: 'Users', icon: <MdPeopleAlt /> },
            ]}
            isActive={isActive}
          />

          <SidebarItem href="/admin/push-notifications" text="Push Notifications" icon={<MdOutlineNotifications />} isActive={isActive} />
          <SidebarItem href="/admin/user-notifications" text="User Notifications" icon={<MdOutlineNotifications />} isActive={isActive} />
          <SidebarItem href="/admin/subscriber" text="Subscriptions" icon={<MdOutlineSubscriptions />} isActive={isActive} />

          <DropdownItem
            title="Report"
            icon={<MdOutlineAnalytics />}
            isOpen={openDropdown === 'report'} // Simplified to rely on state only
            toggle={() => toggleDropdown('report')}
            items={[{ href: '/admin/metrics', text: 'Engagement Metrics', icon: <RiCustomerService2Line /> }]}
            isActive={isActive}
          />

          <SidebarItem href="/admin/question-mapping" text="Question Mapping" icon={<MdQuiz />} isActive={isActive} />
        </nav>
      </div>

      {/* Overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden z-40"
          onClick={toggleSidebar}
          onTouchStart={(e) => e.stopPropagation()} // Prevent touch events from bubbling to sidebar
        ></div>
      )}
    </div>
  );
};

const SidebarItem = ({ href, text, icon, isActive }) => {
  const active = isActive(href);
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-3 rounded-md transition-colors w-full truncate touch-manipulation ${
        active ? 'bg-black' : 'hover:bg-black'
      }`} // touch-manipulation for better touch response
    >
      {icon && <span className="mr-3 text-base sm:text-lg">{icon}</span>}
      <span className="truncate">{text}</span>
    </Link>
  );
};

const DropdownItem = ({ title, icon, isOpen, toggle, items, isActive }) => {
  return (
    <div className="space-y-1">
      <button
        onClick={toggle}
        onTouchStart={toggle} // Added for mobile touch support
        className={`flex items-center justify-between w-full px-3 py-3 rounded-md transition-colors truncate touch-manipulation pointer-events-auto ${
          isOpen ? 'bg-black' : 'hover:bg-black'
        }`} // touch-manipulation and pointer-events-auto for reliable taps
      >
        <div className="flex items-center truncate">
          <span className="mr-3 text-base sm:text-lg">{icon}</span>
          <span className="truncate">{title}</span>
        </div>
        <span>{isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}</span>
      </button>
      {isOpen && (
        <div className="ml-4 sm:ml-6 space-y-1">
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              text={item.text}
              icon={item.icon}
              isActive={isActive}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;