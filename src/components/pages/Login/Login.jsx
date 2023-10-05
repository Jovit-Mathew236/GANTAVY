'use client'
import React, { useState } from 'react';
import styles from './Login.module.css';
import firebase from '../../../firebase/config';
import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    const [hasError, setHasError] = useState(false)

    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(firebase);

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const userEmail = user.email;

                firebase.firestore().collection('admins').where('email', '==', userEmail).get()
                    .then((querySnapshot) => {
                        if (!querySnapshot.empty) {
                            console.log('Logged in user:', user);
                            localStorage.setItem('user_photoURL', user.photoURL);
                            localStorage.setItem('user_name', user.displayName);
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
            })
            .catch((error) => {
                console.error('Google Sign-In Error:', error);
            });
    };


    return (
        <div className={styles.loginPage}>
            {hasError &&
                <div class="error_message flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                    <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span class="sr-only">Info</span>
                    <div>
                        <span class="font-medium">Sorry!</span> You are not allowed to authorize
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
