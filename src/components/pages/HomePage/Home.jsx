'use client'
import React, { useState } from 'react'
import SearchBar from '../../molecules/SearchBar'
import styles from './Home.module.css'
import RightArrow from '../../atom/svgs/RightArrow'
import AddClient from '../../molecules/BottomIcon'
import Add from '../../atom/svgs/Add'
import BottomIcon from '../../molecules/BottomIcon'

function HomePage() {
  const [popUp, setPopUp] = useState(false)
  const handleCancelClick = () => {
    setPopUp(false);
  };
  return (
    <div className={styles.homePage}>
      <SearchBar />
      <BottomIcon setPopUp={setPopUp} icon={<Add />} text={"Add client"} />
      {popUp && <div className={styles.addClientPopUp}>
        <div className={styles.popUpContainer}>
          <div className={styles.popUpFields}>
            <label htmlFor="">Client full name</label>
            <input type="text" id="" name='email' placeholder="Name" autoComplete="email" />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input type="text" id="" name='email' placeholder="example@gmail.com" autoComplete="email" />
          </div>
          <div>
            <label htmlFor="">Phone number</label>
            <input type="text" id="" name='email' placeholder="+91 1234567890" autoComplete="email" />
          </div>
          <div className={styles.btnS}>
            <button onClick={handleCancelClick}>Cancel</button>
            <button>Save</button>
          </div>
        </div>
      </div>}

      <section>
        <p>March 2023</p>
        <div className={styles.cardsContainer}>

          <div className={styles.card}>
            <div className={styles.cardTopSection}>
              <p className={styles.id}>#1203</p>
              <p className={styles.date}>21 March 2023</p>
            </div>
            <div className={styles.cardMainSection}>
              <p>Martin T Varghese</p>
              <p>johnsnow@gmail.com</p>
            </div>
            <div className={styles.cardBottomSection}>
              <div className={styles.countries}>
                <p className={styles.country}>in</p>
                <p className={styles.country}>au</p>
                <p className={styles.country}>in</p>
              </div>
              <a href='/client-details' >
                <RightArrow />
              </a>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTopSection}>
              <p className={styles.id}>#1203</p>
              <p className={styles.date}>21 March 2023</p>
            </div>
            <div className={styles.cardMainSection}>
              <p>Martin T Varghese</p>
              <p>johnsnow@gmail.com</p>
            </div>
            <div className={styles.cardBottomSection}>
              <div className={styles.countries}>
                <p className={styles.country}>in</p>
                <p className={styles.country}>au</p>
                <p className={styles.country}>in</p>
              </div>
              <a>
                <RightArrow />
              </a>
            </div>
          </div>

        </div>
      </section>

      <section>
        <p>March 2023</p>
        <div className={styles.cardsContainer}>

          <div className={styles.card}>
            <div className={styles.cardTopSection}>
              <p className={styles.id}>#1203</p>
              <p className={styles.date}>21 March 2023</p>
            </div>
            <div className={styles.cardMainSection}>
              <p>Martin T Varghese</p>
              <p>johnsnow@gmail.com</p>
            </div>
            <div className={styles.cardBottomSection}>
              <div className={styles.countries}>
                <p className={styles.country}>in</p>
                <p className={styles.country}>au</p>
                <p className={styles.country}>in</p>
              </div>
              <a>
                <RightArrow />
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default HomePage