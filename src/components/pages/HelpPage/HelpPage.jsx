'use client'
import React, { useEffect, useState } from 'react';
import styles from './Help.module.css';
import CheckAuth from '@/src/firebase/auth';
import { useCallback } from 'react';

const HelpPage = () => {
  const [userName, setUserName] = useState('');

  const authCallback = useCallback((user) => {
    setUser(user);
  }, []);


  return (
    <div className={styles.helpPage}>
      <CheckAuth callback={authCallback} />
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
