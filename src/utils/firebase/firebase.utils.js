
import { initializeApp } from 'firebase/app';

import { 
        getAuth, signInWithPopup, 
        GoogleAuthProvider //signInWithRedirect
            } from 'firebase/auth';




const firebaseConfig = {
    apiKey: "AIzaSyA0-bA2fuAd-H_FVX7dm1-u0ZiIulR4YUE",
    authDomain: "white-crwn-clothing.firebaseapp.com",
    projectId: "white-crwn-clothing",
    storageBucket: "white-crwn-clothing.appspot.com",
    messagingSenderId: "520133473054",
    appId: "1:520133473054:web:2932deacb7e2bad6078f0f"
  };

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

