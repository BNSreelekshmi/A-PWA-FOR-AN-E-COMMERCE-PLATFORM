
const CACHE_NAME = 'pwa-shop-cache-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/cart.html',
    '/checkout.html',
    '/css/style.css',
    '/js/app.js',
    '/js/firebase.js',
    '/images/product1.jpeg',
    '/images/product2.jpeg',
    '/images/product3.jpeg',
    '/images/product4.png',
    '/images/product5.jpg',
    '/images/product6.jpg'

];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});

// Firebase background notifications
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon
    });
});