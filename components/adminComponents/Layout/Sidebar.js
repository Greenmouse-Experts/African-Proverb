"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
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
  MdOutlineLocalOffer,
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

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // Improved isActive function to handle exact and nested routes
  const isActive = (path) => {
    if (path === '/admin') {
      return pathname === path; // Exact match for dashboard
    }
    return path !== '#' && pathname.startsWith(path);
  };

  return (
    <div className="relative z-50">
      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 h-screen w-72 bg-[#374151] text-white flex flex-col p-4 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Profile Section */}
        <div className="flex flex-col items-center py-4 border-b border-gray-600">
          <div className="bg-gray-200 rounded-full w-20 h-20 flex items-center justify-center text-gray-500 text-4xl">
            <FaUserCircle />
          </div>
          <div className="flex gap-4 mt-4 text-xl">
            <MdOutlineSettings />
            <FaSignOutAlt />
          </div>
        </div>

        {/* Menu */}
        <nav className="mt-6 flex-1 overflow-y-auto space-y-2 text-sm">
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
            isOpen={openDropdown === 'userManagement' || isActive('/admin/create-categories') || isActive('/admin/users')}
            toggle={() => toggleDropdown('userManagement')}
            items={[
              {
                href: '/admin/create-categories',
                text: 'Create Categories',
                icon: <MdCategory />,
              },
              { href: '/admin/users', text: 'Users', icon: <MdPeopleAlt /> },
            ]}
            isActive={isActive}
            pathname={pathname}
          />

          <SidebarItem href="/admin/push-notifications" text="Push Notifications" icon={<MdOutlineNotifications />} isActive={isActive} />
          <SidebarItem href="/admin/user-notifications" text="User Notifications" icon={<MdOutlineNotifications />} isActive={isActive} />
          <SidebarItem href="/admin/subscriber" text="Subscriptions" icon={<MdOutlineSubscriptions />} isActive={isActive} />

          <DropdownItem
            title="Report"
            icon={<MdOutlineAnalytics />}
            isOpen={openDropdown === 'report' || isActive('/admin/metrics')}
            toggle={() => toggleDropdown('report')}
            items={[
              {
                href: '/admin/metrics',
                text: 'Engagement Metrics',
                icon: <RiCustomerService2Line />,
              },
            ]}
            isActive={isActive}
            pathname={pathname}
          />

          <SidebarItem href="/admin/question-mapping" text="Question Mapping" icon={<MdQuiz />} isActive={isActive} />
        </nav>
      </div>

      {/* Overlay on mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 md:hidden z-40" onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

const SidebarItem = ({ href, text, icon, isActive }) => {
  const active = isActive(href);
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-3 rounded-md transition-colors ${
        active ? 'bg-black' : 'hover:bg-black'
      }`}
    >
      {icon && <span className="mr-3 text-lg">{icon}</span>}
      {text}
    </Link>
  );
};

const DropdownItem = ({ title, icon, isOpen, toggle, items, isActive, pathname }) => {
  // Check if any child item is active
  const isAnyChildActive = items.some((item) => isActive(item.href));

  // Set isOpen to true if a child is active, otherwise use the controlled state
  const shouldBeOpen = isAnyChildActive || isOpen;

  return (
    <div className="space-y-1">
      <button
        onClick={toggle}
        className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors ${
          isAnyChildActive ? 'bg-black' : 'hover:bg-black'
        }`}
      >
        <div className="flex items-center">
          <span className="mr-3 text-lg">{icon}</span>
          {title}
        </div>
        <span>{shouldBeOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}</span>
      </button>
      {shouldBeOpen && (
        <div className="ml-6 space-y-1">
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