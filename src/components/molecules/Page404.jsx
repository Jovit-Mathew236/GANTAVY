import React from 'react'
import styles from './molecules.module.css'

const Page404 = ({ errMessage }) => {
  return (
    <div className={styles.errContainer}>
      <p className={styles.err}></p>
      <p className={styles.errMessage}><span>Oops!</span>
        <br />
        {errMessage}
      </p>
    </div>
  )
}

export default Page404