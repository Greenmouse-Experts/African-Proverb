// import React, { useEffect, useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import { requestPermission, onMessageListener } from '@/utils/firebase1';



// const PushNotificationLayout = () => {
//     const [notification, setNotification] = useState({ title: "", body: "" })

//     useEffect(() => {
//         requestPermission()
//         const unsubcribe = onMessageListener().then(payload => {
//             setNotification({
//                 title: payload?.notification?.title,
//                 body: payload?.notification?.body
//             })

//             toast.success(
//                 `${payload?.notification?.title} : ${payload?.notification?.body}`,
//                 {
//                     duration: 60000,
//                     position: "top-right"
//                 }
//             )
//         })

//         return () => {
//             unsubcribe.catch(err => console.log("failed: ", err))
//         }

//     }, [])

//     return (
//         <div>
//             <ToastContainer />
//         </div>
//     )
// }

// export default PushNotificationLayout