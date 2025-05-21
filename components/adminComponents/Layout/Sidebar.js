'use client';

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

  const isActive = (path) => pathname.startsWith(path);


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
          <SidebarItem href="/admin" text="Dashboard" icon={<MdDashboard />} active={isActive('/admin')} />
          <SidebarItem href="/proverbs" text="Proverbs" icon={<MdQuiz />} active={isActive('/proverbs')} />
          <SidebarItem href="/affiliated-language" text="AffiliatedLanguage" icon={<MdLanguage />} active={isActive('/affiliated-language')} />
          <SidebarItem href="/fact-questions" text="Fact Questions" icon={<MdQuestionAnswer />} active={isActive('/fact-questions')} />
          <SidebarItem href="/flags" text="Flags" icon={<MdFlag />} active={isActive('/flags')} />
          <SidebarItem href="/ethnic-symbols" text="Ethnic Symbols" icon={<GiTribalMask />} active={isActive('/ethnic-symbols')} />
          <SidebarItem href="/faqs" text="Faqs" icon={<BsFillQuestionSquareFill />} active={isActive('/faqs')} />
          <SidebarItem href="/packages" text="Packages" icon={<FaBoxes />} active={isActive('/packages')} />

          <DropdownItem
            title="User Management"
            icon={<HiOutlineUsers />}
            isOpen={openDropdown === 'userManagement'}
            toggle={() => toggleDropdown('userManagement')}
            items={[
              {
                href: '/user-management/create-categories',
                text: 'Create Categories',
                icon: <MdCategory />,
              },
              { href: '/user-management/users', text: 'Users', icon: <MdPeopleAlt /> },
            ]}
            activePath={pathname}
          />

          <SidebarItem href="/push-notifications" text="Push Notifications" icon={<MdOutlineNotifications />} active={isActive('/push-notifications')} />
          <SidebarItem href="/user-notifications" text="User Notifications" icon={<MdOutlineNotifications />} active={isActive('/user-notifications')} />
          <SidebarItem href="/subscriptions" text="Subscriptions" icon={<MdOutlineSubscriptions />} active={isActive('/subscriptions')} />

          <DropdownItem
            title="Report"
            icon={<MdOutlineAnalytics />}
            isOpen={openDropdown === 'report'}
            toggle={() => toggleDropdown('report')}
            items={[
              {
                href: '/admin/metrics',
                text: 'Engagement Metrics',
                icon: <RiCustomerService2Line />,
              },
            ]}
            activePath={pathname}
          />

          <SidebarItem href="/question-mapping" text="Question Mapping" icon={<MdQuiz />} active={isActive('/question-mapping')} />
        </nav>
      </div>

      {/* Overlay on mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 md:hidden z-40" onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

const SidebarItem = ({ href, text, icon, active }) => (
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

const DropdownItem = ({ title, icon, isOpen, toggle, items, activePath }) => {
  const isAnyChildActive = items.some((item) => activePath === item.href);

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
        <span>{isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}</span>
      </button>
      {isOpen && (
        <div className="ml-6 space-y-1">
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              text={item.text}
              icon={item.icon}
              active={activePath === item.href}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
