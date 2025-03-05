import React from 'react';

function SidebarItem({ icon, label }) {
  return (
    <div className="flex items-center space-x-6 text-black text-base font-normal cursor-pointer hover:bg-gray-100 px-6 py-5">
      {icon}
      <span>{label}</span>
    </div>
  );
}

export default SidebarItem;
