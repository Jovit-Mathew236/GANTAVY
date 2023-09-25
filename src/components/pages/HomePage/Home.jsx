'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import SearchBar from '../../molecules/SearchBar'
import styles from './Home.module.css'
import RightArrow from '../../atom/svgs/RightArrow'
import Add from '../../atom/svgs/Add'
import BottomIcon from '../../molecules/BottomIcon'
import firebase from '../../../firebase/config'
import { getAuth, onAuthStateChanged } from 'firebase/auth';


function HomePage() {
  const [popUp, setPopUp] = useState(false)
  const [clients, setClients] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleCancelClick = () => {
    setPopUp(false);
  };


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
      firebase
        .firestore()
        .collection('clients')
        .get()
        .then((snapshot) => {
          const allDocs = snapshot.docs.map((infos) => {
            return {
              ...infos.data(),
              id: infos.id,
            };
          });

          // Group and sort the clients by month and year
          const groupedClients = allDocs.reduce((acc, client) => {
            const date = new Date(client.addedAt.seconds * 1000);
            const year = date.getFullYear();
            const month = date.toLocaleString('en-US', { month: 'long' });

            const key = `${month} ${year}`;
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(client);
            return acc;
          }, {});

          // Sort the grouped data by year and month
          const sortedGroupedClients = Object.keys(groupedClients).sort((a, b) => {
            const dateA = new Date(a);
            const dateB = new Date(b);
            return dateA - dateB;
          });

          const finalData = sortedGroupedClients.reduce((acc, key) => {
            acc[key] = groupedClients[key];
            return acc;
          }, {});

          setClients(finalData);
        });
    }, []);
    function generateClientID() {
      const min = 10000; // Minimum 5-digit number
      const max = 99999; // Maximum 5-digit number
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const newClientId = generateClientID().toString()

    return (
      <div className={styles.homePage}>
        <SearchBar />
        <BottomIcon setPopUp={setPopUp} icon={<Add />} text={"Add client"} />
        {popUp && <div className={styles.addClientPopUp}>
          <div className={styles.popUpContainer}>
            <div className={styles.popUpFields}>
              <label htmlFor="">Client full name</label>
              <input type="text" id="" name='email' placeholder="Name" onChange={(e) => {
                setName(e.target.value)
              }} />
            </div>
            <div>
              <label htmlFor="">Email</label>
              <input type="text" id="" name='email' placeholder="example@gmail.com" onChange={(e) => {
                setEmail(e.target.value)
              }} />
            </div>
            <div>
              <label htmlFor="">Phone number</label>
              <input type="text" id="" name='email' placeholder="+91 1234567890" onChange={(e) => {
                setPhone(e.target.value)
              }} />
            </div>
            <div className={styles.btnS}>
              <button onClick={handleCancelClick}>Cancel</button>
              <button onClick={() => {
                firebase.firestore().collection('clients').doc(newClientId).set({
                  name,
                  email,
                  phone,
                  clientId: newClientId,
                  addedAt: new Date()
                }).then(() => {
                  console.log('Client added');
                });

              }} >Save</button>
            </div>
          </div>
        </div>}

        <section>
          {
            Object.entries(clients).map(([monthYear, clientData], i) => {
              return (
                <div key={i}>
                  <p>{monthYear}</p>
                  <div className={styles.cardsContainer}>
                    {
                      clientData.map((client, j) => {
                        const milliseconds = client.addedAt.seconds * 1000;
                        const date = new Date(milliseconds);

                        const day = date.getDate();
                        const month = date.toLocaleString('en-US', { month: 'long' });
                        const year = date.getFullYear();

                        const formattedDate = `${day} ${month} ${year}`;

                        return (
                          <div key={j} className={styles.card}>
                            <div className={styles.cardTopSection}>
                              <p className={styles.id}>#{client.clientId}</p>
                              <p className={styles.date}>{formattedDate}</p>
                            </div>
                            <div className={styles.cardMainSection}>
                              <p>{client.name}</p>
                              <p>{client.email}</p>
                            </div>
                            <div className={styles.cardBottomSection}>
                              <div className={styles.countries}>
                                <p className={styles.country}>in</p>
                                <p className={styles.country}>au</p>
                                <p className={styles.country}>in</p>
                              </div>
                              <a href={`/client-details?id=${client.clientId}`}>
                                <RightArrow />
                              </a>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </section>


      </div>
    )
  }

export default HomePage