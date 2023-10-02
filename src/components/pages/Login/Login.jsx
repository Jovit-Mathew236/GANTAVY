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
            {hasError && <p className={styles.error}>Sorry you are not allowed to login</p>}
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
