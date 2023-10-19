'use client'
import React, { useEffect, useState } from 'react';
import styles from './Help.module.css';
import firebase from '../../../firebase/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const HelpPage = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const auth = getAuth(firebase);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, you can access their display name
        setUserName(user.displayName || '');
      } else {
        // User is signed out
        setUserName('');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.helpPage}>
      <p className={styles.img}></p>
      <h1>{userName}</h1>
      <h2>We would like to hear suggestions</h2>

      <div className={styles.btnS}>
        <a href="mailto:oroniumtechnologies@gmail.com" className={styles.btn}>Mail us</a>
        <a href="https://wa.me/+919544517905" target='_blank' className={styles.btn}>Contact Us</a>
      </div>

      <p className={styles.company}>Oronium Innovations</p>
    </div>
  );
};

export default HelpPage;
