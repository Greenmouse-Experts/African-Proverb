import React, { useState } from 'react';

function Notification() {
    const [activeTab, setActiveTab] = useState('all');

    const notifications = [
        {
            id: 1,
            message: 'A new organisation just signed up for quiz [African Proverb/ORG/746533290] has been approved',
            time: '2 weeks ago',
            logo: '/images/logo.png', // Replace with the actual logo path
        },
        {
            id: 2,
            message: 'A new organisation just signed up for quiz [African Proverb/ORG/746533290] has been approved',
            time: '2 weeks ago',
            logo: '/images/logo.png', // Replace with the actual logo path
        },
        {
            id: 3,
            message: 'A new organisation just signed up for quiz [African Proverb/ORG/746533290] has been approved',
            time: '2 weeks ago',
            logo: '/images/logo.png', // Replace with the actual logo path
        },
    ];

    return (
        <div className="">
            <h1 className="text-2xl font-bold text-[#BB5D06]">Notification</h1>
            <p className="text-sm text-gray-500">🏠 / Dashboard / Notification</p>

            <div className="mt-6 bg-white shadow rounded-lg p-4">
                <div className="flex space-x-4 border-b pb-2">
                    <button
                        className={`px-4 py-2 rounded ${activeTab === 'all' ? 'bg-[#BB5D06] text-white' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('all')}
                    >
                        All Notification
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${activeTab === 'unread' ? 'bg-[#BB5D06] text-white' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('unread')}
                    >
                        Unread
                    </button>
                </div>

                <div className="space-y-4 mt-4">
                    {notifications.map((notification) => (
                        <div key={notification.id} className="flex items-center space-x-4 bg-[#FCF8F3] p-4 rounded-md border">
                            <img src={notification.logo} alt="Logo" className="w-12 h-12" />

                            <div className="flex-1">
                                <p className="text-sm font-bold text-[#BB5D06]">AFRICAN PROVERBS</p>
                                <p className="text-sm text-gray-700">{notification.message}</p>
                                <p className="text-xs text-gray-500">{notification.time}</p>
                            </div>

                            <button className="text-[#BB5D06] font-bold text-sm underline">✓ Marked as Read</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Notification;
