'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './ClientDetails.module.css';
import firebase from '../../../firebase/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Loading from '../../molecules/Loading';
import Topnav from '../../molecules/Topnav';
import BottomIcon from '../../molecules/BottomIcon';
import New from '../../atom/svgs/New';
import SendBlack from '../../atom/svgs/SendBlack';
import RightArrow from '../../atom/svgs/RightArrow';

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
      <hr />
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
          {data.country}
          <p className={styles.countryIcon}>
            <img
              width="20"
              height="20"
              src={`https://img.icons8.com/emoji/48/${data.country.split(' ').join('-').toLowerCase()}-emoji.png`}
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
            data.paymenttype === 'installment' && (
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
  const [country, setCountry] = useState('');
  const [visa, setVisa] = useState('');
  const [paymentType, setPaymentType] = useState('upfront'); // Default to 'upfront'
  const [installment, setInstallment] = useState('');
  const [clientDetails, setClientDetails] = useState(null);
  const [clientApplicationDetails, setClientApplicationDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState([]);
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('');
  const [hasError, setHasError] = useState(false);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const id = parseInt(searchParams.get('id'));

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
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClientApplicationDetails(data);
      })
      .then(() => {
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
    // validation
    if (country.trim() === '' || visa.trim() === '') {
      setHasError(true);
      return;
    }
    const newApplicationID = generateApplicationID();
    firebase.firestore().collection('applications').add({
      applicationId: newApplicationID,
      country,
      visatype: visa,
      paymenttype: paymentType,
      installment,
      clientid: id,
      createdAt: new Date(),
    })
      .then((docRef) => {
        const currentDate = Date.now();
        setClientApplicationDetails((prev) => {
          return [
            ...prev,
            {
              applicationId: newApplicationID,
              id: docRef.id,
              country,
              visatype: visa,
              paymenttype: paymentType,
              installment,
              clientid: id,
              createdAt: {
                seconds: Math.floor(currentDate / 1000),
                nanoseconds: (currentDate % 1000) * 1000000,
              }
            },
          ];
        });
        setPopUp(false);
      })
      .catch((error) => {
        console.error('Error adding application: ', error);
      });
  }

  return (
    <div className={styles.clientDetailsPage}>
      {loading && <Loading />}
      <Topnav id={id} collection={"clients"} where={'clientId'} />
      <BottomIcon setPopUp={setPopUp} icon={<New />} text={"Add new"} />

      {popUp && (
        <div className={styles.addClientPopUp}>
          <div className={styles.popUpContainer}>
            <div className={styles.popUpFields}>
              <label htmlFor="">Country</label>
              <select name="" id="" onChange={(e) => {
                setCountry(e.target.value);
              }}>
                <option value="">Select Country</option>
                <option value="United States">United States of America</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
            <div>
              <label htmlFor="">Visa</label>
              <select name="" id="" onChange={(e) => {
                setVisa(e.target.value);
              }}>
                <option value="">Select Visa type</option>
                <option value="Education Visa">Education Visa</option>
                <option value="Visiting Visa">Visiting Visa</option>
                <option value="Education Visa">Education Visa</option>
                <option value="Work Visa">Work Visa</option>
                <option value="Student Visa">Student Visa</option>
                <option value="PR">PR</option>
              </select>
            </div>
            <div>
              <label htmlFor="">Payment type</label>
              <div className={styles.radioBtnsContainer}>
                <div className={styles.radioBtns}>
                  <input
                    type="radio"
                    name="paymentType"
                    id="upfront"
                    value="upfront"
                    checked={paymentType === 'upfront'}
                    onChange={handlePaymentTypeChange}
                  />
                  <label htmlFor="upfront">Upfront</label>
                </div>
                <div className={styles.radioBtns}>
                  <input
                    type="radio"
                    name="paymentType"
                    id="installment"
                    value="installment"
                    checked={paymentType === 'installment'}
                    onChange={handlePaymentTypeChange}
                  />
                  <label htmlFor="installment">Installment</label>
                </div>
              </div>
            </div>
            {paymentType === 'installment' && (
              <div id="installment">
                <label htmlFor="">Number of installments</label>
                <select name="" id="" onChange={(e) => {
                  setInstallment(e.target.value);
                }}>
                  <option value="">Select number of installments</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            )}
            <div className={styles.btnS}>
              <button onClick={handleCancelClick}>Cancel</button>
              <button onClick={handleSaveClick}>Save</button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.detailsContainer}>
        <div className={styles.detailsHeader}>
          <p className={styles.id}>#{clientDetails && clientDetails.clientId}</p>
          <h1>{clientDetails && clientDetails.name}</h1>
          <p className={styles.email}>{clientDetails && clientDetails.email}</p>
          <p className={styles.phone}>{clientDetails && clientDetails.phone}</p>
          <div className={styles.countries}>
            {
              clientDetails && clientDetails.country.map((country, k) => {
                let countryName = country.split(' ').join('-').toLowerCase();
                return (
                  <p key={k} className={styles.country}>
                    <img width="20" height="20" src={`https://img.icons8.com/emoji/48/${countryName}-emoji.png`} alt="united-states-emoji" />
                  </p>
                )
              })
            }
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
              notification && notification.map((data, i) => (
                <Notification key={i} data={data} />
              ))
            }
          </div>
        </div>
      </div>

      <div className={styles.applicationContainer}>
        <h1>Applications</h1>
        <div className={styles.applications}>
          {
            clientApplicationDetails && clientApplicationDetails.map((data, i) => (
              <Application key={i} data={data} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsPage