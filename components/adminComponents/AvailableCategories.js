"use client";

import React, { useState } from 'react';

const AvailableCategories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Private Users', dateCreated: '22nd December, 2025', lastEdited: '22nd January, 2025' },
    { id: 2, name: 'Prosperity User', dateCreated: '22nd January, 2025', lastEdited: '22nd January, 2025' },
    { id: 3, name: 'Special Users', dateCreated: '22nd January, 2025', lastEdited: '22nd January, 2025' },
    { id: 4, name: 'Private Users', dateCreated: '22nd December, 2025', lastEdited: '22nd January, 2025' },
    { id: 5, name: 'Private Users', dateCreated: '22nd January, 2025', lastEdited: '22nd January, 2025' },
    { id: 6, name: 'Private Users', dateCreated: '22nd December, 2025', lastEdited: '22nd January, 2025' },
  ]);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const handleCreateNewCategory = () => {
    console.log('Creating new category...');
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleAction = (action, id) => {
    console.log(`${action} for category ID:`, id);
    setOpenDropdownId(null); // Close dropdown after action
  };

  return (
    <div className="">
      <div className="bg-white rounded-lg p-6 ">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Available Categories</h2>
          <button
            onClick={handleCreateNewCategory}
            className="px-4 py-2 text-white bg-[#5DB6DC] rounded-md text-sm flex items-center gap-2"
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
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create New Category
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="p-4 text-sm font-medium text-gray-700">Category Name</th>
                <th className="p-4 text-sm font-medium text-gray-700">Date Created</th>
                <th className="p-4 text-sm font-medium text-gray-700">Last Edited</th>
                <th className="p-4 text-sm font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4 text-sm text-gray-600">{category.name}</td>
                  <td className="p-4 text-sm text-gray-600">{category.dateCreated}</td>
                  <td className="p-4 text-sm text-gray-600">{category.lastEdited}</td>
                  <td className="p-4 text-sm text-gray-600 relative">
                    <button
                      onClick={() => toggleDropdown(category.id)}
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
                    {openDropdownId === category.id && (
                      <div className="absolute right-4 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <button
                          onClick={() => handleAction('View', category.id)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleAction('Edit', category.id)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleAction('Delete', category.id)}
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
      </div>
    </div>
  );
};

export default AvailableCategories;