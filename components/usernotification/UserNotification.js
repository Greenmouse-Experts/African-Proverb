import React, { useState, useEffect, useContext } from 'react';
import { Dropdown, Badge, Menu, Button, Pagination } from 'antd';
import { BellOutlined, CloseOutlined } from '@ant-design/icons';
import { AuthContext } from "@/context/authContext";
import Link from 'next/link';
import { UserNotificationContext } from "@/context/userNotificationContext";
import _ from "lodash";
import { getUserNotificationById } from "@/network/apiService";



const UserNotification = ({ color }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useContext(AuthContext);
    const [usernotificationbyid, setUserNotificationById] = useState()
    const { usernotification, unreadCount, setUnreadCount } = useContext(UserNotificationContext);
    const totalNotifications = usernotification?.totalElements ?? 0;
    const pageSize = 5;





    useEffect(() => {
        // Update unreadCount when the context data changes
        setUnreadCount(unreadCount);
    }, [unreadCount]);

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



    const handleViewMessage = (id) => {
        setLoading(true);

        if (id) {
            getUserNotificationById(id)
                .then((res) => {
                    setUserNotificationById(res.data);
                    setLoading(false);
                    setOpen(true);
                })
                .catch((err) => {
                    setLoading(false);
                });
        }
    };


    const handleBackToNotifications = () => {
        setUserNotificationById(null);
        setOpen(true);
    };
    const handleDropdownClose = () => {
        setOpen(false);
    };





    const notificationMenuItems = (usernotification?.data || []).map((notification, index) => {

      

        return (
            <Menu.Item key={index}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <hr style={{ width: "100%", color: "#E0E0E0" }} />
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
                            color: "#707070",
                            fontFamily: "Mulish",
                            fontSize: "10px",
                        }}>{formattedTime(notification?.userMessages?.date_created)}</p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "102px" }}>
                        <p style={{
                            color: "#4C4C4C", 
                            fontSize: "14px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "90px"
                        }}>
                            {notification?.userMessages?.body}

                        </p>
                        <p style={{
                            color: "#BB5D06",

                            fontSize: "14px",
                        }} onClick={() => handleViewMessage(notification?.id)}>View</p>
                    </div>
                </div>
            </Menu.Item>
        );

        return null; 
    });


    const menu = (
        <Menu style={{ width: '300px', paddingTop: '10px', paddingBottom: '10px' }}>
            {usernotificationbyid ? (
                <Menu.Item key={usernotificationbyid?.id}>
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
                            maxWidth: "250px"
                        }}>
                            {usernotificationbyid?.userMessages?.body}

                        </p>
                        <p style={{
                            color: "#BB5D06",
                            fontSize: "14px",
                        }} onClick={handleBackToNotifications}>Back</p>
                    </div>
                </Menu.Item>
            ) : (
                <>
                    <Menu.Item>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h1 style={{
                                color: "#000",
                                fontSize: "20px",
                                fontWeight: "700"
                            }}>Notification ({unreadCount})</h1>
                            <CloseOutlined onClick={handleDropdownClose} />
                        </div>
                    </Menu.Item>
                    {notificationMenuItems}
                    {totalNotifications >= 0 && (
                        <Menu.Item>
                            <Link href={"/allnotifcations"}>
                                <p style={{
                                    color: "#BB5D06",
                                    fontSize: "14px",
                                }}>View all</p>
                            </Link>
                        </Menu.Item>
                    )}
                </>
            )}
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']} open={open} onOpenChange={visible => setOpen(visible)}>
            <Badge 
            count={unreadCount} 
            size="default" style={{ padding: "0px", borderRadius: '50%', width: "100%" }}>
                <BellOutlined
                    style={{
                        fontSize: '24px',
                        cursor: "pointer",
                        color: color,
                    }} />
            </Badge>
        </Dropdown>
    );
};

export default UserNotification;
