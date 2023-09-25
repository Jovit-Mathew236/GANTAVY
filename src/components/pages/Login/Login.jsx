'use client'
import React from 'react';
import styles from './Login.module.css';
import firebase from '../../../firebase/config';
import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();

    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(firebase);

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log('Logged in user:', user);
                localStorage.setItem('user_photoURL', user.photoURL);
                router.push('/');
            })
            .catch((error) => {
                console.error('Google Sign-In Error:', error);
            });
    };

    return (
        <div className={styles.loginPage}>
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
