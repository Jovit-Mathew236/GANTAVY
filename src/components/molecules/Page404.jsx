import React from 'react'
import styles from './molecules.module.css'

const Page404 = ({ errMessage, oops }) => {
  return (
    <div className={styles.errContainer}>
      <p className={styles.err}></p>
      <p className={styles.errMessage}>
        {oops && <span>Oops!</span>}
        <br />
        {errMessage}
      </p>
    </div>
  )
}

export default Page404