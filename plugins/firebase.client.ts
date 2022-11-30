// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getMessaging } from 'firebase/messaging'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBrJlxFx2As3fezJCf77HPiZNXiaalMJzQ',
  authDomain: 'antoni-1c644.firebaseapp.com',
  projectId: 'antoni-1c644',
  storageBucket: 'antoni-1c644.appspot.com',
  messagingSenderId: '435376409035',
  appId: '1:435376409035:web:d5dea7d6330752a28c0e4e',
  measurementId: 'G-ELTCEX9HM4',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const messaging = getMessaging(app)

export default defineNuxtPlugin((NuxtApp) => {
  //
})
