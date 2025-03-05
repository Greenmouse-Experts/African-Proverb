import React from 'react';

function SidebarItem({ icon, label }) {
  return (
    <div className="flex items-center space-x-3 text-black text-sm font-medium cursor-pointer hover:bg-gray-100 px-6 py-3 rounded-lg">
      {icon}
      <span>{label}</span>
    </div>
  );
}

export default SidebarItem;
