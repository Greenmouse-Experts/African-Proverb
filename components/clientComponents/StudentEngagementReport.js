"use client";

import React, { useState } from 'react';

const StudentEngagement = () => {
    const [engagementFilter, setEngagementFilter] = useState('This Week');
    const [subscriptionFilter, setSubscriptionFilter] = useState('This Week');

    return (
        <div className="space-y-6">
            {/* Student Engagement Report */}
            <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Student Engagement Report</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Total Logins Card */}
                    <div className="bg-white rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 55 56" fill="none">
                                    <rect x="0.730469" y="0.667969" width="54.2483" height="54.8609" rx="12.123" fill="#FFCF76" fill-opacity="0.42" />
                                    <path d="M24.5 17.7383C24.2099 17.7383 23.9317 17.8535 23.7266 18.0586C23.5215 18.2638 23.4062 18.542 23.4062 18.832C23.4062 19.1221 23.5215 19.4003 23.7266 19.6054C23.9317 19.8105 24.2099 19.9258 24.5 19.9258C25.8885 19.9258 27.2633 20.1993 28.5461 20.7306C29.8288 21.2619 30.9944 22.0407 31.9762 23.0225C32.958 24.0043 33.7368 25.1699 34.2681 26.4526C34.7994 27.7354 35.0729 29.1102 35.0729 30.4987C35.0729 31.8872 34.7994 33.262 34.2681 34.5448C33.7368 35.8275 32.958 36.9931 31.9762 37.9749C30.9944 38.9567 29.8288 39.7355 28.5461 40.2668C27.2633 40.7981 25.8885 41.0716 24.5 41.0716C24.2099 41.0716 23.9317 41.1868 23.7266 41.392C23.5215 41.5971 23.4062 41.8753 23.4062 42.1654C23.4062 42.4554 23.5215 42.7336 23.7266 42.9388C23.9317 43.1439 24.2099 43.2591 24.5 43.2591C27.8843 43.2591 31.1299 41.9147 33.523 39.5217C35.916 37.1286 37.2604 33.883 37.2604 30.4987C37.2604 27.1144 35.916 23.8688 33.523 21.4757C31.1299 19.0827 27.8843 17.7383 24.5 17.7383Z" fill="black" />
                                    <path d="M22.2674 26.898C22.0742 26.6906 21.9691 26.4164 21.9741 26.1331C21.9791 25.8497 22.0939 25.5793 22.2943 25.3789C22.4946 25.1786 22.765 25.0638 23.0484 25.0588C23.3317 25.0538 23.6059 25.1589 23.8133 25.3521L28.1883 29.7271C28.3931 29.9322 28.5082 30.2102 28.5082 30.5001C28.5082 30.7899 28.3931 31.0679 28.1883 31.273L23.8133 35.648C23.7131 35.7554 23.5924 35.8416 23.4582 35.9014C23.3241 35.9612 23.1792 35.9933 23.0324 35.9959C22.8855 35.9985 22.7396 35.9715 22.6035 35.9165C22.4673 35.8615 22.3435 35.7796 22.2397 35.6757C22.1358 35.5719 22.0539 35.4482 21.9989 35.312C21.9439 35.1758 21.9169 35.0299 21.9195 34.883C21.9221 34.7362 21.9542 34.5914 22.014 34.4572C22.0738 34.323 22.16 34.2023 22.2674 34.1021L24.7758 31.5938H12.832C12.542 31.5938 12.2638 31.4786 12.0586 31.2735C11.8535 31.0683 11.7383 30.7901 11.7383 30.5001C11.7383 30.21 11.8535 29.9318 12.0586 29.7267C12.2638 29.5215 12.542 29.4063 12.832 29.4063H24.7758L22.2674 26.898Z" fill="black" />
                                </svg>
                            </div>
                            <select
                                value={engagementFilter}
                                onChange={(e) => setEngagementFilter(e.target.value)}
                                className="text-sm text-gray-500 border-none outline-none bg-transparent"
                            >
                                <option>This Week</option>
                                <option>Today</option>
                            </select>
                        </div>
                        <p className="text-sm text-gray-500 leading-[35px]">TOTAL LOGINS</p>
                        <p className="text-lg font-semibold text-gray-800">251</p>
                    </div>

                    {/* Avg. Session Time Card */}
                    <div className="bg-white rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 50" fill="none">
                                    <rect x="0.0585938" y="0.710938" width="47.8719" height="48.4125" rx="10.6981" fill="#5570F1" fill-opacity="0.08" />
                                    <path d="M12.7383 25.4714C12.7383 23.4314 13.2483 21.5414 14.2583 19.8114C15.2683 18.0814 16.6383 16.7114 18.3683 15.7014C20.0983 14.6914 21.9783 14.1914 24.0083 14.1914C25.5283 14.1914 26.9883 14.4914 28.3783 15.0814C29.7683 15.6714 30.9583 16.4814 31.9683 17.4814C32.9783 18.4814 33.7783 19.6814 34.3683 21.0814C34.9583 22.4814 35.2583 23.9314 35.2583 25.4714C35.2583 26.9914 34.9583 28.4514 34.3683 29.8414C33.7783 31.2314 32.9683 32.4314 31.9683 33.4314C30.9683 34.4314 29.7683 35.2314 28.3783 35.8214C26.9883 36.4114 25.5383 36.7114 24.0083 36.7114C22.4783 36.7114 21.0083 36.4114 19.6183 35.8214C18.2283 35.2314 17.0283 34.4214 16.0183 33.4214C15.0083 32.4214 14.2183 31.2214 13.6183 29.8414C13.0183 28.4614 12.7383 27.0014 12.7383 25.4714ZM15.2183 25.4714C15.2183 27.8414 16.0783 29.9014 17.8083 31.6514C19.5383 33.3814 21.5983 34.2414 24.0083 34.2414C25.5883 34.2414 27.0583 33.8514 28.3983 33.0614C29.7383 32.2714 30.8183 31.2114 31.6083 29.8614C32.3983 28.5114 32.7983 27.0514 32.7983 25.4714C32.7983 23.8914 32.3983 22.4214 31.6083 21.0714C30.8183 19.7214 29.7483 18.6514 28.3983 17.8614C27.0483 17.0714 25.5883 16.6814 24.0083 16.6814C22.4283 16.6814 20.9583 17.0714 19.6183 17.8614C18.2783 18.6514 17.1983 19.7214 16.3983 21.0714C15.5983 22.4214 15.2183 23.8914 15.2183 25.4714ZM23.1383 25.4714V18.8114C23.1383 18.5814 23.2183 18.3814 23.3783 18.2214C23.5383 18.0614 23.7383 17.9814 23.9683 17.9814C24.1883 17.9814 24.3883 18.0614 24.5583 18.2214C24.7283 18.3814 24.8083 18.5814 24.8083 18.8114V22.3414L25.5583 21.0414C25.6783 20.8414 25.8483 20.7214 26.0783 20.6614C26.3083 20.6014 26.5183 20.6314 26.7183 20.7514C26.9183 20.8614 27.0383 21.0214 27.1083 21.2514C27.1783 21.4814 27.1483 21.6814 27.0283 21.8814L24.7383 25.7914C24.6083 26.1414 24.3583 26.3214 23.9783 26.3214C23.7483 26.3214 23.5483 26.2414 23.3883 26.0814C23.2283 25.9214 23.1383 25.7114 23.1383 25.4714Z" fill="#79A12A" />
                                </svg>
                            </div>
                            <select
                                value={engagementFilter}
                                onChange={(e) => setEngagementFilter(e.target.value)}
                                className="text-sm text-gray-500 border-none outline-none bg-transparent"
                            >
                                <option>This Week</option>
                                <option>Today</option>
                            </select>
                        </div>
                        <p className="text-sm text-gray-500 leading-[35px]">AVG. SESSION TIME</p>
                        <p className="text-lg font-semibold text-gray-800">35 <span className="text-sm">Hr</span></p>
                    </div>

                    {/* Daily Active Users Card */}
                    <div className="bg-white rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 55 56" fill="none">
                                    <rect x="0.0585938" y="0.710938" width="54.2483" height="54.8609" rx="12.123" fill="#5570F1" fill-opacity="0.08" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.2812 29.5859C26.3691 29.5859 29.8631 30.2124 29.8631 32.7148C29.8631 35.2173 26.3924 35.8616 22.2812 35.8616C18.1921 35.8616 14.6992 35.2408 14.6992 32.7372C14.6992 30.2337 18.1688 29.5859 22.2812 29.5859Z" stroke="#1C1D22" stroke-width="2.00589" stroke-linecap="round" stroke-linejoin="round" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.2783 26.0157C19.5944 26.0157 17.418 23.8158 17.418 21.1016C17.418 18.3874 19.5944 16.1875 22.2783 16.1875C24.9611 16.1875 27.1375 18.3874 27.1375 21.1016C27.1475 23.8057 24.9866 26.0056 22.3126 26.0157H22.2783Z" stroke="#1C1D22" stroke-width="2.00589" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M29.9219 24.742C31.696 24.4898 33.0624 22.95 33.0657 21.0864C33.0657 19.2496 31.7415 17.7255 30.005 17.4375" stroke="#1C1D22" stroke-width="2.00589" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M32.2578 29.0586C33.9765 29.3175 35.1767 29.9271 35.1767 31.1822C35.1767 32.0463 34.6115 32.6066 33.6984 32.9574" stroke="#1C1D22" stroke-width="2.00589" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <select
                                value={engagementFilter}
                                onChange={(e) => setEngagementFilter(e.target.value)}
                                className="text-sm text-gray-500 border-none outline-none bg-transparent"
                            >
                                <option>This Week</option>
                                <option>Today</option>
                            </select>
                        </div>
                        <p className="text-sm text-gray-500 leading-[35px]">DAILY ACTIVE USERS</p>
                        <p className="text-lg font-semibold text-gray-800">300</p>
                    </div>
                </div>
            </div>

            {/* Subscription Report */}
            <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Subscription Report</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Total Registered Students Card */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 55 56" fill="none">
                                    <rect x="0.730469" y="0.667969" width="54.2483" height="54.8609" rx="12.123" fill="#FFCF76" fill-opacity="0.42" />
                                    <path d="M24.5 17.7383C24.2099 17.7383 23.9317 17.8535 23.7266 18.0586C23.5215 18.2638 23.4062 18.542 23.4062 18.832C23.4062 19.1221 23.5215 19.4003 23.7266 19.6054C23.9317 19.8105 24.2099 19.9258 24.5 19.9258C25.8885 19.9258 27.2633 20.1993 28.5461 20.7306C29.8288 21.2619 30.9944 22.0407 31.9762 23.0225C32.958 24.0043 33.7368 25.1699 34.2681 26.4526C34.7994 27.7354 35.0729 29.1102 35.0729 30.4987C35.0729 31.8872 34.7994 33.262 34.2681 34.5448C33.7368 35.8275 32.958 36.9931 31.9762 37.9749C30.9944 38.9567 29.8288 39.7355 28.5461 40.2668C27.2633 40.7981 25.8885 41.0716 24.5 41.0716C24.2099 41.0716 23.9317 41.1868 23.7266 41.392C23.5215 41.5971 23.4062 41.8753 23.4062 42.1654C23.4062 42.4554 23.5215 42.7336 23.7266 42.9388C23.9317 43.1439 24.2099 43.2591 24.5 43.2591C27.8843 43.2591 31.1299 41.9147 33.523 39.5217C35.916 37.1286 37.2604 33.883 37.2604 30.4987C37.2604 27.1144 35.916 23.8688 33.523 21.4757C31.1299 19.0827 27.8843 17.7383 24.5 17.7383Z" fill="black" />
                                    <path d="M22.2674 26.898C22.0742 26.6906 21.9691 26.4164 21.9741 26.1331C21.9791 25.8497 22.0939 25.5793 22.2943 25.3789C22.4946 25.1786 22.765 25.0638 23.0484 25.0588C23.3317 25.0538 23.6059 25.1589 23.8133 25.3521L28.1883 29.7271C28.3931 29.9322 28.5082 30.2102 28.5082 30.5001C28.5082 30.7899 28.3931 31.0679 28.1883 31.273L23.8133 35.648C23.7131 35.7554 23.5924 35.8416 23.4582 35.9014C23.3241 35.9612 23.1792 35.9933 23.0324 35.9959C22.8855 35.9985 22.7396 35.9715 22.6035 35.9165C22.4673 35.8615 22.3435 35.7796 22.2397 35.6757C22.1358 35.5719 22.0539 35.4482 21.9989 35.312C21.9439 35.1758 21.9169 35.0299 21.9195 34.883C21.9221 34.7362 21.9542 34.5914 22.014 34.4572C22.0738 34.323 22.16 34.2023 22.2674 34.1021L24.7758 31.5938H12.832C12.542 31.5938 12.2638 31.4786 12.0586 31.2735C11.8535 31.0683 11.7383 30.7901 11.7383 30.5001C11.7383 30.21 11.8535 29.9318 12.0586 29.7267C12.2638 29.5215 12.542 29.4063 12.832 29.4063H24.7758L22.2674 26.898Z" fill="black" />
                                </svg>
                            </div>
                            <select
                                value={subscriptionFilter}
                                onChange={(e) => setSubscriptionFilter(e.target.value)}
                                className="text-sm text-gray-500 border-none outline-none bg-transparent"
                            >
                                <option>This Week</option>
                                <option>Today</option>
                            </select>
                        </div>
                        <p className="text-sm text-gray-500 leading-[35px]">TOTAL REGISTERED STUDENTS</p>
                        <p className="text-lg font-semibold text-gray-800">50,000</p>
                    </div>

                    {/* Active Students Card */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 55 56" fill="none">
                                    <rect x="0.0585938" y="0.710938" width="54.2483" height="54.8609" rx="12.123" fill="#5570F1" fill-opacity="0.08" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.2812 29.5859C26.3691 29.5859 29.8631 30.2124 29.8631 32.7148C29.8631 35.2173 26.3924 35.8616 22.2812 35.8616C18.1921 35.8616 14.6992 35.2408 14.6992 32.7372C14.6992 30.2337 18.1688 29.5859 22.2812 29.5859Z" stroke="#1C1D22" stroke-width="2.00589" stroke-linecap="round" stroke-linejoin="round" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.2783 26.0157C19.5944 26.0157 17.418 23.8158 17.418 21.1016C17.418 18.3874 19.5944 16.1875 22.2783 16.1875C24.9611 16.1875 27.1375 18.3874 27.1375 21.1016C27.1475 23.8057 24.9866 26.0056 22.3126 26.0157H22.2783Z" stroke="#1C1D22" stroke-width="2.00589" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M29.9219 24.742C31.696 24.4898 33.0624 22.95 33.0657 21.0864C33.0657 19.2496 31.7415 17.7255 30.005 17.4375" stroke="#1C1D22" stroke-width="2.00589" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M32.2578 29.0586C33.9765 29.3175 35.1767 29.9271 35.1767 31.1822C35.1767 32.0463 34.6115 32.6066 33.6984 32.9574" stroke="#1C1D22" stroke-width="2.00589" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                            </div>
                            <select
                                value={subscriptionFilter}
                                onChange={(e) => setSubscriptionFilter(e.target.value)}
                                className="text-sm text-gray-500 border-none outline-none bg-transparent"
                            >
                                <option>This Week</option>
                                <option>Today</option>
                            </select>
                        </div>
                        <p className="text-sm text-gray-500 leading-[35px]">ACTIVE STUDENTS</p>
                        <p className="text-lg font-semibold text-gray-800">345</p>
                    </div>

                    {/* Inactive Students Card */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 55 56" fill="none">
                                    <rect x="0.0585938" y="0.710938" width="54.2483" height="54.8609" rx="12.123" fill="#5570F1" fill-opacity="0.08" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.2812 29.5859C26.3691 29.5859 29.8631 30.2124 29.8631 32.7148C29.8631 35.2173 26.3924 35.8616 22.2812 35.8616C18.1921 35.8616 14.6992 35.2408 14.6992 32.7372C14.6992 30.2337 18.1688 29.5859 22.2812 29.5859Z" stroke="#1C1D22" stroke-width="2.00589" stroke-linecap="round" stroke-linejoin="round" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.2783 26.0157C19.5944 26.0157 17.418 23.8158 17.418 21.1016C17.418 18.3874 19.5944 16.1875 22.2783 16.1875C24.9611 16.1875 27.1375 18.3874 27.1375 21.1016C27.1475 23.8057 24.9866 26.0056 22.3126 26.0157H22.2783Z" stroke="#1C1D22" stroke-width="2.00589" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M29.9219 24.742C31.696 24.4898 33.0624 22.95 33.0657 21.0864C33.0657 19.2496 31.7415 17.7255 30.005 17.4375" stroke="#1C1D22" stroke-width="2.00589" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M32.2578 29.0586C33.9765 29.3175 35.1767 29.9271 35.1767 31.1822C35.1767 32.0463 34.6115 32.6066 33.6984 32.9574" stroke="#1C1D22" stroke-width="2.00589" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                            </div>
                            <select
                                value={subscriptionFilter}
                                onChange={(e) => setSubscriptionFilter(e.target.value)}
                                className="text-sm text-gray-500 border-none outline-none bg-transparent"
                            >
                                <option>This Week</option>
                                <option>Today</option>
                            </select>
                        </div>
                        <p className="text-sm text-gray-500 leading-[35px]">INACTIVE STUDENTS</p>
                        <p className="text-lg font-semibold text-gray-800">300</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentEngagement;