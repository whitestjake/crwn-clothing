
import { initializeApp } from 'firebase/app';

import { 
        getAuth, signInWithPopup, 
        GoogleAuthProvider
            } from 'firebase/auth';

import { 
    getFirestore, doc, getDoc, setDoc
 } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyA0-bA2fuAd-H_FVX7dm1-u0ZiIulR4YUE",
    authDomain: "white-crwn-clothing.firebaseapp.com",
    projectId: "white-crwn-clothing",
    storageBucket: "white-crwn-clothing.appspot.com",
    messagingSenderId: "520133473054",
    appId: "1:520133473054:web:2932deacb7e2bad6078f0f"
  };

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => 
        signInWithPopup(auth, googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch(error){
            console.log('error creating user', error.message)
        }
    }
    return userDocRef;
}

