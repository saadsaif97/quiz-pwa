importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js')
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js')

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
var firebaseConfig = {
  apiKey: 'AIzaSyDfih2FriJ-EhlRlDSDUHaBawDG1q6bces',
  authDomain: 'quiz-pwa-af1ec.firebaseapp.com',
  projectId: 'quiz-pwa-af1ec',
  storageBucket: 'quiz-pwa-af1ec.appspot.com',
  messagingSenderId: '559127726852',
  appId: '1:559127726852:web:443a9531ec945eb1381e51',
  measurementId: 'G-7E4B84Z8EK',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )
  // Customize notification here
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/itwonders-web-logo.png',
  }

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})
