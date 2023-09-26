import React from 'react'
import styles from './molecules.module.css'
import Back from '../atom/svgs/Back'
import Edit2 from '../atom/svgs/Edit2'
import Delete2 from '../atom/svgs/Delete2'

const Topnav = () => {
    return (
        <div className={styles.topnav}>
            <p onClick={
                () => {
                    window.history.back()
                }
            }><Back /> </p>
            <div className={styles.btns}>
                <p><Edit2 /></p>
                <p><Delete2 /></p>
            </div>
        </div>
    )
}

export default Topnav