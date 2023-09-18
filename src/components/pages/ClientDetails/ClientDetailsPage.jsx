import React from 'react'
import styles from './ClientDetails.module.css'
import SendBlack from '../../atom/svgs/SendBlack'
import RightArrow from '../../atom/svgs/RightArrow'
import New from '../../atom/svgs/New'
import BottomIcon from '../../molecules/BottomIcon'

const ClientDetailsPage = () => {
  return (
    <div className={styles.clientDetailsPage}>
      <BottomIcon icon={<New />} text={"Add new"} />
      <div className={styles.detailsContainer}>
        <div className={styles.detailsHeader}>
          <p className={styles.id}>#1203</p>
          <h1>Don Jose Mathew</h1>
          <p className={styles.email}>johnsnow@gmail.com</p>
          <p className={styles.phone}>+91 1234567890</p>
          <div className={styles.countries}>
            <p className={styles.country}>in</p>
            <p className={styles.country}>au</p>
            <p className={styles.country}>in</p>
          </div>
        </div>
        <hr />
        <div className={styles.messageSection}>
          <div className={styles.messageHeader}>
            <input type="text" placeholder='Caption' />
            <input type="text" placeholder='Message' />
            <button>Send  <SendBlack /></button>
          </div>
          <div className={styles.messageBody}>
            <div className={styles.message}>
              <p className={styles.date}> 27 Aug 2022</p>
              <div className={styles.body}>
                <h2>Application Approval</h2>
                <p>Hello Don, Your application is approved.</p>
              </div>
              <hr />
            </div>

            <div className={styles.message}>
              <p className={styles.date}> 27 Aug 2022</p>
              <div className={styles.body}>
                <h2>Application Approval</h2>
                <p>Hello Don, Your application is approved.</p>
              </div>
              <hr />
            </div>

            <div className={styles.message}>
              <p className={styles.date}> 27 Aug 2022</p>
              <div className={styles.body}>
                <h2>Application Approval</h2>
                <p>Hello Don, Your application is approved.</p>
              </div>
              <hr />
            </div>

          </div>
        </div>
      </div>

      <div className={styles.applicationContainer}>
        <h1>Applications</h1>
        <div className={styles.applications}>

          <div className={styles.application}>
            <div className={styles.applicationHeader}>
              <div className={styles.idAndNotification}>
                <p className={styles.id}>#1203</p>
                <p ></p>
              </div>
              <p className={styles.date}>21 March 2023</p>
            </div>
            <div className={styles.applicationBody}>
              <h3 className={styles.country}>Canada <p className={styles.countryIcon}>Ca</p></h3>
              <p className={styles.visaType}>Visiting Visa</p>
            </div>
            <div className={styles.applicationFooter}>
              <p className={styles.paymentType}>Installment <span>5</span></p>
              <a href='/' >
                <RightArrow />
              </a>
            </div>
          </div>

          <div className={styles.application}>
            <div className={styles.applicationHeader}>
              <div className={styles.idAndNotification}>
                <p className={styles.id}>#1203</p>
                <p></p>
              </div>
              <p className={styles.date}>21 March 2023</p>
            </div>
            <div className={styles.applicationBody}>
              <h3 className={styles.country}>Canada <p className={styles.countryIcon}>Ca</p></h3>
              <p className={styles.visaType}>Visiting Visa</p>
            </div>
            <div className={styles.applicationFooter}>
              <p className={styles.paymentType}>Installment <span>5</span></p>
              <a href='/' >
                <RightArrow />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientDetailsPage