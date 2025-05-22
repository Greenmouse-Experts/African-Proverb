"use client";

import React, { useState } from 'react';

const UserGrid = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Hamzat Muna', email: 'hamzat@munaapp.com', isBlocked: false },
        { id: 2, name: 'Admin Oluchi', email: 'oluchi.admin@munaapp.com', isBlocked: false },
        { id: 3, name: 'Tunde Adebayo', email: 'tunde.adebayo@munaapp.com', isBlocked: true },
        { id: 4, name: 'Chinedu Nwosu', email: 'chinedu.nwosu@munaapp.com', isBlocked: false },
        { id: 5, name: 'Zainab Bello', email: 'zainab.bello@munaapp.com', isBlocked: false },
        { id: 6, name: 'Amina Yusuf', email: 'amina.yusuf@munaapp.com', isBlocked: true },
        { id: 7, name: 'Segun Alabi', email: 'segun.alabi@munaapp.com', isBlocked: false },
        { id: 8, name: 'Adaobi Okoro', email: 'adaobi.okoro@munaapp.com', isBlocked: false },
        { id: 9, name: 'Blessing Uche', email: 'blessing.uche@munaapp.com', isBlocked: false },
        { id: 10, name: 'David Mark', email: 'david.mark@munaapp.com', isBlocked: false },
        { id: 11, name: 'Ruqayyah Musa', email: 'ruqayyah.musa@munaapp.com', isBlocked: false },
        { id: 12, name: 'Kelvin Johnson', email: 'kelvin.johnson@munaapp.com', isBlocked: true },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('All');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleCreateNewUser = () => {
        setIsCreateModalOpen(true);
    };

    const handleDeleteUser = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        setUsers(users.filter((user) => user.id !== selectedUser.id));
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
    };

    const handleBlockUser = (user) => {
        setSelectedUser(user);
        setIsBlockModalOpen(true);
    };

    const confirmBlock = () => {
        setUsers(
            users.map((user) =>
                user.id === selectedUser.id ? { ...user, isBlocked: !user.isBlocked } : user
            )
        );
        setIsBlockModalOpen(false);
        setSelectedUser(null);
    };

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setIsViewModalOpen(true);
    };

    const handleCancel = () => {
        setIsCreateModalOpen(false);
        setIsDeleteModalOpen(false);
        setIsBlockModalOpen(false);
        setIsViewModalOpen(false);
        setSelectedUser(null);
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="">
            {/* Header */}
            <div className="bg-white rounded-lg p-4 mb-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search by Name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md text-sm outline-none w-64"
                    />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md text-sm outline-none"
                    >
                        <option>All</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                </div>
                <button
                    onClick={handleCreateNewUser}
                    className="px-4 py-2 text-white bg-black rounded-md text-sm flex items-center gap-2"
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
                    Create New User
                </button>
            </div>

            {/* User Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredUsers.map((user) => (
                    <div
                        key={user.id}
                        className={`bg-white rounded-lg p-3 flex flex-col items-center ${user.isBlocked ? 'opacity-50' : ''
                            }`}
                    >
                        <div className="bg-gray-300 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="135" height="136" viewBox="0 0 135 136" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M67.3212 23.2156C59.4964 23.2142 51.808 25.265 45.0236 29.1636C38.2391 33.0621 32.5958 38.6719 28.657 45.433C24.7181 52.1941 22.6215 59.8701 22.5764 67.6948C22.5312 75.5194 24.5391 83.2191 28.3997 90.0252C31.009 86.634 34.3633 83.8883 38.2032 82.0003C42.0431 80.1124 46.2657 79.1328 50.5447 79.1373H84.0977C88.3766 79.1328 92.5992 80.1124 96.4391 82.0003C100.279 83.8883 103.633 86.634 106.243 90.0252C110.103 83.2191 112.111 75.5194 112.066 67.6948C112.021 59.8701 109.924 52.1941 105.985 45.433C102.046 38.6719 96.4032 33.0621 89.6187 29.1636C82.8343 25.265 75.146 23.2142 67.3212 23.2156ZM111.74 101.931C112.441 101.018 113.112 100.082 113.753 99.1237C119.953 89.9117 123.257 79.0568 123.243 67.9529C123.243 37.0674 98.2067 12.0312 67.3212 12.0312C36.4356 12.0312 11.3995 37.0674 11.3995 67.9529C11.3818 80.2376 15.4261 92.1834 22.9026 101.931L22.8746 102.032L24.8598 104.341C30.1046 110.473 36.6167 115.395 43.9472 118.767C51.2777 122.139 59.2522 123.882 67.3212 123.875C68.5291 123.875 69.7295 123.837 70.9225 123.763C81.013 123.126 90.7394 119.753 99.0567 114.004C103.034 111.26 106.64 108.012 109.782 104.341L111.768 102.032L111.74 101.931ZM67.3212 34.3999C62.8718 34.3999 58.6046 36.1674 55.4584 39.3136C52.3122 42.4599 50.5447 46.727 50.5447 51.1764C50.5447 55.6258 52.3122 59.893 55.4584 63.0392C58.6046 66.1854 62.8718 67.9529 67.3212 67.9529C71.7706 67.9529 76.0377 66.1854 79.1839 63.0392C82.3301 59.893 84.0977 55.6258 84.0977 51.1764C84.0977 46.727 82.3301 42.4599 79.1839 39.3136C76.0377 36.1674 71.7706 34.3999 67.3212 34.3999Z" fill="#AFB4B7" />
                            </svg>
                        </div>
                        <p className="text-sm font-medium text-gray-900 mb-1">{user.name}</p>
                        <p className="text-xs text-gray-600 mb-3">{user.email}</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleViewUser(user)}
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
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            </button>
                            <button
                                onClick={() => handleDeleteUser(user)}
                                className="text-red-500 hover:text-red-700"
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
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    <line x1="10" y1="11" x2="10" y2="17" />
                                    <line x1="14" y1="11" x2="14" y2="17" />
                                </svg>
                            </button>
                            <button
                                onClick={() => handleBlockUser(user)}
                                className="text-blue-400 hover:text-blue-600"
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
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create New User Modal */}
            {isCreateModalOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={handleCancel}
                    ></div>
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md z-50">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New User</h3>
                        <div className="mb-4">
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="userName"
                                className="w-full p-2 border border-gray-300 rounded-md text-sm outline-none"
                                placeholder="Enter user name"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="userEmail"
                                className="w-full p-2 border border-gray-300 rounded-md text-sm outline-none"
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-[#5DB6DC] text-white rounded-md hover:bg-blue-600 outline-none"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={handleCancel}
                    ></div>
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md z-50">
                        <div className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="124" height="124" viewBox="0 0 124 124" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M35.8691 34.4993L39.9291 102.739C39.9902 103.756 40.4371 104.712 41.1786 105.41C41.9201 106.109 42.9002 106.499 43.9191 106.499H80.0791C81.0979 106.499 82.0781 106.109 82.8195 105.41C83.561 104.712 84.0079 103.756 84.0691 102.739L88.1291 34.4993H94.1441L90.0591 103.094C89.9074 105.639 88.79 108.029 86.9351 109.777C85.0802 111.525 82.6278 112.499 80.0791 112.499H43.9191C41.3703 112.499 38.9179 111.525 37.063 109.777C35.2081 108.029 34.0907 105.639 33.9391 103.094L29.8541 34.4993H35.8691ZM49.4991 47.4993H55.4991L57.9991 92.4993H51.9991L49.4991 47.4993ZM68.4991 47.4993H74.4991L71.9991 92.4993H65.9991L68.4991 47.4993ZM24.2941 14.2643L103.079 28.1543C103.403 28.211 103.712 28.3311 103.99 28.5077C104.267 28.6842 104.507 28.9137 104.696 29.1831C104.884 29.4525 105.018 29.7564 105.089 30.0775C105.16 30.3986 105.167 30.7305 105.109 31.0543L104.499 34.4993L20.7891 19.7393L21.3991 16.2893C21.5149 15.6371 21.8848 15.0575 22.4276 14.6778C22.9704 14.2982 23.6417 14.1494 24.2941 14.2643ZM55.7441 8.63929L75.4441 12.1143C75.768 12.171 76.0775 12.2911 76.3549 12.4677C76.6323 12.6442 76.8722 12.8737 77.0607 13.1431C77.2493 13.4125 77.3829 13.7164 77.4538 14.0375C77.5247 14.3586 77.5316 14.6905 77.4741 15.0143L76.8641 18.4593L52.2441 14.1143L52.8541 10.6693C52.9108 10.3459 53.0308 10.0369 53.207 9.75981C53.3832 9.48277 53.6123 9.24315 53.8811 9.05465C54.1499 8.86614 54.4533 8.73243 54.7738 8.66117C55.0943 8.5899 55.4257 8.58246 55.7491 8.63929H55.7441Z" fill="#FF0000" />
                            </svg>
                        </div>

                        <h3 className="text-lg font-semibold text-center text-gray-900 mb-4">Delete User</h3>
                        <p className="text-sm text-gray-600 text-center mb-4">
                            Are you sure you want to delete {selectedUser?.name} ({selectedUser?.email})? Note this user will be deleted permanently from the system.
                        </p>
                        <div className="flex justify-center gap-2">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Block Confirmation Modal */}
            {isBlockModalOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={handleCancel}
                    ></div>
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md z-50">
                        <div className="flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="101" height="101" viewBox="0 0 101 101" fill="none">
                                <path d="M50.9186 42.306C60.1234 42.306 67.5853 34.8441 67.5853 25.6393C67.5853 16.4346 60.1234 8.97266 50.9186 8.97266C41.7139 8.97266 34.252 16.4346 34.252 25.6393C34.252 34.8441 41.7139 42.306 50.9186 42.306Z" stroke="#FF0000" stroke-width="1.5" />
                                <path d="M63.4193 56.1674C59.316 55.2509 55.1236 54.7939 50.9193 54.8049C32.5109 54.8049 17.5859 63.2007 17.5859 73.5549C17.5859 83.909 17.5859 92.3049 50.9193 92.3049C74.6151 92.3049 81.4651 88.0632 83.4484 81.8882" stroke="#FF0000" stroke-width="1.5" />
                                <path d="M87.7067 55.5184C89.2544 57.0661 90.4821 58.9034 91.3197 60.9256C92.1573 62.9477 92.5884 65.1151 92.5884 67.3038C92.5884 69.4926 92.1573 71.6599 91.3197 73.682C90.4821 75.7042 89.2544 77.5415 87.7067 79.0892C86.159 80.6369 84.3216 81.8646 82.2995 82.7022C80.2773 83.5398 78.11 83.9709 75.9213 83.9709C73.7325 83.9709 71.5652 83.5398 69.543 82.7022C67.5209 81.8646 65.6835 80.6369 64.1358 79.0892L87.7025 55.5226M64.1317 79.0892C61.006 75.9635 59.25 71.7242 59.25 67.3038C59.25 65.1151 59.6811 62.9477 60.5187 60.9256C61.3563 58.9034 62.584 57.0661 64.1317 55.5184C65.6794 53.9707 67.5167 52.743 69.5389 51.9054C71.561 51.0678 73.7283 50.6367 75.9171 50.6367C80.3375 50.6367 84.5768 52.3927 87.7025 55.5184" stroke="#FF0000" stroke-width="1.5" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-center text-gray-900 mb-4">
                            {selectedUser?.isBlock ? 'Unblock' : 'Block'} User
                        </h3>
                        <p className="text-sm text-center text-gray-600 mb-4"> 
                            Are you sure you want to {selectedUser?.isBlocked ? 'unblock' : 'block'} {selectedUser?.name} ({selectedUser?.email})?
                            Note you can unblock this user anytime.
                        </p>
                        <div className="flex justify-center gap-2">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmBlock}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 outline-none"
                            >
                                {selectedUser?.isBlocked ? 'Unblock' : 'Block'}
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* View User Modal */}
            {isViewModalOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={handleCancel}
                    ></div>
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md z-50">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Details</h3>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700">Name:</p>
                            <p className="text-sm text-gray-600">{selectedUser?.name}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700">Email:</p>
                            <p className="text-sm text-gray-600">{selectedUser?.email}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700">Status:</p>
                            <p className="text-sm text-gray-600">{selectedUser?.isBlocked ? 'Blocked' : 'Active'}</p>
                        </div>
                        <div className="flex justify-center gap-2">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 outline-none"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserGrid;