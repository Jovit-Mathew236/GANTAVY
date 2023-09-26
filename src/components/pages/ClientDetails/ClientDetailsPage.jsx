'use client'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ClientDetails.module.css';
import SendBlack from '../../atom/svgs/SendBlack';
import RightArrow from '../../atom/svgs/RightArrow';
import New from '../../atom/svgs/New';
import BottomIcon from '../../molecules/BottomIcon';
import firebase from '../../../firebase/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Topnav from '../../molecules/Topnav';

const ClientDetailsPage = () => {
  const [popUp, setPopUp] = useState(false);
  const [clientDetails, setClientDetails] = useState(null);
  const [clientApplicationDetails, setClientApplicationDetails] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const handleCancelClick = () => {
    setPopUp(false);
  };
  const [paymentType, setPaymentType] = useState('upfront'); // Default to 'upfront'

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
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
    if (id && id.trim() !== '') {
      firebase.firestore().collection('clients').doc(id).get().then((snapshot) => {
        const data = snapshot.data();
        setClientDetails(data);
      });
      const clientId = '21692'; // Replace this with the desired clientId value

      firebase.firestore().collection('applications').where('clientid', '==', '21692').get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setClientApplicationDetails(data);
      })
        .catch((error) => {
          console.error('Error fetching documents: ', error);
        });

    }
  }, [id])

  return (
    <div className={styles.clientDetailsPage}>
      <Topnav />
      <BottomIcon setPopUp={setPopUp} icon={<New />} text={"Add new"} />

      {popUp && <div className={styles.addClientPopUp}>
        <div className={styles.popUpContainer}>
          <div className={styles.popUpFields}>
            <label htmlFor="">Country</label>
            <select name="" id="">
              <option value="">India</option>
              <option value="">Australia</option>
              <option value="">Canada</option>
              <option value="">USA</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Visa</label>
            <select name="" id="">
              <option value="">Visiting Visa</option>
              <option value="">Student Visa</option>
              <option value="">Work Visa</option>
              <option value="">PR</option>
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
              <select name="" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          )}

          <div className={styles.btnS}>
            <button onClick={handleCancelClick}>Cancel</button>
            <button>Save</button>
          </div>
        </div>
      </div>}


      <div className={styles.detailsContainer}>
        <div className={styles.detailsHeader}>
          <p className={styles.id}>#{clientDetails && clientDetails.clientId}</p>
          <h1>{clientDetails && clientDetails.name}</h1>
          <p className={styles.email}>{clientDetails && clientDetails.email}</p>
          <p className={styles.phone}>{clientDetails && clientDetails.phone}</p>
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

          {
            clientApplicationDetails && clientApplicationDetails.map((data, i) => {
              return (
                <div className={styles.application} key={i}>
                  <div className={styles.applicationHeader}>
                    <div className={styles.idAndNotification}>
                      <p className={styles.id}>#{data.applicationId}</p>
                      <p ></p>
                    </div>
                    <p className={styles.date}>21 March 2023</p>
                  </div>
                  <div className={styles.applicationBody}>
                    <h3 className={styles.country}>{data.country} <p className={styles.countryIcon}>Ca</p></h3>
                    <p className={styles.visaType}>{data.visatype}</p>
                  </div>
                  <div className={styles.applicationFooter}>
                    <p className={styles.paymentType}>{data.paymenttype} <span>5</span></p>
                    <a href='/client-details/application' >
                      <RightArrow />
                    </a>
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

export default ClientDetailsPage