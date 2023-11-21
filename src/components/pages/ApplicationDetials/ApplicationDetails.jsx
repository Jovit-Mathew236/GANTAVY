'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import styles from './Application.module.css'
import Topnav from '../../molecules/Topnav'
import BottomIcon from '../../molecules/BottomIcon'
import New from '../../atom/svgs/New'
import firebase from '../../../firebase/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Loading from '../../molecules/Loading';
import { countryData } from '../../molecules/Countries';
import ApplicationStageDeatils from '../../molecules/ApplicationStageDeatils';
import ApplicationDetailsBox from '../../molecules/ApplicationDetailsBox';
import AddStagePopup from '../../organisms/PopUps/AddStagePopup';
import { useCallback } from 'react';
import CheckAuth from '@/src/firebase/auth';
import Add2 from '../../atom/svgs/Add2';
import Remove from '../../atom/svgs/Remove';

const ApplicationDetails = () => {
  const [popUp, setPopUp] = useState(false);
  const [popUpProceed, setPopUpProceed] = useState(false);
  const [popUpProceedConfirm, setPopUpProceedConfirm] = useState(false);
  const [user, setUser] = useState(null);
  const [stageName, setStageName] = useState('');

  const [docId, setDocId] = useState();
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isNotPaymentAlreadyPresent, setIsNotPaymentAlreadyPresent] = useState(false)
  const [disable, setDisable] = useState(false)

  const authCallback = useCallback((user) => {
    setUser(user);
  }, []);


  const [clientApplicationDetails, setClientApplicationDetails] = useState([
    {
      applicationId: '',
      country: 'uk',
      visatype: '',
      paymenttype: '',
      installment: '',
      createdAt: '',
      completed: false,
    }
  ]);
  const [stageDetails, setStageDetails] = useState([])
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get('id'));
  const [fields, setFields] = useState([
    {
      type: 'fileupload',
      heading: '',
      subtext: '',
      btntxt: '', // if type is textbtn
      link: '', // if type is link / payment
      amount: '', // if type is payment
      status: 'notsubmitted', // notsubmitted/notverified/verified/rejected
      response: 'notdone', // if type is fileupload answer will be URL, if type is textbtn response will be just completed
      adminResponse: '', // if admin wants to send a response to the task
    },
  ]);

  const addField = () => {
    // check if type is payment if it is truw then not allow to add a new field
    if (fields[fields.length - 1].type === 'payment') {
      alert('You cannot add a new field as payment field is already present')
      return;
    }
    setFields([
      ...fields,
      {
        type: 'fileupload',
        heading: '',
        subtext: '',
        btntxt: '',
        link: '',
        amount: '',
        status: 'notsubmitted',
        response: 'notdone',
        adminResponse: '',
      },
    ]);
  };

  const cleanUpStates = () => {
    setStageName('');
    setFields([
      {
        type: 'fileupload',
        heading: '',
        subtext: '',
        btntxt: '',
        link: '',
        amount: '',
        status: 'notsubmitted',
        response: 'notdone',
        adminResponse: '',
      },
    ]);
  };
  const handleCancelClick = () => {
    setPopUp(false);
    cleanUpStates();
  };
  const removeField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleSave = () => {
    setDisable(true)
    // validateing the stage name
    if (!stageName) {
      setHasError(true);
      setDisable(false)
      setTimeout(() => {
        setHasError(false);
      }, 3000);
      return;
    }
    // Validate the fields before saving
    const isAnyFieldEmpty = fields.some((field) => {
      if (field.type === 'fileupload') {
        return !field.heading || !field.subtext;
      } else if (field.type === 'textbtn') {
        return !field.heading || !field.subtext || !field.btntxt;
      } else if (field.type === 'payment') {
        return !field.heading || !field.subtext || !field.btntxt || !field.link || !field.amount;
      } else if (field.type === 'link') {
        return !field.subtext || !field.link;
      }
      return false;
    });
    if (isAnyFieldEmpty) {
      setHasError(true);
      setDisable(false)
      setTimeout(() => {
        setHasError(false);
      }, 3000);
      return;
    }
    // Prepare the data to submit
    const dataToSubmit = {
      fields: fields.map((field) => ({
        type: field.type,
        heading: field.heading,
        subtext: field.subtext,
        btntxt: field.btntxt,
        link: field.link,
        amount: field.amount,
        status: field.status,
        response: field.type === 'fileupload' ? '' : 'notdone',
        adminResponse: field.adminResponse,
      })),
      stageNumber: stageDetails.length + 1, // Increment automatically
      completed: false, // Initially marked as false
      heading: stageName,
      addedAt: new Date(),
    };

    firebase.firestore().collection('applications').doc(docId).collection('stages').add(dataToSubmit).then((docRef) => {
      const currentDate = new Date();
      setStageDetails([
        {
          completed: false,
          stageNumber: stageDetails.length + 1,
          heading: stageName,
          addedAt: {
            seconds: Math.floor(currentDate / 1000),
            nanoseconds: (currentDate % 1000) * 1000000,
          },
        },
        ...stageDetails,
      ]);
      setDisable(false)
      cleanUpStates();
      setPopUp(false);
    })
      .catch((error) => {
        console.error('Error adding application: ', error);
      });
  };

  let documentID;
  useEffect(() => {
    if (id !== '') {

      firebase.firestore().collection('applications').where('applicationId', '==', id).get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          setDocId(doc.id);
          documentID = doc.id;
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setClientApplicationDetails(data);
      }).then(() => {
        firebase.firestore().collection('applications').doc(documentID).collection('stages').get().then((snapshot) => {
          const data = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          // sort data by stageNumber
          setStageDetails(data.sort((a, b) => b.stageNumber - a.stageNumber));
        })
        setLoading(false);
      })
        .catch((error) => {
          console.error('Error fetching documents: ', error);
        });

    }
  }, [id])

  useEffect(() => {
    if (popUp && stageDetails.length >= 1) {
      clientApplicationDetails[0].paymenttype === "Installment" ? setPopUpProceed(true) : setPopUpProceed(false)
    }
  }, [popUp])
  return (
    <div className={styles.applicationDetails}>
      <CheckAuth callback={authCallback} />
      {loading && <Loading />}
      <Topnav id={id} collection={"applications"} where={'applicationId'} deletion={"Application"} isBtn={true} home={true} />
      {!isCompleted && <BottomIcon setPopUp={setPopUp} icon={<New />} text={"Add stage"} />}

      {popUpProceed && <div className={styles.popUp}>
        <div className={styles.popUpContainer}>
          <h1>Installment due alert !</h1>
          <div className={styles.btns}>
            <button onClick={() => {
              setPopUpProceedConfirm(true)
              setPopUpProceed(false)
            }}>Proceed</button>
            <button onClick={() => {
              const updatedFields = [...fields];
              updatedFields[updatedFields.length - 1].type = 'payment';
              setFields(updatedFields);
              setPopUpProceed(false)
            }}>Payment</button>
          </div>
        </div>
      </div>}

      {popUpProceedConfirm && <div className={styles.popUp}>
        <div className={styles.popUpContainer}>
          <h1>Are you sure you want to Proceed</h1>
          <div className={styles.btns}>
            <button onClick={() => {
              setPopUpProceedConfirm(false)
              setPopUpProceed(true)
            }}>No</button>
            <button onClick={() => {
              setPopUpProceedConfirm(false)
            }}>Yes</button>
          </div>
        </div>
      </div>}
      <AddStagePopup
        popUp={popUp}
        setStageName={setStageName}
        fields={fields}
        removeField={removeField}
        setFields={setFields}
        addField={addField}
        handleCancelClick={handleCancelClick}
        handleSave={handleSave}
        disable={disable}
        hasError={hasError}
      />

      <ApplicationDetailsBox
        clientApplicationDetails={clientApplicationDetails}
        docId={docId}
        setClientApplicationDetails={setClientApplicationDetails}
        countryData={countryData}
      />

      <div className={styles.stageContainer}>
        <h1>Stages</h1>
        <ApplicationStageDeatils stageDetails={stageDetails} docId={docId} />
      </div>


    </div>
  )
}

export default ApplicationDetails