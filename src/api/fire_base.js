import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAh59eJqJ_hazs_7hiTRSE9jHbXjO-sYPI",
    authDomain: "fuegos-app.firebaseapp.com",
    projectId: "fuegos-app",
    storageBucket: "fuegos-app.appspot.com",
    messagingSenderId: "613725237362",
    appId: "1:613725237362:web:d11e7ff1fb7643a19412eb"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };