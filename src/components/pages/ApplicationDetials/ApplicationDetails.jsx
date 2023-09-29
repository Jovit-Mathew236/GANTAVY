'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import styles from './Application.module.css'
import Topnav from '../../molecules/Topnav'
import BottomIcon from '../../molecules/BottomIcon'
import New from '../../atom/svgs/New'
import RightArrow from '../../atom/svgs/RightArrow'
import firebase from '../../../firebase/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Add2 from '../../atom/svgs/Add2';
import Loading from '../../molecules/Loading';

const ApplicationDetails = () => {
  const [popUp, setPopUp] = useState(false);
  const [user, setUser] = useState(null);
  const [stageName, setStageName] = useState('');
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState();
  const [file, setFile] = useState();
  const [docId, setDocId] = useState();
  const [loading, setLoading] = useState(true);


  const [clientApplicationDetails, setClientApplicationDetails] = useState([]);
  const [stageDetails, setStageDetails] = useState([])
  const handleCancelClick = () => {
    setPopUp(false);
  };
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

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
  let documentID;
  useEffect(() => {
    if (id && id.trim() !== '') {

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
          setStageDetails(data);
        })
        setLoading(false);
      })
        .catch((error) => {
          console.error('Error fetching documents: ', error);
        });

    }
  }, [id])
  // console.log(stageDetails);
  return (
    <div className={styles.applicationDetails}>
      {loading && <Loading />}
      <Topnav id={id} collection={"applications"} where={'applicationId'}/>
      <BottomIcon setPopUp={setPopUp} icon={<New />} text={"Add stage"} />

      {popUp && <div className={styles.addClientPopUp}>
        <div className={styles.popUpContainer}>
          <div className={styles.popUpFields}>
            <label htmlFor="">Stage Name</label>
            <input type="text" placeholder='Level 1' onChange={(e) => {
              setStageName(e.target.value)
            }} />
          </div>

          <div className={styles.subContainer}>
            <select name="options" id="option">
              <option value="">File Upload</option>
              <option value="">Text button</option>
              <option value="">Payment info</option>
              <option value="">Link share</option>

            </select>
            <div className={styles.popUpFields}>
              <label htmlFor="">Heading</label>
              <input type="text" placeholder='Upload your passport' onChange={(e) => {
                setHeading(e.target.value)
              }} />
            </div>
            <div className={styles.popUpFields}>
              <label htmlFor="">Description</label>
              <input type="text" placeholder='Enter deatils' onChange={(e) => {
                setDescription(e.target.value)
              }} />
            </div>
            <p className={styles.addBtn} onClick={() => {

            }}>
              <Add2 />
            </p>
          </div>
          <div className={styles.btnS}>
            <button onClick={handleCancelClick}>Cancel</button>
            <button onClick={() => {
              // console.log(docId);
              firebase.firestore().collection('applications').doc(docId).collection('stages').add({
                stageName, // Update with the correct value
                heading,
                description,
                // link: link, // Update with the correct value
                // // file,
                completed: false,
                stageNumber: stageDetails.length + 1,
                addedAt: new Date(),
              })

                .then((docRef) => {
                  const currentDate = new Date();
                  setStageDetails([...stageDetails, {
                    stageName, // Update with the correct value
                    heading,
                    description,
                    // link: link, // Update with the correct value
                    // // file,
                    completed: false,
                    stageNumber: stageDetails.length + 1,
                    addedAt: {
                      seconds: Math.floor(currentDate / 1000),
                      nanoseconds: (currentDate % 1000) * 1000000,
                    }
                  }])
                  setPopUp(false);
                })
                .catch((error) => {
                  console.error('Error adding application: ', error);
                });
            }} >Save</button>
          </div>
        </div>
      </div>}

      <div className={styles.applicationDetailsContainer}>
        <select name="" id="">
          <option value="">Not Completed</option>
          <option value="">Completed</option>
        </select>

        <div className={styles.id}>#{
          clientApplicationDetails.map((clientApplicationDetail) => {
            return clientApplicationDetail.applicationId
          })
        }</div>

        <h1>{
          clientApplicationDetails.map((clientApplicationDetail) => {
            return clientApplicationDetail.visatype
          })
        }</h1>
        <h1>{
          clientApplicationDetails.map((clientApplicationDetail) => {
            return clientApplicationDetail.country
          })
        }</h1>

        <p className={styles.paymentType}>{
          clientApplicationDetails.map((clientApplicationDetail) => {
            return clientApplicationDetail.paymenttype
          })
        } <span>5</span></p>

        <p className={styles.createdDate}>Created on september 29 2023</p>
      </div>

      <div className={styles.stageContainer}>
        <h1>Stages</h1>

        {
          stageDetails.map((stageDetail) => {
            const milliseconds = stageDetail.addedAt ? stageDetail.addedAt.seconds * 1000 : 0;
            const date = new Date(milliseconds);

            const day = date.getDate();
            const month = date.toLocaleString('en-US', { month: 'long' });
            const year = date.getFullYear();

            const formattedDate = `${day} ${month} ${year}`;
            return (
              <div className={styles.stage}>
                <p className={styles.date}>{formattedDate ? formattedDate : ""}</p>
                <div className={styles.level}>
                  <p>{stageDetail.stageNumber}</p>
                </div>
                <div>
                  <h2 className={styles.head}>{stageDetail.heading}</h2>
                  <p className={styles.status}>{
                    stageDetail.completed ? 'Completed' : 'On going'
                  }</p>
                </div>
                <a href='' >
                  <RightArrow />
                </a>
              </div>
            )
          })
        }

      </div>


    </div>
  )
}

export default ApplicationDetails