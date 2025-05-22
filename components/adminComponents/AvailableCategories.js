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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const currentDate = '22nd May, 2025';

    const handleCreateNewCategory = () => {
        setIsModalOpen(true);
    };

    const handleSaveCategory = () => {
        if (newCategoryName.trim()) {
            const newCategory = {
                id: categories.length + 1,
                name: newCategoryName,
                dateCreated: currentDate,
                lastEdited: currentDate,
            };
            setCategories([...categories, newCategory]);
            setNewCategoryName('');
            setIsModalOpen(false);
        }
    };

    const handleCancel = () => {
        setNewCategoryName('');
        setIsModalOpen(false);
    };

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const handleAction = (action, id) => {
        console.log(`${action} for category ID:`, id);
        setOpenDropdownId(null);
    };

    return (
        <div className="">
            <div className="bg-white rounded-lg p-4 mb-6 flex justify-end">
                <button onClick={handleCreateNewCategory} className="px-4 py-2 text-white bg-[#5DB6DC] rounded-md text-sm flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Create New Category
                </button>
            </div>
            {/* Modal */}
            {isModalOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={handleCancel}
                    ></div>
                    {/* Modal Content */}
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md z-50">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Category</h3>
                        <div className="mb-4">
                            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
                                Category Name
                            </label>
                            <input
                                type="text"
                                id="categoryName"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md text-sm outline-none"
                                placeholder="Enter category name"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dateEdited" className="block text-sm font-medium text-gray-700 mb-2">
                                Date Edited
                            </label>
                            <input
                                type="text"
                                id="dateEdited"
                                value={currentDate}
                                readOnly
                                className="w-full p-3 border border-gray-300 rounded-md outline-none text-sm bg-gray-100 text-gray-600 cursor-not-allowed"
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={handleCancel}
                                className="px-6 py-3 border border-gray-300 text-sm text-gray-700 rounded-md hover:bg-gray-100 outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveCategory}
                                className="px-4 py-2 bg-[#5C6BB7] text-sm text-white rounded-md cursor-pointer outline-none"
                            >
                                Create Category
                            </button>
                        </div>
                    </div>
                </>
            )}
            <div className="bg-white rounded-lg p-6 ">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Available Categories</h2>

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