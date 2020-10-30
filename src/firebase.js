import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyDsulDyoIAIYMyznQTPHOi88Spfc1vlNkw",
        authDomain: "spotify-1f6c3.firebaseapp.com",
        databaseURL: "https://spotify-1f6c3.firebaseio.com",
        projectId: "spotify-1f6c3",
        storageBucket: "spotify-1f6c3.appspot.com",
        messagingSenderId: "440845232100",
        appId: "1:440845232100:web:663755e36c1b1fdbc809f1",
        measurementId: "G-S0M4CYVWMT"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };