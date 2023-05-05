import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, signOut,GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBOGqKldWEpWgquEGC9I1Jx8XbxJAwFxZ8",
    authDomain: "shop-page-410ed.firebaseapp.com",
    projectId: "shop-page-410ed",
    storageBucket: "shop-page-410ed.appspot.com",
    messagingSenderId: "767997266885",
    appId: "1:767997266885:web:388e91a8543af5fb60d9ac",
  };

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const database = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    const userDocument = doc(database, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocument);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocument, {
                display: displayName || additionalInformation,
                email,
                createdAt,
            });
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                console.log('An account with this email address already exists.');
            } else {
                console.log('Error creating user:', error.message);
            }
        }
    }

    return userDocument;
};

export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password) return;

    return await  createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password) return;

    return await  signInWithEmailAndPassword(auth, email, password);
};


export const signOutUser = async() => await signOut(auth);


export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback);
};