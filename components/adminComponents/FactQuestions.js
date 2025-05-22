"use client";

import React, { useState } from 'react';

const FactQuestions = () => {
    const [questions, setQuestions] = useState([
        { id: 1, name: 'Hamzat Muna', question: 'What is the capital of France?', category: 'Geography', language: 'English', dateAdded: '22nd May, 2025' },
        { id: 2, name: 'Zainab Bello', question: 'Who invented the telephone?', category: 'History', language: 'English', dateAdded: '22nd May, 2025' },
        { id: 3, name: 'Amina Yusuf', question: 'What is 2 + 2?', category: 'Math', language: 'Spanish', dateAdded: '22nd May, 2025' },
        { id: 4, name: 'Chinedu Nwosu', question: 'What is the tallest mountain in the world?', category: 'Geography', language: 'French', dateAdded: '22nd May, 2025' },
        { id: 5, name: 'Kelvin Johnson', question: 'Who wrote Hamlet?', category: 'Literature', language: 'English', dateAdded: '22nd May, 2025' },
        { id: 6, name: 'Blessing Uche', question: 'What is the speed of light in vacuum?', category: 'Science', language: 'English', dateAdded: '22nd May, 2025' },
        { id: 7, name: 'David Mark', question: 'What is the boiling point of water?', category: 'Science', language: 'German', dateAdded: '22nd May, 2025' },
        { id: 8, name: 'Segun Alabi', question: 'Who painted the Mona Lisa?', category: 'Art', language: 'Italian', dateAdded: '22nd May, 2025' },
        { id: 9, name: 'Adaobi Okoro', question: 'What is the currency of Japan?', category: 'Economics', language: 'Japanese', dateAdded: '22nd May, 2025' },
        { id: 10, name: 'Ruqayyah Musa', question: 'What is the Pythagorean theorem?', category: 'Math', language: 'English', dateAdded: '22nd May, 2025' },
        { id: 11, name: 'Tunde Adebayo', question: 'When did World War II end?', category: 'History', language: 'English', dateAdded: '22nd May, 2025' },
        { id: 12, name: 'Oluchi Daniels', question: 'What is photosynthesis?', category: 'Biology', language: 'English', dateAdded: '22nd May, 2025' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterGeneral, setFilterGeneral] = useState('GENERAL');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterLanguage, setFilterLanguage] = useState('');
    const [openDropdownId, setOpenDropdownId] = useState(null);

    const filteredQuestions = questions.filter((question) => {
        const matchesSearch = question.question.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGeneral = filterGeneral === 'GENERAL' || question.category === filterGeneral;
        const matchesCategory = !filterCategory || question.category === filterCategory;
        const matchesLanguage = !filterLanguage || question.language === filterLanguage;
        return matchesSearch && matchesGeneral && matchesCategory && matchesLanguage;
    });

    const handleFilter = () => {
        // Filtering is already applied dynamically, but this can trigger additional logic (e.g., API calls) if needed
        console.log('Filter applied:', { filterGeneral, filterCategory, filterLanguage });
    };

    const handleSearch = () => {
        // Search is already applied dynamically, but this can trigger additional logic if needed
        console.log('Search for:', searchQuery);
    };

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const handleAction = (action, id) => {
        console.log(`${action} for question ID:`, id);
        setOpenDropdownId(null);
    };

    return (
        <div className="p-6 bg-white rounded-lg">
            {/* Filter Section */}
            <div className="bg-white rounded-lg mb-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div>
                        <label className="block text-lg font-medium text-black mb-5">Filter Question</label>
                        <div className="flex gap-2">
                            <select
                                value={filterGeneral}
                                onChange={(e) => setFilterGeneral(e.target.value)}
                                className="p-3 px-6 border border-gray-300 rounded-md text-sm outline-none"
                            >
                                <option>GENERAL</option>
                                <option>Geography</option>
                                <option>History</option>
                                <option>Math</option>
                                <option>Literature</option>
                                <option>Science</option>
                            </select>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="p-3 px-6 border border-gray-300 rounded-md text-sm outline-none"
                            >
                                <option value="">By Category</option>
                                <option>Geography</option>
                                <option>History</option>
                                <option>Math</option>
                                <option>Literature</option>
                                <option>Science</option>
                            </select>
                            <select
                                value={filterLanguage}
                                onChange={(e) => setFilterLanguage(e.target.value)}
                                className="p-3 px-6 border border-gray-300 rounded-md text-sm outline-none"
                            >
                                <option value="">By Language</option>
                                <option>English</option>
                                <option>Spanish</option>
                                <option>French</option>
                            </select>
                            <button
                                onClick={handleFilter}
                                className="px-8 py-2 bg-blue-300 text-white rounded-md text-sm hover:bg-blue-400 outline-none"
                            >
                                Filter Questions
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Search Question</label>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-3 px-6 border border-gray-300 rounded-md text-sm outline-none"
                        placeholder="Search"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-6 py-3 bg-blue-300 text-white rounded-md text-sm hover:bg-blue-400 outline-none"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-200">
                                <th className="p-4 text-sm font-medium text-gray-700">Name</th>
                                <th className="p-4 text-sm font-medium text-gray-700">Question</th>
                                <th className="p-4 text-sm font-medium text-gray-700">Category</th>
                                <th className="p-4 text-sm font-medium text-gray-700">Language</th>
                                <th className="p-4 text-sm font-medium text-gray-700">Date Added</th>
                                <th className="p-4 text-sm font-medium text-gray-700">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredQuestions.map((question) => (
                                <tr key={question.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="p-4 text-sm text-gray-600">{question.name}</td>
                                    <td className="p-4 text-sm text-gray-600">{question.question}</td>
                                    <td className="p-4 text-sm text-gray-600">{question.category}</td>
                                    <td className="p-4 text-sm text-gray-600">{question.language}</td>
                                    <td className="p-4 text-sm text-gray-600">{question.dateAdded}</td>
                                    <td className="p-4 text-sm text-gray-600 relative">
                                        <button
                                            onClick={() => toggleDropdown(question.id)}
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
                                        {openDropdownId === question.id && (
                                            <div className="absolute right-4 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                                <button
                                                    onClick={() => handleAction('View', question.id)}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => handleAction('Edit', question.id)}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleAction('Delete', question.id)}
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

export default FactQuestions;