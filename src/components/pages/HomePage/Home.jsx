import React from 'react'
import SearchBar from '../../molecules/SearchBar'
import styles from './Home.module.css'
import RightArrow from '../../atom/svgs/RightArrow'
import AddClient from '../../molecules/AddClient'

function HomePage() {
  return (
    <div className={styles.homePage}>
      <SearchBar />
      <AddClient />
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
              <p>
                <RightArrow />
              </p>
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
              <p>
                <RightArrow />
              </p>
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
              <p>
                <RightArrow />
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default HomePage