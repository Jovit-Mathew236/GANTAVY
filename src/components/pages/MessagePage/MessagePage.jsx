'use client'
import React, { useState, useEffect } from 'react'
import styles from './Message.module.css'
import Send from '../../atom/svgs/Send'
import Message from '../../atom/svgs/Message'
import firebase from '../../../firebase/config'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Loading from '../../molecules/Loading'
import { useCallback } from 'react'
import CheckAuth from '@/src/firebase/auth'

const MessagePage = () => {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const authCallback = useCallback((user) => {
    setUser(user);
  }, []);


  useEffect(() => {
    firebase.firestore().collection('notifications').where('recipient', '==', 'all').orderBy('sendAt', 'desc').get().then((snapshot) => {
      const allDocs = snapshot.docs.map((infos) => {
        return {
          ...infos.data(),
          id: infos.id,
        };
      });
      setNotification(allDocs);
    }).then(() => {
      setLoading(false);
    })
  }, []);

  return (
    <div className={styles.messagePage}>
      <CheckAuth callback={authCallback} />
      {loading && <Loading />}

      <input className={styles.msgHeading} type="text" id="msgHeading" name="msgHeading" placeholder='Heading' autoComplete="off" required onChange={(e) => {
        setTitle(e.target.value)
      }} />
      <div className={styles.msgInput}>
        <input type="text" id="msgText" name="msgText" placeholder='Message' autoComplete="off" required onChange={(e) => {
          setMessage(e.target.value)
        }} />
        <button
          onClick={() => {
            // validation
            if (title.trim() === '' || message.trim() === '') {
              setHasError(true);
              return;
            }
            firebase.firestore().collection('notifications').add({
              title,
              message,
              recipient: "all",
              messageStatus: false,
              sendAt: new Date(),
              sender: "admin",
              // time: Date.now()
            }).then(() => {
              const currentDate = Date.now();
              setTitle('')
              setMessage('')
              setNotification([{
                title,
                message,
                recipient: "all",
                messageStatus: false,
                sendAt: {
                  seconds: Math.floor(currentDate / 1000),
                  nanoseconds: (currentDate % 1000) * 1000000,
                },
                sender: "admin",
                // time: Date.now()
              }, ...notification])
            })
          }}
        >
          <p>Send</p>
          <Send />
        </button>
      </div>
      <div className={styles.messages}>
        <h1>Old Messages</h1>
        <div className={styles.msgContainer}>

          {
            notification.map((msg, index) => {
              const milliseconds = msg.sendAt.seconds * 1000;
              const date = new Date(milliseconds);

              const day = date.getDate();
              const month = date.toLocaleString('en-US', { month: 'long' });
              const year = date.getFullYear();

              const formattedDate = `${day} ${month} ${year}`;
              return (
                <div className={styles.msgBox}>
                  <p className={styles.date}><Message /> {formattedDate}</p>
                  <div>
                    <h2>{msg.title}</h2>
                    <p>{msg.message}</p>
                  </div>
                </div>
              )
            })
          }

        </div>
      </div>
    </div>
  )
}

export default MessagePage