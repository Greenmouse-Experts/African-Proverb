"use client";

import React, { useState } from 'react';

const FactQuestions = () => {
    const [questions, setQuestions] = useState([
        {
            id: 1,
            name: 'Erica Ramirez',
            question: 'Improve quality citizen people measure finish yeah?',
            category: 'Science',
            language: 'Spanish',
            dateAdded: '22nd May, 2025',
            status: 'ACTIVE',
            engagementLevel: 'All',
            subscriptionType: 'Premium',
            selectedUsers: 'Engaged'
        },
        {
            id: 2,
            name: 'Kyle Nash',
            question: 'Weight operation stay understand indeed eight car same?',
            category: 'Literature',
            language: 'English',
            dateAdded: '22nd May, 2025',
            status: 'ACTIVE',
            engagementLevel: 'All',
            subscriptionType: 'Premium',
            selectedUsers: 'All'
        },
        {
            id: 3,
            name: 'Anita Smith',
            question: 'Civil difference direction increase?',
            category: 'Science',
            language: 'French',
            dateAdded: '22nd May, 2025',
            status: 'ACTIVE',
            engagementLevel: 'High',
            subscriptionType: 'Premium',
            selectedUsers: 'New Users'
        },
        {
            id: 4,
            name: 'Frank White',
            question: 'Project performance business become?',
            category: 'Literature',
            language: 'Spanish',
            dateAdded: '22nd May, 2025',
            status: 'INACTIVE',
            engagementLevel: 'Low',
            subscriptionType: 'Free',
            selectedUsers: 'Inactive'
        },
        {
            id: 5,
            name: 'Jennifer Beck',
            question: 'Hard your return project easy?',
            category: 'Geography',
            language: 'French',
            dateAdded: '22nd May, 2025',
            status: 'INACTIVE',
            engagementLevel: 'Low',
            subscriptionType: 'Pro',
            selectedUsers: 'Inactive'
        },
        {
            id: 6,
            name: 'Samantha Brown',
            question: 'Ground notice paper meet?',
            category: 'History',
            language: 'English',
            dateAdded: '22nd May, 2025',
            status: 'INACTIVE',
            engagementLevel: 'Medium',
            subscriptionType: 'Free',
            selectedUsers: 'Engaged'
        },
        {
            id: 7,
            name: 'Angela Jackson',
            question: 'Authority free PM woman?',
            category: 'Geography',
            language: 'English',
            dateAdded: '22nd May, 2025',
            status: 'INACTIVE',
            engagementLevel: 'High',
            subscriptionType: 'Free',
            selectedUsers: 'Inactive'
        },
        {
            id: 8,
            name: 'Aaron Hardy',
            question: 'Answer just heavy then?',
            category: 'History',
            language: 'French',
            dateAdded: '22nd May, 2025',
            status: 'ACTIVE',
            engagementLevel: 'Low',
            subscriptionType: 'Premium',
            selectedUsers: 'All'
        },
        {
            id: 9,
            name: 'Matthew Cohen',
            question: 'Movement image town network section create?',
            category: 'Science',
            language: 'French',
            dateAdded: '22nd May, 2025',
            status: 'ACTIVE',
            engagementLevel: 'All',
            subscriptionType: 'Free',
            selectedUsers: 'Inactive'
        },
        {
            id: 10,
            name: 'Kimberly Smith',
            question: 'Last order significant face mind friend?',
            category: 'Science',
            language: 'French',
            dateAdded: '22nd May, 2025',
            status: 'ACTIVE',
            engagementLevel: 'Low',
            subscriptionType: 'Premium',
            selectedUsers: 'Inactive'
        },
        {
            id: 11,
            name: 'Billy James',
            question: 'Small economic minute write?',
            category: 'Math',
            language: 'Spanish',
            dateAdded: '22nd May, 2025',
            status: 'INACTIVE',
            engagementLevel: 'Low',
            subscriptionType: 'All',
            selectedUsers: 'Engaged'
        },
        {
            id: 12,
            name: 'David Choi',
            question: 'Conference economy free camera available?',
            category: 'Literature',
            language: 'English',
            dateAdded: '22nd May, 2025',
            status: 'ACTIVE',
            engagementLevel: 'Low',
            subscriptionType: 'All',
            selectedUsers: 'Free Users'
        }
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterGeneral, setFilterGeneral] = useState('GENERAL');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterLanguage, setFilterLanguage] = useState('');
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const itemsPerPage = 10;

    const filteredQuestions = questions.filter((question) => {
        const matchesSearch = question.question.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGeneral = filterGeneral === 'GENERAL' || question.category === filterGeneral;
        const matchesCategory = !filterCategory || question.category === filterCategory;
        const matchesLanguage = !filterLanguage || question.language === filterLanguage;
        return matchesSearch && matchesGeneral && matchesCategory && matchesLanguage;
    });

    const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
    const paginatedQuestions = filteredQuestions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleFilter = () => {
        console.log('Filter applied:', { filterGeneral, filterCategory, filterLanguage });
    };

    const handleSearch = () => {
        console.log('Search for:', searchQuery);
    };

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const handleAction = (action, id) => {
        const question = questions.find((q) => q.id === id);
        if (action === 'View') {
            setSelectedQuestion(question);
            setIsViewModalOpen(true);
        } else if (action === 'Edit') {
            setSelectedQuestion({ ...question });
            setIsEditing(true);
            setIsViewModalOpen(true);
        } else if (action === 'Delete') {
            setSelectedQuestion(question);
            setIsDeleteModalOpen(true);
        }
        setOpenDropdownId(null);
    };

    const handleShare = () => {
        const shareUrl = window.location.href;
        const shareText = 'Check out these fact questions! ' + shareUrl;

        if (navigator.share) {
            navigator.share({
                title: 'Fact Questions',
                text: shareText,
                url: shareUrl,
            }).catch((error) => console.log('Error sharing:', error));
        } else {
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
            const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
            const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=Fact Questions&summary=${encodeURIComponent(shareText)}`;
            console.log('Share manually:', { twitterUrl, facebookUrl, linkedinUrl });
            alert(`Share via:\nTwitter: ${twitterUrl}\nFacebook: ${facebookUrl}\nLinkedIn: ${linkedinUrl}`);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleSave = () => {
        setQuestions(questions.map((q) => (q.id === selectedQuestion.id ? selectedQuestion : q)));
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedQuestion((prev) => ({ ...prev, [name]: value }));
    };

    const confirmDelete = () => {
        setQuestions(questions.filter((q) => q.id !== selectedQuestion.id));
        setIsDeleteModalOpen(false);
        setSelectedQuestion(null);
    };

    const handleCancel = () => {
        setIsViewModalOpen(false);
        setIsDeleteModalOpen(false);
        setIsEditing(false);
        setSelectedQuestion(null);
    };
    return (
        <>
            <div className="p-4 sm:p-6 bg-white rounded-lg mb-6">
                {/* Filter Section */}
                <div className="bg-white rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div className="flex flex-col w-full">
                        <label className="block text-base sm:text-lg font-medium text-black mb-2">Filter Question</label>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <select
                                value={filterGeneral}
                                onChange={(e) => setFilterGeneral(e.target.value)}
                                className="p-2 sm:p-3 px-4 border border-gray-300 rounded-md text-sm outline-none w-full"
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
                                className="p-2 sm:p-3 px-4 border border-gray-300 rounded-md text-sm outline-none w-full"
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
                                className="p-2 sm:p-3 px-4 border border-gray-300 rounded-md text-sm outline-none w-full"
                            >
                                <option value="">By Language</option>
                                <option>English</option>
                                <option>Spanish</option>
                                <option>French</option>
                            </select>
                            <button
                                onClick={handleFilter}
                                className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-300 text-white rounded-md text-sm hover:bg-blue-400 outline-none  sm:w-auto"
                            >
                                Filter Questions
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="block text-base sm:text-lg font-medium text-black mb-2">Search Question</label>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="p-2 sm:p-3 px-4 border border-gray-300 rounded-md text-sm outline-none w-full"
                                placeholder="Search"
                            />
                            <button
                                onClick={handleSearch}
                                className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-300 text-white rounded-md text-sm hover:bg-blue-400 outline-none w-full sm:w-auto"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 sm:p-6 bg-white rounded-lg">
                {/* Table */}
                <div className="bg-white rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left hidden sm:table">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-200">
                                    <th className="p-4 sm:p-6 text-sm font-medium text-gray-700">
                                        <input type="checkbox" className="mr-4" />
                                        Question
                                    </th>
                                    <th className="p-4 sm:p-6 text-sm font-medium text-gray-700">Question Type</th>
                                    <th className="p-4 sm:p-6 text-sm font-medium text-gray-700">Current Status</th>
                                    <th className="p-4 sm:p-6 text-sm font-medium text-gray-700">Created At</th>
                                    <th className="p-4 sm:p-6 text-sm font-medium text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedQuestions.map((question) => (
                                    <tr key={question.id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-4 sm:p-6 text-sm text-gray-600">
                                            <input type="checkbox" className="mr-4" />
                                            {question.question}
                                        </td>
                                        <td className="p-4 sm:p-6 text-sm text-gray-600">{question.category}</td>
                                        <td className="p-4 sm:p-6 text-sm text-gray-600">
                                            <button className="px-2 py-1 bg-blue-200 text-white rounded text-xs">ACTIVE</button>
                                        </td>
                                        <td className="p-4 sm:p-6 text-sm text-gray-600">{question.dateAdded}</td>
                                        <td className="p-4 sm:p-6 text-sm text-gray-600 relative">
                                            <button
                                                onClick={() => toggleDropdown(question.id)}
                                                className="text-[#5DB6DC] hover:text-blue-700"
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
                        {/* Mobile Card Layout */}
                        <div className="sm:hidden space-y-4">
                            {paginatedQuestions.map((question) => (
                                <div key={question.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <input type="checkbox" className="mr-2" />
                                            <p className="text-sm text-gray-600 font-medium">{question.question}</p>
                                        </div>
                                        <button
                                            onClick={() => toggleDropdown(question.id)}
                                            className="text-[#5DB6DC] hover:text-blue-700"
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
                                    </div>
                                    {openDropdownId === question.id && (
                                        <div className="mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg">
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
                                    <p className="text-sm text-gray-600 mt-2"><strong>Type:</strong> {question.category}</p>
                                    <p className="text-sm text-gray-600"><strong>Status:</strong> <button className="px-2 py-1 bg-blue-200 text-white rounded text-xs">ACTIVE</button></p>
                                    <p className="text-sm text-gray-600"><strong>Created At:</strong> {question.dateAdded}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Share and Pagination */}
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-center bg-gray-200 p-4 rounded-lg gap-4">
                    <button
                        onClick={handleShare}
                        className="px-4 py-2 bg-blue-700 text-white rounded-md text-sm flex items-center hover:bg-blue-800 outline-none w-full sm:w-auto"
                    >
                        Share
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
                            className="ml-2"
                        >
                            <polyline points="18 15 12 21 6 15"></polyline>
                            <polyline points="6 9 12 3 18 9"></polyline>
                        </svg>
                    </button>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <button
                            onClick={handlePreviousPage}
                            className="px-4 py-2 bg-blue-300 text-white rounded-md text-sm hover:bg-blue-400 outline-none disabled:opacity-50 w-full sm:w-auto"
                            disabled={currentPage === 1}
                        >
                            Fetch previous 10
                        </button>
                        <button
                            onClick={handleNextPage}
                            className="px-4 py-2 bg-blue-300 text-white rounded-md text-sm hover:bg-blue-400 outline-none disabled:opacity-50 w-full sm:w-auto"
                            disabled={currentPage === totalPages}
                        >
                            Fetch Next 10
                        </button>
                    </div>
                </div>

                {/* View/Edit Modal */}
                {isViewModalOpen && selectedQuestion && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-[90vw] sm:max-w-xl relative overflow-y-auto max-h-[90vh]">
                            <button
                                onClick={() => {
                                    setIsViewModalOpen(false);
                                    setIsEditing(false);
                                    setSelectedQuestion(null);
                                }}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
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
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 mt-8 gap-4">
                                <div className="flex flex-col sm:flex-row items-center gap-2">
                                    <span className="text-sm text-gray-600">Created At: <strong>Thu Jan 04 2025</strong></span>
                                    <button className="px-4 sm:px-6 py-2 bg-blue-200 text-white rounded text-xs">{selectedQuestion.status}</button>
                                </div>
                                <div>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-4 sm:px-6 py-2 bg-[#BB5D06] text-white rounded-md text-sm hover:bg-orange-600 w-full sm:w-auto"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">Question: <strong>{selectedQuestion.question}</strong></p>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Language preference</label>
                                    <select
                                        name="language"
                                        value={selectedQuestion.language}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="mt-1 p-3 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option>Select Language</option>
                                        <option>English</option>
                                        <option>Spanish</option>
                                        <option>French</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Engagement level</label>
                                    <input
                                        type="text"
                                        name="engagementLevel"
                                        value={selectedQuestion.engagementLevel}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="mt-1 p-3 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subscription type</label>
                                    <input
                                        type="text"
                                        name="subscriptionType"
                                        value={selectedQuestion.subscriptionType}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="mt-1 p-3 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Users</label>
                                    <input
                                        type="text"
                                        name="selectedUsers"
                                        value={selectedQuestion.selectedUsers}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="mt-1 p-3 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            {isEditing && (
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                                    >
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {isDeleteModalOpen && selectedQuestion && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-[90vw] sm:max-w-md relative">
                            <button
                                onClick={handleCancel}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
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
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Delete Question</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Are you sure you want to delete the question "{selectedQuestion.question}"? This action cannot be undone.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-end gap-2">
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-auto"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>

    );
};
export default FactQuestions;