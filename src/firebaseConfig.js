import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAE8FpZ7u8dwTynyxX8y7v9HOgsY1fiVjI',
  authDomain: 'vending-machine-notification.firebaseapp.com',
  databaseURL:
    'https://vending-machine-notification-default-rtdb.firebaseio.com',
  projectId: 'vending-machine-notification',
  storageBucket: 'vending-machine-notification.appspot.com',
  messagingSenderId: '172584155600',
  appId: '1:172584155600:web:9c255c5f67db8f14ab21d5'
}

const fire = firebase.initializeApp(firebaseConfig)

export default fire
