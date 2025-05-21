"use client";

import React, { useState } from 'react';
import BarChart from "./BarChart";
import ProgressChart from "./ProgressChart";
import LoginFrequencyGraph from "./LoginFrequencyGraph";
import Learning from "./Learning";
import LanguagePreferencesChart from "./PreferencesChart";


const StudentEngagement = () => {

    return (
        <>
            <div className="">
                {/* User Engagement Metricst */}
                <div className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-6">User Engagement Metricst</h2>
                    <div className="flex flex-wrap gap-4">
                        {/* Active Users Card */}
                        <div className="bg-white rounded-lg p-4  flex-1 min-w-[200px]">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 59 59" fill="none">
                                        <rect x="1.17809" y="1.17907" width="57.301" height="57.301" rx="11.2426" stroke="black" stroke-opacity="0.2" stroke-width="0.725329" />
                                        <path d="M29.4993 27.0827C32.1687 27.0827 34.3327 24.9187 34.3327 22.2493C34.3327 19.58 32.1687 17.416 29.4993 17.416C26.83 17.416 24.666 19.58 24.666 22.2493C24.666 24.9187 26.83 27.0827 29.4993 27.0827Z" stroke="black" stroke-width="1.5" />
                                        <path d="M39.1639 36.7487C39.1655 36.5505 39.1663 36.3491 39.1663 36.1445C39.1663 33.1418 34.8381 30.707 29.4997 30.707C24.1613 30.707 19.833 33.1418 19.833 36.1445C19.833 39.1472 19.833 41.582 29.4997 41.582C32.1955 41.582 34.1397 41.3923 35.5413 41.054" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                </div>
                                <p className="text-sm font-medium text-green-600">Active Users</p>
                            </div>
                            <p className="text-lg font-semibold text-gray-900">150</p>
                        </div>

                        {/* Quiz Performance Card */}
                        <div className="bg-white rounded-lg p-4 flex-1 min-w-[200px]">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 59 59" fill="none">
                                        <rect x="1.17809" y="1.17907" width="57.301" height="57.301" rx="11.2426" stroke="black" stroke-opacity="0.2" stroke-width="0.725329" />
                                        <path d="M25.8753 37.3535C25.8753 35.7948 24.8965 34.4402 23.7003 33.4421C22.269 32.2501 21.2398 30.646 20.7528 28.8481C20.2657 27.0502 20.3445 25.146 20.9784 23.3945C21.6123 21.643 22.7705 20.1294 24.2953 19.0596C25.8202 17.9899 27.6376 17.416 29.5003 17.416C31.3627 17.4163 33.1797 17.9903 34.7043 19.06C36.2288 20.1296 37.3868 21.6431 38.0206 23.3943C38.6544 25.1455 38.7334 27.0494 38.2466 28.8471C37.7599 30.6447 36.7311 32.2488 35.3003 33.4409C34.104 34.4402 33.1253 35.7948 33.1253 37.3535M25.8753 37.3535H33.1253M25.8753 37.3535V39.7702C25.8753 40.2509 26.0662 40.7119 26.4061 41.0518C26.7461 41.3917 27.2071 41.5827 27.6878 41.5827H31.3128C31.7935 41.5827 32.2545 41.3917 32.5944 41.0518C32.9343 40.7119 33.1253 40.2509 33.1253 39.7702V37.3535" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M27.084 24.6667C27.084 23.4426 28.1654 22.25 29.5007 22.25C30.8359 22.25 31.9173 23.2408 31.9173 24.4649C31.9173 24.9059 31.7772 25.3168 31.5343 25.6623C30.8117 26.6918 29.5007 27.673 29.5007 28.8958M29.491 31.9167H29.5019" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <p className="text-sm font-medium text-[#BB5D06]">Quiz Performance</p>
                            </div>
                            <p className="text-lg font-semibold text-gray-900">125</p>
                        </div>

                        {/* Most Attempted Quizzes Card */}
                        <div className="bg-white rounded-lg p-4 flex-1 min-w-[200px]">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 59 59" fill="none">
                                        <rect x="1.17809" y="1.17907" width="57.301" height="57.301" rx="11.2426" stroke="black" stroke-opacity="0.2" stroke-width="0.725329" />
                                        <path d="M29.8298 34.6621H29.8407" stroke="#534FEB" stroke-width="1.45066" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M29.8301 31.0371L29.8301 24.9927" stroke="#534FEB" stroke-width="1.45066" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M35.0382 20.6221C34.3238 20.6221 33.9665 20.6221 33.6411 20.5014C33.5959 20.4846 33.5513 20.4662 33.5075 20.446C33.192 20.3013 32.9394 20.0487 32.4341 19.5435C31.2713 18.3807 30.6899 17.7993 29.9745 17.7456C29.8783 17.7384 29.7817 17.7384 29.6855 17.7456C28.9701 17.7993 28.3887 18.3807 27.2259 19.5435C26.7207 20.0487 26.4681 20.3013 26.1526 20.446C26.1088 20.4662 26.0642 20.4846 26.019 20.5014C25.6935 20.6221 25.3363 20.6221 24.6218 20.6221H24.49C22.6671 20.6221 21.7557 20.6221 21.1894 21.1884C20.6231 21.7547 20.6231 22.6662 20.6231 24.489V24.6208C20.6231 25.3353 20.6231 25.6926 20.5024 26.018C20.4856 26.0632 20.4671 26.1078 20.447 26.1516C20.3023 26.4671 20.0497 26.7197 19.5445 27.2249C18.3816 28.3878 17.8002 28.9692 17.7466 29.6846C17.7394 29.7808 17.7394 29.8773 17.7466 29.9735C17.8002 30.6889 18.3816 31.2703 19.5445 32.4332C20.0497 32.9384 20.3023 33.191 20.447 33.5065C20.4671 33.5503 20.4856 33.5949 20.5024 33.6401C20.6231 33.9655 20.6231 34.3228 20.6231 35.0373V35.1691C20.6231 36.9919 20.6231 37.9034 21.1894 38.4697C21.7557 39.036 22.6671 39.036 24.49 39.036H24.6218C25.3363 39.036 25.6935 39.036 26.019 39.1567C26.0642 39.1735 26.1088 39.1919 26.1526 39.2121C26.4681 39.3568 26.7207 39.6094 27.2259 40.1146C28.3887 41.2774 28.9701 41.8588 29.6855 41.9125C29.7817 41.9197 29.8783 41.9197 29.9745 41.9125C30.6899 41.8588 31.2713 41.2774 32.4341 40.1146C32.9394 39.6094 33.192 39.3568 33.5075 39.2121C33.5513 39.1919 33.5959 39.1735 33.6411 39.1567C33.9665 39.036 34.3238 39.036 35.0382 39.036H35.17C36.9929 39.036 37.9043 39.036 38.4706 38.4697C39.0369 37.9034 39.0369 36.9919 39.0369 35.1691V35.0373C39.0369 34.3228 39.0369 33.9655 39.1577 33.6401C39.1745 33.5949 39.1929 33.5503 39.213 33.5065C39.3578 33.191 39.6104 32.9384 40.1156 32.4332C41.2784 31.2703 41.8598 30.6889 41.9134 29.9735C41.9206 29.8773 41.9206 29.7808 41.9134 29.6846C41.8598 28.9692 41.2784 28.3878 40.1156 27.2249C39.6104 26.7197 39.3578 26.4671 39.213 26.1516C39.1929 26.1078 39.1745 26.0632 39.1577 26.018C39.0369 25.6926 39.0369 25.3353 39.0369 24.6208V24.489C39.0369 22.6662 39.0369 21.7547 38.4706 21.1884C37.9043 20.6221 36.9929 20.6221 35.17 20.6221H35.0382Z" stroke="#534FEB" stroke-width="1.45066" />
                                    </svg>
                                </div>
                                <p className="text-sm font-medium text-[#156BC1]">Most Attempted Quizzes</p>
                            </div>
                            <p className="text-lg font-semibold text-gray-900">Week 2</p>
                        </div>

                        {/* Completion Rates Card */}
                        <div className="bg-white rounded-lg p-4 flex-1 min-w-[200px]">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 59 59" fill="none">
                                        <rect x="1.17809" y="1.17907" width="57.301" height="57.301" rx="11.2426" stroke="black" stroke-opacity="0.2" stroke-width="0.725329" />
                                        <g clip-path="url(#clip0_7222_2881)">
                                            <path d="M36.1128 23.4253L37.3872 24.6997L26.7812 35.3057L21.6128 30.1372L22.8872 28.8628L26.7812 32.7568L36.1128 23.4253ZM29.5 15C30.8311 15 32.1149 15.1699 33.3516 15.5098C34.5882 15.8496 35.7446 16.3358 36.8208 16.9683C37.897 17.6007 38.874 18.356 39.752 19.2339C40.6299 20.1118 41.3851 21.0936 42.0176 22.1792C42.6501 23.2648 43.1362 24.4212 43.4761 25.6484C43.8159 26.8757 43.9906 28.1595 44 29.5C44 30.8311 43.8301 32.1149 43.4902 33.3516C43.1504 34.5882 42.6642 35.7446 42.0317 36.8208C41.3993 37.897 40.644 38.874 39.7661 39.752C38.8882 40.6299 37.9064 41.3851 36.8208 42.0176C35.7352 42.6501 34.5788 43.1362 33.3516 43.4761C32.1243 43.8159 30.8405 43.9906 29.5 44C28.1689 44 26.8851 43.8301 25.6484 43.4902C24.4118 43.1504 23.2554 42.6642 22.1792 42.0317C21.103 41.3993 20.126 40.644 19.248 39.7661C18.3701 38.8882 17.6149 37.9064 16.9824 36.8208C16.3499 35.7352 15.8638 34.5835 15.5239 33.3657C15.1841 32.1479 15.0094 30.8594 15 29.5C15 28.1689 15.1699 26.8851 15.5098 25.6484C15.8496 24.4118 16.3358 23.2554 16.9683 22.1792C17.6007 21.103 18.356 20.126 19.2339 19.248C20.1118 18.3701 21.0936 17.6149 22.1792 16.9824C23.2648 16.3499 24.4165 15.8638 25.6343 15.5239C26.8521 15.1841 28.1406 15.0094 29.5 15ZM29.5 42.1875C30.6611 42.1875 31.7798 42.0365 32.856 41.7344C33.9321 41.4323 34.9422 41.0075 35.8862 40.46C36.8302 39.9124 37.6893 39.2469 38.4634 38.4634C39.2375 37.6798 39.8983 36.8255 40.4458 35.9004C40.9933 34.9753 41.4229 33.9652 41.7344 32.8701C42.0459 31.7751 42.1969 30.6517 42.1875 29.5C42.1875 28.3389 42.0365 27.2202 41.7344 26.144C41.4323 25.0679 41.0075 24.0578 40.46 23.1138C39.9124 22.1698 39.2469 21.3107 38.4634 20.5366C37.6798 19.7625 36.8255 19.1017 35.9004 18.5542C34.9753 18.0067 33.9652 17.5771 32.8701 17.2656C31.7751 16.9541 30.6517 16.8031 29.5 16.8125C28.3389 16.8125 27.2202 16.9635 26.144 17.2656C25.0679 17.5677 24.0578 17.9925 23.1138 18.54C22.1698 19.0876 21.3107 19.7531 20.5366 20.5366C19.7625 21.3201 19.1017 22.1745 18.5542 23.0996C18.0067 24.0247 17.5771 25.0348 17.2656 26.1299C16.9541 27.2249 16.8031 28.3483 16.8125 29.5C16.8125 30.6611 16.9635 31.7798 17.2656 32.856C17.5677 33.9321 17.9925 34.9422 18.54 35.8862C19.0876 36.8302 19.7531 37.6893 20.5366 38.4634C21.3201 39.2375 22.1745 39.8983 23.0996 40.4458C24.0247 40.9933 25.0348 41.4229 26.1299 41.7344C27.2249 42.0459 28.3483 42.1969 29.5 42.1875Z" fill="black" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_7222_2881">
                                                <rect width="29" height="29" fill="white" transform="translate(15 15)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <p className="text-sm font-medium text-black">Completion Rates</p>
                            </div>
                            <p className="text-lg font-semibold text-gray-900 mt-2">80%</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg">
                {/* <h2 className="text-lg font-semibold text-black mb-4">Quiz Performance </h2> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProgressChart
                        title="Proverbs Frequently Accessed"
                        data={[
                            { label: "Teamwork", value: 50, color: "#82C91E" },
                            { label: "PERSEVERANCE", value: 30, color: "#FFB400" },
                            { label: "PEACE", value: 10, color: "#748FFC" },
                            { label: "TIME", value: 8, color: "#5C7CFA" },
                            { label: "EXTOL", value: 2, color: "#E03131" },
                        ]}
                    />
                    <BarChart
                        title="Most view Proverb"
                        labels={["Temi", "Fumi", "John", "Henry", "Dami", "Alade"]}
                        data={[30, 50, 40, 60, 80, 55]}
                    />
                </div>
            </div>
            <LoginFrequencyGraph />
            <Learning />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <LanguagePreferencesChart />
                </div>
            </div>
        </>
    );
};

export default StudentEngagement;