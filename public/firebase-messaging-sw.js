


importScripts("https://www.gstatic.com/firebasejs/8.9/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.9/firebase-messaging.js");



firebase.initializeApp({
    apiKey: "AIzaSyAbA6OOIQiLnN4CXanQZAHuCiSOYjLNZRg",
    authDomain: "african-proverbs-d0430.firebaseapp.com",
    projectId: "african-proverbs-d0430",
    storageBucket: "african-proverbs-d0430.appspot.com",
    messagingSenderId: "1043056508657",
    appId: "1:1043056508657:web:09d4c1f5ac042360a63350",
    measurementId: "G-DYK33SNYFC"
});

firebase.messaging();

firebase.messaging().setBackgroundMessageHandler((payload) => console.log('payload', payload));