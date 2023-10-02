'use client'
import React from 'react'
import styles from './Help.module.css'

const HelpPage = () => {
  const userName = localStorage.getItem('user_name');
  return (
    <div className={styles.helpPage}>
      <p className={styles.img} ></p>
      <h1>{userName}</h1>
      <h2>We would like to hear suggestions</h2>

      <div className={styles.btnS}>
        <button className={styles.btn}>Mail us</button>
        <button className={styles.btn}>Call Us</button>
      </div>

      <p className={styles.company}>Oronium Innovations</p>
    </div>
  )
}

export default HelpPage