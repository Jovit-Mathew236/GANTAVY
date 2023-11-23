'use client'
import React, { useEffect, useState } from 'react'
import SearchBar from '../../molecules/SearchBar'
import styles from './Home.module.css'
import Add from '../../atom/svgs/Add'
import BottomIcon from '../../molecules/BottomIcon'
import firebase from '../../../firebase/config'
import Loading from '../../molecules/Loading';
import AddClientPopUp from '../../organisms/PopUps/AddClientPopUp';
import Card from '../../organisms/Card/Card';
import Page404 from '../../molecules/Page404'
import CheckAuth from '@/src/firebase/auth'
import { useCallback } from 'react'


function HomePage() {
  const [popUp, setPopUp] = useState(false);
  const [clients, setClients] = useState({});
  const [user, setUser] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('name');
  const [loading, setLoading] = useState(true);

  const authCallback = useCallback((user) => {
    setUser(user);
  }, []);

  const generateClientID = () => {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.value);
    console.log(e.target.value);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterClients = (client) => {
    const query = searchQuery.toLowerCase();
    switch (searchField) {
      case 'name':
        return client.name.toLowerCase().includes(query);
      case 'email':
        return client.email.toLowerCase().includes(query);
      case 'phone':
        return client.phone && client.phone.toLowerCase().includes(query);
      case 'year':
        const year = new Date(client.addedAt.seconds * 1000).getFullYear();
        return year.toString().includes(query);
      case 'month':
        const month = new Date(client.addedAt.seconds * 1000).toLocaleString('en-US', { month: 'long' });
        return month.toLowerCase().includes(query);
      default:
        return false;
    }
  };

  const fetchClients = async () => {
    try {
      const snapshot = await firebase.firestore().collection('clients').orderBy('addedAt', 'desc').get();
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

      setClients(groupedClients);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSaveClient = (clientData) => {
    let newClientId;
    let isIDUnique = false;

    do {
      newClientId = generateClientID();
      // Check if the generated ID already exists in any client data array
      isIDUnique = !Object.values(clients).some((clientDataArray) =>
        clientDataArray.some((client) => client.clientId === newClientId)
      );
    } while (!isIDUnique);

    const currentDate = Date.now();
    const month = new Date().toLocaleString('en-US', { month: 'long' });
    const year = new Date().getFullYear();
    const key = `${month} ${year}`;

    // Capture the current state of clients before the firebase operation
    const currentClients = { ...clients };

    firebase
      .firestore()
      .collection('clients')
      .add({
        ...clientData,
        clientId: newClientId,
        addedAt: new Date(),
      })
      .then(() => {
        // Use the captured state in the setClients callback
        setClients((prev) => {
          return {
            ...prev,
            [key]: [
              {
                ...clientData,
                clientId: newClientId,
                addedAt: {
                  seconds: Math.floor(currentDate / 1000),
                  nanoseconds: (currentDate % 1000) * 1000000,
                },
              },
              ...prev[key],
            ],
          };
        });
      })
      .catch((error) => {
        console.error('Error adding client data: ', error);
      });
  };

  let anyFilteredData = false;
  return (
    <div className={styles.homePage}>
      <CheckAuth callback={authCallback} />
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
                        return (
                          <Card key={j} data={client} type="client" />
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
          <Page404 errMessage={"No records Found"} oops={true} />
        )}
      </section>


    </div>
  )
}

export default HomePage