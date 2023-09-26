'use client'
import React, { useState } from 'react'
import styles from './Application.module.css'
import Topnav from '../../molecules/Topnav'
import BottomIcon from '../../molecules/BottomIcon'
import New from '../../atom/svgs/New'
import RightArrow from '../../atom/svgs/RightArrow'

const ApplicationDetails = () => {
  const [popUp, setPopUp] = useState(false);
  const handleCancelClick = () => {
    setPopUp(false);
  };
  return (
    <div className={styles.applicationDetails}>
      <Topnav />
      <BottomIcon setPopUp={setPopUp} icon={<New />} text={"Add stage"} />

      {popUp && <div className={styles.addClientPopUp}>
        <div className={styles.popUpContainer}>



          <div className={styles.btnS}>
            <button onClick={handleCancelClick}>Cancel</button>
            <button>Save</button>
          </div>
        </div>
      </div>}

      <div className={styles.applicationDetailsContainer}>
        <select name="" id="">
          <option value="">Not Completed</option>
          <option value="">Completed</option>
        </select>

        <div className={styles.id}>#1234</div>

        <h1>Education Visa</h1>
        <h1>Canada</h1>

        <p className={styles.paymentType}>Installment <span>5</span></p>

        <p className={styles.createdDate}>Created on september 29 2023</p>
      </div>

      <div className={styles.stageContainer}>
        <h1>Stages</h1>

        <div className={styles.stage}>
          <p className={styles.date}>date</p>
          <div className={styles.level}>
            <p>2</p>
          </div>
          <div>
            <h2>University verification</h2>
            <p className={styles.status}>Ongoing</p>
          </div>
          <a href='' >
            <RightArrow />
          </a>
        </div>

        <div className={styles.stage}>
          <p className={styles.date}>date</p>
          <div className={styles.level}>
            <p>1</p>
          </div>
          <div>
            <h2>University verification</h2>
            <p className={styles.status}>Ongoing</p>
          </div>
          <a href='' >
            <RightArrow />
          </a>
        </div>

      </div>
      

    </div>
  )
}

export default ApplicationDetails