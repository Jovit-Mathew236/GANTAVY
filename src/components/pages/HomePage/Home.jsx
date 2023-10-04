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
import Loading from '../../molecules/Loading';
import AddClientPopUp from '../../organisms/PopUps/AddClientPopUp';
import { countryData } from '../../molecules/Countries';


function HomePage() {
  const [popUp, setPopUp] = useState(false);
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState(null);
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('name');
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

  const generateClientID = () => {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterClients = (client) => {
    const query = searchQuery.toLowerCase();
    if (searchField === 'name') {
      return client.name.toLowerCase().includes(query);
    } else if (searchField === 'email') {
      return client.email.toLowerCase().includes(query);
    } else if (searchField === 'phone') {
      return client.phone && client.phone.toLowerCase().includes(query);
    }
    return false;
  };

  const handleCancelClick = () => {
    setPopUp(false);
  };

  const fetchClients = async () => {
    try {
      const snapshot = await firebase.firestore().collection('clients').get();
      const allDocs = snapshot.docs.map((infos) => ({
        ...infos.data(),
        id: infos.id,
      }));

      const allDocsWithCountries = await Promise.all(
        allDocs.map(async (doc) => {
          const snapshot = await firebase
            .firestore()
            .collection('applications')
            .where('clientid', '==', doc.clientId)
            .get();
          const allDocs = snapshot.docs.map((infos) => ({
            ...infos.data(),
            id: infos.id,
          }));
          const countries = allDocs.map((doc) => doc.country);
          return { ...doc, country: countries };
        })
      );

      const groupedClients = allDocsWithCountries.reduce((acc, client) => {
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
      setLoading(false);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSaveClient = (clientData) => {
    const newClientId = generateClientID();
    firebase
      .firestore()
      .collection('clients')
      .add({
        ...clientData,
        clientId: newClientId,
        addedAt: new Date(),
      })
      .then(() => {
        const currentDate = Date.now();
        setClients((prev) => {
          const month = new Date().toLocaleString('en-US', { month: 'long' });
          const year = new Date().getFullYear();
          const key = `${month} ${year}`;
          return {
            ...prev,
            [key]: [
              ...prev[key],
              {
                ...clientData,
                clientId: newClientId,
                addedAt: {
                  seconds: Math.floor(currentDate / 1000),
                  nanoseconds: (currentDate % 1000) * 1000000,
                },
              },
            ],
          };
        });
      })
      .catch((error) => {
        console.error('Error adding client data: ', error);
      });
  };
  let anyFilteredData = false;

  const formatDate = (date) => {
    return new Date(date.seconds * 1000).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  return (
    <div className={styles.homePage}>
      {loading && <Loading />}
      <SearchBar
        searchQuery={searchQuery}
        searchField={searchField}
        onSearchFieldChange={handleSearchFieldChange}
        onSearchQueryChange={handleSearchQueryChange}
      />
      <BottomIcon setPopUp={setPopUp} icon={<Add />} text={"Add client"} />

      {popUp && (
        <AddClientPopUp
          setPopUp={setPopUp}
          onSave={handleSaveClient} // Pass the onSave function
        />
      )}

      <section>
        {

          Object.entries(clients).map(([monthYear, clientData], i) => {
            // Filter the clientData based on the search criteria here
            const filteredClientData = clientData.filter(filterClients);
            if (filteredClientData.length > 0) {
              anyFilteredData = true;
            }
            return (
              filteredClientData.length > 0 ? (
                <div key={i}>
                  <>
                    <p className={styles.monthYear}>{monthYear}</p>
                    <div className={styles.cardsContainer}>
                      {filteredClientData.map((client, j) => {

                        // console.log(client.country);
                        return (
                          <div key={j} className={styles.card}>
                            <div className={styles.cardTopSection}>
                              <p className={styles.id}>#ID{client.clientId}</p>
                              <p className={styles.date}>{formatDate(client.addedAt)}</p>
                            </div>
                            <div className={styles.cardMainSection}>
                              <p>{client.name}</p>
                              <p>{client.email}</p>
                            </div>
                            <div className={styles.cardBottomSection}>
                              <div className={styles.countries}>
                                {client.country && client.country.map((country, k) => {
                                  return (
                                    <p key={k} className={styles.country}>
                                      <img width="20" height="20" src={`https://img.icons8.com/emoji/48/${countryData[country].name.split(' ').join('-').toLowerCase()}-emoji.png`} alt="united-states-emoji" />
                                    </p>
                                  )
                                })}
                              </div>
                              <a href={`/client-details?id=${client.clientId}`}>
                                <RightArrow />
                              </a>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </>
                </div>
              ) : null
            );
          })
        }
        {!anyFilteredData && (
          <div className={styles.errContainer}>
            <p className={styles.err}></p>
            <p className={styles.errMessage}><span>Oops!</span>
              <br />
              no records found.</p>
          </div>
        )}
      </section>


    </div>
  )
}

export default HomePage