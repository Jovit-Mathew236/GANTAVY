'use client'
import React, { useState, useEffect } from 'react'
import styles from './Message.module.css'
import Send from '../../atom/svgs/Send'
import Message from '../../atom/svgs/Message'
import firebase from '../../../firebase/config'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Loading from '../../molecules/Loading'

const MessagePage = () => {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const auth = getAuth(firebase);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
    });
  }, []);

  useEffect(() => {
    firebase.firestore().collection('notifications').get().then((snapshot) => {
      const allDocs = snapshot.docs.map((infos) => {
        return {
          ...infos.data(),
          id: infos.id,
        };
      });
      const sorted = allDocs.sort((a, b) => b.sendAt - a.sendAt);
      setNotification(sorted);
    }).then(() => {
      setLoading(false);
    })
  }, []);

  return (
    <div className={styles.messagePage}>
      {loading && <Loading />}

      <input className={styles.msgHeading} type="text" id="msgHeading" name="msgHeading" placeholder='Heading' autoComplete="off" onChange={(e) => {
        setTitle(e.target.value)
      }} />
      <div className={styles.msgInput}>
        <input type="text" id="msgText" name="msgText" placeholder='Message' autoComplete="off" onChange={(e) => {
          setMessage(e.target.value)
        }} />
        <button
          onClick={() => {
            firebase.firestore().collection('notifications').add({
              title,
              message,
              recipient: "all",
              messageStatus: false,
              sendAt: new Date(),
              sender: "admin",
              // time: Date.now()
            }).then(() => {
              setTitle('')
              setMessage('')
              setNotification([{
                title,
                message,
                recipient: "all",
                messageStatus: false,
                sendAt: new Date(),
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