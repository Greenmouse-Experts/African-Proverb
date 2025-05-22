"use client";

import React, { useState } from 'react';

const RecentSubscribers = () => {
  const [subscribers, setSubscribers] = useState([
    { id: 1, name: 'Abayomi Ireyomi', email: 'ireyomiabayomi@gmail.com', phone: '080764728736', date: '22nd January, 2025' },
    { id: 2, name: 'Abayomi Ireyomi', email: 'ireyomiabayomi@gmail.com', phone: '080764728736', date: '22nd January, 2025' },
    { id: 3, name: 'Abayomi Ireyomi', email: 'ireyomiabayomi@gmail.com', phone: '080764728736', date: '22nd January, 2025' },
    { id: 4, name: 'Abayomi Ireyomi', email: 'ireyomiabayomi@gmail.com', phone: '080764728736', date: '22nd January, 2025' },
    { id: 5, name: 'Abayomi Ireyomi', email: 'ireyomiabayomi@gmail.com', phone: '080764728736', date: '22nd January, 2025' },
    { id: 6, name: 'Abayomi Ireyomi', email: 'ireyomiabayomi@gmail.com', phone: '080764728736', date: '22nd January, 2025' },
    { id: 7, name: 'Abayomi Ireyomi', email: 'ireyomiabayomi@gmail.com', phone: '080764728736', date: '22nd January, 2025' },
    { id: 8, name: 'Abayomi Ireyomi', email: 'ireyomiabayomi@gmail.com', phone: '080764728736', date: '22nd January, 2025' },
  ]);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const handleExport = () => {
    console.log('Exporting subscribers...');
  };

  const handleFetchPrevious = () => {
    console.log('Fetching previous 10 subscribers...');
  };

  const handleFetchNext = () => {
    console.log('Fetching next 10 subscribers...');
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleAction = (action, id) => {
    console.log(`${action} for subscriber ID:`, id);
    setOpenDropdownId(null); // Close dropdown after action
  };

  return (
    <div className="">
      <div className="bg-white rounded-lg p-6 mt-6">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Subscribers</h2>
          <div className="flex gap-2">
            <select className="p-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select Format</option>
              <option>CSV</option>
              <option>PDF</option>
            </select>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-blue-400 text-sm text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
            >
              Export
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="p-4 text-sm font-medium text-gray-700">S/N</th>
                <th className="p-4 text-sm font-medium text-gray-700">Name</th>
                <th className="p-4 text-sm font-medium text-gray-700">Registered_email</th>
                <th className="p-4 text-sm font-medium text-gray-700">Phone_number</th>
                <th className="p-4 text-sm font-medium text-gray-700">Date_registered</th>
                <th className="p-4 text-sm font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4 text-sm text-gray-600">{index + 1}</td>
                  <td className="p-4 text-sm text-gray-600">{subscriber.name}</td>
                  <td className="p-4 text-sm text-gray-600">{subscriber.email}</td>
                  <td className="p-4 text-sm text-gray-600">{subscriber.phone}</td>
                  <td className="p-4 text-sm text-gray-600">{subscriber.date}</td>
                  <td className="p-4 text-sm text-gray-600 relative">
                    <button
                      onClick={() => toggleDropdown(subscriber.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                    {openDropdownId === subscriber.id && (
                      <div className="absolute right-4 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <button
                          onClick={() => handleAction('View', subscriber.id)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleAction('Edit', subscriber.id)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleAction('Delete', subscriber.id)}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-2 p-4">
          <button
            onClick={handleFetchPrevious}
            className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Fetch Previous 10
          </button>
          <button
            onClick={handleFetchNext}
            className="px-4 py-2 bg-blue-400 text-white text-sm rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Fetch Next 10
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentSubscribers;