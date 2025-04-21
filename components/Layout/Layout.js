import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
function Layout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-[#FCF8F3] overflow-y-auto">
        {/* Header */}
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

        {/* Page Content */}
        <main className="p-6 flex-grow">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
