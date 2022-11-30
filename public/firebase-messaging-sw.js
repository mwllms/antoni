// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js')

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: 'AIzaSyBrJlxFx2As3fezJCf77HPiZNXiaalMJzQ',
  authDomain: 'antoni-1c644.firebaseapp.com',
  projectId: 'antoni-1c644',
  storageBucket: 'antoni-1c644.appspot.com',
  messagingSenderId: '435376409035',
  appId: '1:435376409035:web:d5dea7d6330752a28c0e4e',
  measurementId: 'G-ELTCEX9HM4',
}

firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
