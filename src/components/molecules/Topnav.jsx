import React from 'react'
import styles from './molecules.module.css'

const Topnav = () => {
    return (
        <div className={styles.topnav}>
            <p>back</p>
            <div className={styles.btns}>
                <p>edit</p>
                <p>delete</p>
            </div>
        </div>
    )
}

export default Topnav