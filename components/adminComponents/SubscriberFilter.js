"use client";

import React, { useState } from 'react';
import RecentSubscribers from "./RecentSubscribers";

const SubscriberFilter = () => {
    const [filterType, setFilterType] = useState('All');
    const [language, setLanguage] = useState('By Language');
    const [searchQuery, setSearchQuery] = useState('');

    const handleFilter = () => {
        console.log('Filtering subscribers:', { filterType, language });
    };

    const handleSearch = () => {
        console.log('Searching for subscriber:', searchQuery);
    };

    return (
        <>
            <div className="">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Filter Subscribers Section */}
                    <div className="bg-white rounded-lg p-4 w-full md:w-1/2">
                        <div className="flex items-center gap-4">
                            <p className="text-sm font-medium text-gray-700 w-full">Filter Subscribers</p>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full text-sm text-gray-700 bg-white outline-none"
                            >
                                <option>All</option>
                                <option>Activated</option>
                                <option>Awaiting</option>
                                <option>Activation</option>
                                <option>Deactivated</option>
                            </select>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="p-2 border border-gray-300 w-full rounded-md text-sm text-gray-700 bg-white outline-none"
                            >
                                <option>By Language</option>
                                <option>English</option>
                                <option>Spanish</option>
                                <option>French</option>
                            </select>
                            <button
                                onClick={handleFilter}
                                className="px-4 py-2 bg-blue-400 text-sm text-white w-full rounded-md hover:bg-blue-500 outline-none"
                            >
                                Filter Subscribers
                            </button>
                        </div>
                    </div>

                    {/* Search for Subscriber Section */}
                    <div className="bg-white rounded-lg p-4 w-full md:w-1/2">
                        <div className="flex items-center gap-4">
                            <p className="text-sm font-medium text-gray-700 w-full">Search for Subscriber</p>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Subscriber"
                                className="p-2 border border-gray-300 rounded-md w-full text-sm text-gray-700 bg-white outline-none"
                            />
                            <button
                                onClick={handleSearch}
                                className="px-4 py-2 bg-blue-400 text-white w-full rounded-md hover:bg-blue-500 outline-none"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <RecentSubscribers />
        </>
    );
};

export default SubscriberFilter;