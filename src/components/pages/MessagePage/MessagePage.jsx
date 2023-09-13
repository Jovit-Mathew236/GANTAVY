import React from 'react'
import styles from './Message.module.css'
import Send from '../../atom/svgs/Send'
import Message from '../../atom/svgs/Message'

const MessagePage = () => {
  return (
    <div className={styles.messagePage}>
      <input className={styles.msgHeading} type="text" id="msgHeading" name="msgHeading" placeholder='Heading' autoComplete="off"/>
      <div className={styles.msgInput}>
        <input type="text"  id="msgText" name="msgText" placeholder='Message' autoComplete="off"/>
        <button>
          <p>Send</p>
          <Send />
        </button>
      </div>
      <div className={styles.messages}>
        <h1>Old Messages</h1>
        <div className={styles.msgContainer}>

          <div className={styles.msgBox}>
            <p className={styles.date}><Message /> 27 Aug 2022</p>
            <div>
              <h2>Happy onam</h2>
              <p>Message</p>
            </div>
          </div>

          <div className={styles.msgBox}>
            <p className={styles.date}><Message /> 27 Aug 2022</p>
            <div>
              <h2>Happy onam</h2>
              <p>Message</p>
            </div>
          </div>

          <div className={styles.msgBox}>
            <p className={styles.date}><Message /> 27 Aug 2022</p>
            <div>
              <h2>Happy onam</h2>
              <p>Message</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MessagePage