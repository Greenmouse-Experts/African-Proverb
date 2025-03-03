import "firebase/messaging";
import firebase from "firebase/app";
import { SaveWebToken } from "@/network/apiService";


const firebaseCloudMessaging = {
    init: async () => {
        if (!firebase?.apps?.length) {
            // Initialize the Firebase app with the credentials
            firebase.initializeApp({
                apiKey: "AIzaSyAbA6OOIQiLnN4CXanQZAHuCiSOYjLNZRg",
                authDomain: "african-proverbs-d0430.firebaseapp.com",
                projectId: "african-proverbs-d0430",
                storageBucket: "african-proverbs-d0430.appspot.com",
                messagingSenderId: "1043056508657",
                appId: "1:1043056508657:web:09d4c1f5ac042360a63350",
                measurementId: "G-DYK33SNYFC"
            });

            try {
                const messaging = firebase.messaging();
                const tokenInLocalForage = localStorage.getItem("fcm_token");

                // console.log("tokenInLocalForage", tokenInLocalForage);
                // Return the token if it is alredy in our local storage
                if (tokenInLocalForage !== null) {

                    return tokenInLocalForage;
                }
                // Request the push notification permission from browser
                const status = await Notification.requestPermission();
                // console.log("Status", status)
                if (status && status === "granted") {
                    // Get new token from Firebase
                    // console.log("Granted", status)

                    const fcm_token = await messaging.getToken({
                        vapidKey: 'BJTI2rnH6lo63LFlSCpYmzxDf_60Hxe1klvpuDDRA9k77nzCW99wcFNDMp_lX0G3r65MVzpDOC9o_Ab_foTb8AY',
                    });

                    // console.log('fcm_token', fcm_token)
                    // Set token in our local storage

                    if (fcm_token) {
                        // Payload data
                        const payload = {
                            device_type: 'WEB',  // You can customize this as needed
                            device_token: fcm_token,
                        };

                        SaveWebToken(payload)
                            .then((res) => {
                                if (res.status === 200) {
                                    // console.log('Token saved to the server.');
                                    localStorage.setItem("fcm_token", fcm_token);
                                } else {
                                    console.error('Failed to save token to the server.');
                                }
                            }).catch((error) => {
                                console.error('Error while saving token to the server:', error);
                            })

                        return fcm_token;
                    }

                }
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    },
};
export { firebaseCloudMessaging };