'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './ClientDetails.module.css';
import firebase from '../../../firebase/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Loading from '../../molecules/Loading';
import Topnav from '../../molecules/Topnav';
import BottomIcon from '../../molecules/BottomIcon';
import New from '../../atom/svgs/New';
import SendBlack from '../../atom/svgs/SendBlack';
import RightArrow from '../../atom/svgs/RightArrow';
import AddApplicationPopUp from '../../organisms/PopUps/AddApplicationPopUp';
import AddClientPopUp from '../../organisms/PopUps/AddClientPopUp';
import { countryData } from '../../molecules/Countries';
import Edit2 from '../../atom/svgs/Edit2';
import Delete2 from '../../atom/svgs/Delete2';
import { MdEdit } from 'react-icons/md'
import Delete3 from '../../atom/svgs/Delete3';

// Component for rendering a single notification
function Notification({ data }) {
  const formattedDate = new Date(data.sendAt.seconds * 1000).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={styles.message}>
      <p className={styles.date}>{formattedDate}</p>
      <div className={styles.body}>
        <h2>{data.title}</h2>
        <p>{data.message}</p>
      </div>
      {data.length !== 0 ? <hr /> : null}
    </div>
  );
}

// Component for rendering a single application
function Application({ data }) {
  const formattedDate = new Date(data.createdAt.seconds * 1000).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={styles.application}>
      <div className={styles.applicationHeader}>
        <div className={styles.idAndNotification}>
          <p className={styles.id}>#{data.applicationId}</p>
          <p></p>
        </div>
        <p className={styles.date}>{formattedDate}</p>
      </div>
      <div className={styles.applicationBody}>
        <h3 className={styles.country}>
          {countryData[data.country].name}
          <p className={styles.countryIcon}>
            <img
              width="15"
              height="15"
              src={`https://img.icons8.com/emoji/48/${countryData[data.country].name.split(' ').join('-').toLowerCase()}-emoji.png`}
              alt={`${data.country}-emoji`}
            />
          </p>
        </h3>
        <p className={styles.visaType}>{data.visatype}</p>
      </div>
      <div className={styles.applicationFooter}>
        <p className={styles.paymentType}>
          {data.paymenttype}
          {
            data.paymenttype.toLowerCase() === 'installment' && (
              <span className={styles.installment}>
                {data.installment}
              </span>
            )
          }
        </p>
        <a href={`/client-details/application?id=${data.applicationId}`}>
          <RightArrow />
        </a>
      </div>
    </div>
  );
}

const ClientDetailsPage = () => {
  const [popUp, setPopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [editClientPopUp, setEditClientPopUp] = useState(false);
  const [country, setCountry] = useState('');
  const [visa, setVisa] = useState('');
  const [paymentType, setPaymentType] = useState('upfront'); // Default to 'upfront'
  const [installment, setInstallment] = useState(0);
  const [clientDetails, setClientDetails] = useState(null);
  const [clientApplicationDetails, setClientApplicationDetails] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState([]);
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('');
  const [hasError, setHasError] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const id = parseInt(searchParams.get('id'));
  const [disable, setDisable] = useState(false)


  const handleCancelClick = () => {
    setPopUp(false);
  };

  const generateApplicationID = () => {
    const min = 10000; // Minimum 5-digit number
    const max = 99999; // Maximum 5-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const fetchClientDetails = async (clientId) => {
    try {
      const snapshot = await firebase
        .firestore()
        .collection('clients')
        .where('clientId', '==', clientId)
        .get();
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const clientsWithCountries = await Promise.all(
        data.map(async (doc) => {
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

      setClientDetails(clientsWithCountries[0]);
    } catch (error) {
      console.error('Error fetching client details: ', error);
    }
  };

  const fetchNotifications = (clientId) => {
    firebase.firestore()
      .collection('notifications')
      .where('recipient', '==', clientId)
      .get()
      .then((snapshot) => {
        const allDocs = snapshot.docs.map((infos) => ({
          ...infos.data(),
          id: infos.id,
        }));
        const sorted = allDocs.sort((a, b) => b.sendAt - a.sendAt);
        setNotification(sorted);
      })
      .catch((error) => {
        console.error('Error fetching notifications: ', error);
      });
  };

  const fetchClientApplicationDetails = (clientId) => {
    firebase.firestore()
      .collection('applications')
      .where('clientid', '==', clientId)
      .orderBy('createdAt', 'desc')
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClientApplicationDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching client application details: ', error);
      });
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
    if (id && id !== '') {
      fetchClientDetails(id);
      fetchNotifications(id);
      fetchClientApplicationDetails(id);
    }
  }, [id]);

  const handleSendClick = () => {
    // validation
    if (title.trim() === '' || message.trim() === '') {
      setHasError(true);
      return;
    }
    const currentDate = Date.now();
    firebase.firestore().collection('notifications').add({
      title,
      message,
      recipient: id,
      messageStatus: false,
      sendAt: new Date(),
      sender: "admin",
    }).then(() => {
      setTitle('');
      setMessage('');
      setNotification((prev) => [
        {
          title,
          message,
          recipient: id,
          messageStatus: false,
          sendAt: {
            seconds: Math.floor(currentDate / 1000),
            nanoseconds: (currentDate % 1000) * 1000000,
          },
          sender: "admin",
        },
        ...prev,
      ]);
    });
  };

  const handleSaveClick = () => {
    setDisable(true)
    // validation
    if (country.trim() === '' || visa.trim() === '') {
      setHasError(true);
      setDisable(false)
      setTimeout(() => {
        setHasError(false);
      }, 3000);
      return;
    }
    // create a new application and check if there is an existing application with the same id
    let newApplicationID;
    do {
      newApplicationID = generateApplicationID();
    } while (clientApplicationDetails.some((data) => data.applicationId === newApplicationID));
    firebase.firestore().collection('applications').add({
      applicationId: newApplicationID,
      country,
      visatype: visa,
      paymenttype: paymentType,
      installment,
      clientid: id,
      createdAt: new Date(),
      completed: false,
    })
      .then((docRef) => {
        const currentDate = Date.now();
        setClientApplicationDetails((prev) => {
          return [
            {
              applicationId: newApplicationID,
              id: docRef.id,
              country,
              visatype: visa,
              paymenttype: paymentType,
              installment: parseInt(installment),
              clientid: id,
              createdAt: {
                seconds: Math.floor(currentDate / 1000),
                nanoseconds: (currentDate % 1000) * 1000000,
              }
            },
            ...prev,
          ];
        });
        setDisable(false)
        setPopUp(false);
      })
      .catch((error) => {
        console.error('Error adding application: ', error);
      });
  }

  const handleEditClient = (clientData) => {
    firebase.firestore().collection('clients').doc(clientDetails.id).update({
      ...clientData,
    })
      .then(() => {
        setClientDetails((prev) => {
          return {
            ...prev,
            ...clientData,
          };
        });
        setEditClientPopUp(false);
      })
      .catch((error) => {
        console.error('Error adding client data: ', error);
      });
  };

  return (
    <div className={styles.clientDetailsPage}>
      {loading && <Loading />}
      <Topnav id={id} collection={"clients"} where={'clientId'} setEditClientPopUp={setEditClientPopUp} deletion={"Client"} isBtn={false} />
      <BottomIcon setPopUp={setPopUp} icon={<New />} text={"Add new"} />

      {popUp && (
        <AddApplicationPopUp
          setCountry={setCountry}
          setVisa={setVisa}
          paymentType={paymentType}
          setPaymentType={setPaymentType}
          setInstallment={setInstallment}
          handlePaymentTypeChange={handlePaymentTypeChange}
          handleCancelClick={handleCancelClick}
          handleSaveClick={handleSaveClick}
          hasError={hasError}
          disable={disable}
        />
      )}

      {deletePopUp && (
        <div className={styles.popUp}>
          <div className={styles.popUpContainer}>
            <h1>Are you sure you want to delete this client?</h1>
            <div className={styles.btns}>
              <button
                onClick={() => {
                  setDeletePopUp(false);
                }}
              >
                No
              </button>
              <button
                onClick={async () => {
                  try {
                    // Delete all applications of the client
                    for (const data of clientApplicationDetails) {
                      await firebase.firestore().collection('applications').doc(data.id).delete();
                    }

                    // Delete the client after all applications have been deleted
                    await firebase.firestore().collection('clients').doc(clientDetails.id).delete();

                    // Once everything is deleted successfully, navigate to the desired location
                    router.push('/');
                  } catch (error) {
                    console.error('Error deleting data: ', error);
                    setHasError(true);
                  }
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {
        editClientPopUp && (
          <AddClientPopUp
            setPopUp={setEditClientPopUp}
            onSave={handleEditClient} // Pass the onSave function
            id={id}
          />
        )
      }
      <div className={styles.detailsContainer}>
        <div className={styles.detailsHeader}>
          <p className={styles.id}>#ID{clientDetails && clientDetails.clientId}</p>
          <h1>{clientDetails && clientDetails.name}</h1>
          <p className={styles.email}>{clientDetails && clientDetails.email}</p>
          <p className={styles.phone}>{clientDetails && clientDetails.phone}</p>
          <div className={styles.countries}>
            {
              clientDetails && clientDetails.country.map((country, k) => {
                return (
                  <p key={k} className={styles.country}>
                    <img width="20" height="20" src={`https://img.icons8.com/emoji/48/${countryData[country].name.split(' ').join('-').toLowerCase()}-emoji.png`} alt="united-states-emoji" />
                  </p>
                )
              })
            }
          </div>
          <div className={styles.buttons}>
            <button
              onClick={() => {
                setEditClientPopUp(true);
              }}
            >
              <MdEdit />
              Edit Profile
            </button>
            <button
              onClick={() => {
                setDeletePopUp(true);
              }}
            >
              <Delete3 />
              Delete Profile
            </button>
          </div>
        </div>
        <hr />
        <div className={styles.messageSection}>
          <div className={styles.messageHeader}>
            <input
              type="text"
              placeholder='Caption'
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
            <input
              type="text"
              placeholder='Message'
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
              }}
            />
            <button
              onClick={handleSendClick}
            >
              Send <SendBlack />
            </button>
          </div>

          <div className={styles.messageBody}>
            {
              notification.length !== 0 ? notification.map((data, i) => (
                <Notification key={i} data={data} />
              )) : <div className={styles.errContainer}>
                {/* <p className={styles.err}></p> */}
                <p className={styles.errMessage}><span>Oops!</span>
                  <br />
                  no records found.</p>
              </div>

            }
          </div>
        </div>
      </div>

      <div className={styles.applicationContainer}>
        <h1>Applications</h1>
        <div className={styles.applications}>
          {
            clientApplicationDetails.length !== 0 ?
              clientApplicationDetails.map((data, i) => (
                <Application key={i} data={data} />
              ))
              : <div className={styles.errContainer}>
                <p className={styles.err}></p>
                <p className={styles.errMessage}><span>Oops!</span>
                  <br />
                  no records found.</p>
              </div>
          }
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsPage