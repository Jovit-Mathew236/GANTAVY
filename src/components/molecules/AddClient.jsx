import React from 'react'
import Add from '../atom/svgs/Add'
import styles from './molecules.module.css'

const AddClient = () => {
    return (
        <div className={styles.addClientBtn}>
            <Add />
            <p>Add Client</p>
        </div>
    )
}

export default AddClient