import React from 'react'
import styles from './StageDetails.module.css'
import Topnav from '../../molecules/Topnav'

const StageDetails = () => {
    return (
        <div className={styles.StageDetailsPage}>
            <Topnav />

            <div className={styles.stageDetailsContainer}>
                <div className={styles.StageDetails}>
                    <h1>Resume upload</h1>
                    <p>upload your Resume</p>
                    <div className={styles.assetContainer}>
                    <p>No files available</p>
                    </div>
                    <select name="" id="">
                        <option value="">Reject</option>
                        <option value="">Approve</option>
                    </select>
                </div>

                <div className={styles.StageDetails}>
                    <h1>Resume upload</h1>
                    <p>upload your Resume</p>
                    <div className={styles.assetContainer}>
                        <p>No files available</p>
                    </div>
                    <select name="" id="">
                        <option value="">Reject</option>
                        <option value="">Approve</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default StageDetails