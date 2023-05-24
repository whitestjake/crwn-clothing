
import { initializeApp } from 'firebase/app';

import { 
        getAuth, 
        signInWithPopup, 
        GoogleAuthProvider,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword
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

// eslint-disable-next-line no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => 
        signInWithPopup(auth, googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async(
        userAuth, 
        additionalInfo = {}
    ) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        } catch(error){
            console.log('error creating user', error.message)
        }
    }
    return userDocRef;
};


export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)

}

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)

}




