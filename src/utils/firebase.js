import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDK7zeVUEPESbfYHB2j_A8wYIeiElTLH8M",
  authDomain: "todo-64dc7.firebaseapp.com",
  databaseURL: "https://todo-64dc7.firebaseio.com",
  projectId: "todo-64dc7",
  storageBucket: "todo-64dc7.appspot.com",
  messagingSenderId: "1002549441557",
  appId: "1:1002549441557:web:27768e7058998a96b34a1c"
};

export default firebase.initializeApp(firebaseConfig);