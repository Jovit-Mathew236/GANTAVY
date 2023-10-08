'use client'
import React, { useState, useEffect } from 'react';
import styles from './Login.module.css';
import firebase from '../../../firebase/config';
import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    const [hasError, setHasError] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Initialize Firebase auth
        const auth = getAuth(firebase);

        // Listen for changes in authentication state
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                const userEmail = authUser.email;

                // Check if the user is authorized
                firebase.firestore().collection('admins').where('email', '==', userEmail).get()
                    .then((querySnapshot) => {
                        if (!querySnapshot.empty) {
                            console.log('Logged in user:', authUser);

                            // Update the user state
                            setUser(authUser);

                            router.push('/');
                        } else {
                            console.error('User is not authorized.');
                            setHasError(true);
                            setTimeout(() => {
                                setHasError(false);
                            }, 3000);
                        }
                    })
                    .catch((error) => {
                        console.error('Error checking email in admins collection:', error);
                    });
            } else {
                // User is not logged in, clear the user state
                setUser(null);
            }
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, [router]);

    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(firebase);

        signInWithPopup(auth, provider)
            .catch((error) => {
                console.error('Google Sign-In Error:', error);
            });
    };

    return (
        <div className={styles.loginPage}>
            {hasError &&
                <div className="error_message flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Sorry!</span> You are not allowed to authorize
                    </div>
                </div>
            }
            <p className={styles.log}></p>
            <div className={styles.loginContainer}>
                <button onClick={handleGoogleSignIn}>
                    <p></p>
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
