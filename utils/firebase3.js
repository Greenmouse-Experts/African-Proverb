// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// const firebaseConfig = {
//     apiKey: "AIzaSyAbA6OOIQiLnN4CXanQZAHuCiSOYjLNZRg",
//     authDomain: "african-proverbs-d0430.firebaseapp.com",
//     projectId: "african-proverbs-d0430",
//     storageBucket: "african-proverbs-d0430.appspot.com",
//     messagingSenderId: "1043056508657",
//     appId: "1:1043056508657:web:09d4c1f5ac042360a63350",
//     measurementId: "G-DYK33SNYFC"
// };

// const app = initializeApp(firebaseConfig);
// console.log('Firebase initialized');

// const messaging = getMessaging(app);

// // Function to save the user's device token to your server
// function saveTokenToServer(token) {
//     // Define your server endpoint
//     const serverEndpoint = 'https://dev-api.africanproverbs.com/firebase/device/save/';

//     // Payload data
//     const payload = {
//         device_type: 'WEB',  // You can customize this as needed
//         device_token: token,
//     };

//     // Send an HTTP POST request to your server
//     fetch(serverEndpoint, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//     })
//         .then((response) => {
//             if (response.ok) {
//                 console.log('Token saved to the server.');
//             } else {
//                 console.error('Failed to save token to the server.');
//             }
//         })
//         .catch((error) => {
//             console.error('Error while saving token to the server:', error);
//         });
// }

// export const requestPermission = () => {
//     console.log("Requesting User Permission.......");
//     Notification.requestPermission().then((permission) => {
//         if (permission === "granted") {
//             console.log("Notification permission granted");
//         }
//     });


//     getToken(messaging, { vapidKey: 'BJTI2rnH6lo63LFlSCpYmzxDf_60Hxe1klvpuDDRA9k77nzCW99wcFNDMp_lX0G3r65MVzpDOC9o_Ab_foTb8AY' })
//         .then((currentToken) => {
//             if (currentToken) {
//                 // Save the token to your server
//                 saveTokenToServer(currentToken);
//                 console.log("Token received: ", currentToken);
//             } else {
//                 console.log('No registration token available. Request permission to generate one.');
//             }
//         })
//         .catch((err) => {
//             console.error('An error occurred while retrieving token. ', err);
//         });
// }

// requestPermission();

// export const onMessageListener = () => {
//     return new Promise(resolve => {
//         onMessage(messaging, payload => {
//             resolve(payload);
//         });
//     });
// }
