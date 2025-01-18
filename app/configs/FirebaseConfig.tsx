// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: "ai-logo-maker-a8e54.firebaseapp.com",
	projectId: "ai-logo-maker-a8e54",
	storageBucket: "ai-logo-maker-a8e54.firebasestorage.app",
	messagingSenderId: "868941364361",
	appId: "1:868941364361:web:1988b76dfbcb833a875a58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
