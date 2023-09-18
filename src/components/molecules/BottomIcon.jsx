'use client'
import React, { useState } from 'react'
import styles from './molecules.module.css'

const BottomIcon = ({ setPopUp, icon, text }) => {
    // const [popUp, setPopUp] = useState(false)
    return (
        <div className={styles.addClientBtn} onClick={() => { setPopUp(true) }}>
            {icon}
            <p>{text}</p>
        </div>
    )
}

export default BottomIcon