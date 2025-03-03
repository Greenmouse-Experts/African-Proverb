import React, { useState, useContext, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import _ from "lodash";
import { UserNotificationContext } from "@/context/userNotificationContext";
import ReusableModal from "@/components/reuse/resuableModal/reuseable_modal";
import { getUserNotification, getUserNotificationById, getUserNotificationUnread, getUserNotificationRead } from "@/network/apiService";
import Loader from '../reuse/loader';



export const AllNotificationsComponent = () => {
    const [selectedTab, setSelectedTab] = useState('all');
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(true);
    const [usernotificationbyid, setUserNotificationById] = useState()
    const [usernotification, setUserNotification] = useState()
    // const { usernotification, setUserNotification } = useContext(UserNotificationContext);
    const [currentPage, setCurrentPage] = useState(1);
    const notificationsPerPage = 7;
    const [isLoading, setIsLoading] = useState(false);





    const fetchData = async () => {
        setIsLoading(false);
        try {
            let response;

            if (selectedTab === 'unread') {
                response = await getUserNotificationUnread({
                    page: currentPage,
                    size: notificationsPerPage,
                });
                setUserNotification(response.data);
                setIsLoading(true);
            } else if (selectedTab === 'read') {
                response = await getUserNotificationRead({
                    page: currentPage,
                    size: notificationsPerPage,
                });
                setUserNotification(response.data);
                setIsLoading(true);
            } else {
                // Default to fetching all notifications
                response = await getUserNotification({
                    page: currentPage,
                    size: notificationsPerPage,
                });
                setUserNotification(response.data);
                setIsLoading(true);
            }

        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    useEffect(() => {

        fetchData();
    }, [currentPage, notificationsPerPage, selectedTab, usernotificationbyid]);



    const handleViewMessage = (id) => {
        setLoading(true);

        if (id) {
            getUserNotificationById(id)
                .then((res) => {
                    setUserNotificationById(res.data);

                    setShowPopup(true);
                    setLoading(false);

                })
                .catch((err) => {
                    setLoading(false);
                });
        }

        if (selectedTab === 'unread') {
            fetchData(); // Assuming fetchData is in the same scope
        }
    };



    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const formattedTime = (timestamp) => {
        const now = new Date();
        const date = new Date(timestamp);

        const timeDiffMillis = now - date;
        const secondsAgo = Math.floor(timeDiffMillis / 1000);
        const minutesAgo = Math.floor(timeDiffMillis / (1000 * 60));
        const hoursAgo = Math.floor(timeDiffMillis / (1000 * 60 * 60));
        const daysAgo = Math.floor(timeDiffMillis / (1000 * 60 * 60 * 24));
        const monthsAgo = Math.floor(timeDiffMillis / (1000 * 60 * 60 * 24 * 30));
        const yearsAgo = Math.floor(timeDiffMillis / (1000 * 60 * 60 * 24 * 365));

        if (secondsAgo < 60) {
            return `${secondsAgo} second${secondsAgo > 1 ? "s" : ""} ago`;
        } else if (minutesAgo < 60) {
            return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
        } else if (hoursAgo < 24) {
            return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
        } else if (daysAgo < 30) {
            return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
        } else if (monthsAgo < 12) {
            return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
        } else {
            return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
        }
    };


    return (
        <div className='w-4/5 lg:w-1/2 mb-10 mt-10 min-h-[50vh]'>
            <div className=" border border-solid border-gray-300 rounded p-4 mb-4 w-full">
                <div className="flex flex-col md:flex-row gap-3 lg:items-center justify-between mb-4">

                    <span className="block font-semibold text-base leading-5 w-full  text-gray-700 md:w-1/2">
                        All Notifications
                    </span>

                    <div className="flex flex-col md:flex-row gap-2">
                        <button
                            className={`tab-btn ${selectedTab === 'all' ? 'bg-[#BB5D06] text-white' : 'bg-[#faf2eb] text-[#BB5D06]'} px-4 py-2 rounded`}
                            onClick={() => setSelectedTab('all')}
                        >
                            All
                        </button>
                        <button
                            className={`tab-btn ${selectedTab === 'read' ? 'bg-[#BB5D06] text-white' : 'bg-[#faf2eb] text-[#BB5D06]'} px-4 py-2 rounded`}
                            onClick={() => setSelectedTab('read')}
                        >
                            Read
                        </button>
                        <button
                            className={`tab-btn ${selectedTab === 'unread' ? 'bg-[#BB5D06] text-white' : 'bg-[#faf2eb] text-[#BB5D06]'} px-4 py-2 rounded`}
                            onClick={() => setSelectedTab('unread')}
                        >
                            Unread
                        </button>
                    </div>
                </div>

                {!isLoading ? (
                    <div className="col-span-3 flex justify-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="inline-block w-full">
                        <ul className="inline-block list-none mb-0 pl-0 w-full">

                            {usernotification && usernotification?.data?.map((notification, index) => (
                                <div style={{ display: "flex", flexDirection: "column", gap: "12px", borderBottom: "1px solid #BB5D06", padding: "12px", marginBottom: "20px", borderRadius: "8px" }} key={index}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <h2 style={{
                                            color: "#000",
                                            fontSize: "14px",
                                            fontWeight: "600"
                                        }}>{notification?.userMessages?.title} {notification?.is_read === false && (
                                            <span style={{
                                                display: "inline-block",
                                                width: "5px",
                                                height: "5px",
                                                backgroundColor: "#BB5D06",
                                                borderRadius: "50%",
                                                marginRight: "8px",
                                            }}></span>
                                        )}</h2>
                                        <p style={{
                                            color: "#fff",
                                            fontSize: "10px",
                                        }}>{formattedTime(notification?.userMessages?.date_created)}</p>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "102px" }}>
                                        <p style={{
                                            color: "#000",
                                            fontSize: "14px",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            maxWidth: "100%"
                                        }}>
                                            {notification?.userMessages?.body}

                                        </p>
                                        <p style={{
                                            color: "#000",
                                            fontSize: "14px",
                                            cursor: "pointer",
                                        }} onClick={() => handleViewMessage(notification?.id)}>View</p>
                                    </div>

                                </div>
                            ))}


                        </ul>
                        <div className='mt-5'>

                            <Pagination
                                count={usernotification?.totalPages || 1}
                                shape="rounded"
                                page={currentPage}
                                onChange={handlePageChange}
                            />
                        </div>
                    </div>
                )}

                <ReusableModal setOpen={setShowPopup} open={showPopup}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h2 style={{
                            color: "#000",

                            fontSize: "14px",
                            fontWeight: "600"
                        }}>{usernotificationbyid?.userMessages?.title}</h2>
                        <p style={{
                            color: "#707070",

                            fontSize: "10px",
                        }}>{formattedTime(usernotificationbyid?.userMessages?.date_created)}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <p style={{
                            color: "#4C4C4C",

                            fontSize: "14px",
                            whiteSpace: "wrap",

                        }}>
                            {usernotificationbyid?.userMessages?.body}

                        </p>

                    </div>
                </ReusableModal>
            </div>
        </div>
    )
}

export default AllNotificationsComponent;