// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js')
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.3/workbox-sw.js')

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

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', () => self.clients.claim())

const { registerRoute } = workbox.routing
const { NetworkFirst, StaleWhileRevalidate, CacheFirst } = workbox.strategies
const { CacheableResponsePlugin } = workbox.cacheableResponse
const { ExpirationPlugin } = workbox.expiration

// Cache page navigations (html) with a Network First strategy
registerRoute(
  ({ request }) => {
    return request.mode === 'navigate'
  },
  new NetworkFirst({
    cacheName: 'pages',
    plugins: [new CacheableResponsePlugin({ statuses: [200] })],
  })
)

// Cache Web Manifest, CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
registerRoute(
  ({ request }) =>
    request.destination === 'manifest' ||
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  new StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [new CacheableResponsePlugin({ statuses: [200] })],
  })
)

// Cache images with a Cache First strategy
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      // 50 entries max, 30 days max
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 }),
    ],
  })
)
