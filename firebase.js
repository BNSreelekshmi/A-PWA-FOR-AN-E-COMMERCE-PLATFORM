// File: js/firebase.js

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

Notification.requestPermission().then(permission => {
    if(permission === 'granted') {
        messaging.getToken({ vapidKey: 'YOUR_PUBLIC_VAPID_KEY' })
        .then(token => console.log('FCM Token:', token))
        .catch(err => console.error(err));
    }
});

messaging.onMessage(payload => {
    new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon
    });
});