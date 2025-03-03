import { useEffect, useState, useContext } from "react";
import { UserNotificationContext } from "../userNotificationContext";
import { getUserNotification, LeaderBoardPlayers, LeaderBoardPlayer, getUserUnreadCount } from "@/network/apiService";
import { AuthContext } from "@/context/authContext";
const POLLING_INTERVAL = 5000; // Adjust the polling interval as needed (5000 milliseconds = 5 seconds)

const UserNotificationProvider = ({ children }) => {
    const [usernotification, setUserNotification] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);
    const [unreadCount, setUnreadCount] = useState(0);
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setisLoading] = useState(false);
    const [leaderboarddetails, setLeaderboardDetails] = useState([]);

    const fetchNotifications = async () => {
        setisLoading(true);
        try {
          const res = await getUserNotification();
          setUserNotification(res.data);
          setisLoading(false);
        } catch (error) {
          console.error("Failed to fetch notifications:", error);
          setisLoading(false);
        }
      };

    const fetchUnreadCount = async () => {
        try {
            const res = await getUserUnreadCount();
            setUnreadCount(res.data.message);

        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        }
    };

    const fetchLeaderboard = async () => {
        setisLoading(true)
        try {
            const res = await LeaderBoardPlayers();
            setLeaderboard(res.data);

            setisLoading(false);
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        }
    };


    const fetchLeaderboardPlayer = async () => {
        setisLoading(true)
        try {
            const res = await LeaderBoardPlayer();

            setLeaderboardDetails(res.data);
            setisLoading(false);

        } catch (error) {
            console.error("Failed to fetch notifications:", error);

        }
    };


    useEffect(() => {
        // Set up polling to fetch notifications at regular intervals
        const pollingIntervalId = setInterval(() => {
            if (isAuthenticated) {
                fetchNotifications();
                fetchUnreadCount();

            }
        }, POLLING_INTERVAL);

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(pollingIntervalId);
        };


    }, [isAuthenticated]);




    return (
        <UserNotificationContext.Provider
            value={{
                usernotification,
                setUserNotification,
                unreadCount,
                setUnreadCount,
                leaderboard,
                leaderboarddetails,
                fetchLeaderboard,
                fetchLeaderboardPlayer
            }}
        >
            {children}
        </UserNotificationContext.Provider>
    );
};

export default UserNotificationProvider;
