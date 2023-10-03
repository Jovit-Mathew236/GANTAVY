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
import Remove from '../../atom/svgs/Remove';

const ApplicationDetails = () => {
  const [popUp, setPopUp] = useState(false);
  const [user, setUser] = useState(null);
  const [stageName, setStageName] = useState('');
  // const [heading, setHeading] = useState('');
  // const [type, setType] = useState('')
  const [docId, setDocId] = useState();
  const [loading, setLoading] = useState(true);


  const [clientApplicationDetails, setClientApplicationDetails] = useState([]);
  const [stageDetails, setStageDetails] = useState([])
  const handleCancelClick = () => {
    setPopUp(false);
  };
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
      status: '', // notsubmitted/notverified/verified/rejected
      response: null, // if type is fileupload answer will be URL, if type is textbtn response will be just completed
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
        status: '',
        response: null,
        adminResponse: '',
      },
    ]);
  };

  const removeField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleSave = () => {
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
        response: field.response,
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
        ...stageDetails,
        {
          completed: false,
          stageNumber: stageDetails.length + 1,
          heading: stageName,
          addedAt: {
            seconds: Math.floor(currentDate / 1000),
            nanoseconds: (currentDate % 1000) * 1000000,
          },
        },
      ]);
      setPopUp(false);
    })
      .catch((error) => {
        console.error('Error adding application: ', error);
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
      <Topnav id={id} collection={"applications"} where={'applicationId'} />
      <BottomIcon setPopUp={setPopUp} icon={<New />} text={"Add stage"} />

      {popUp && <div className={styles.addClientPopUp}>
        <div className={styles.popUpContainer}>
          <div className={styles.popUpFields}>
            <label htmlFor="">Stage Name</label>
            <input type="text" placeholder='Level 1' onChange={(e) => {
              setStageName(e.target.value)
            }} />
          </div>

          {fields.map((field, index) => (
            <div key={index} className={styles.subContainer}>
              {index > 0 && (
                <p className={styles.rmvBtn} onClick={() => removeField(index)}>
                  <Remove />
                </p>
              )}
              <select
                name="options"
                id="option"
                value={field.type}
                onChange={(e) => {
                  if (e.target.value === 'payment') {
                    const isNotPaymentAlreadyPresent = fields.some((field) => field.type !== 'payment' && fields.length !== 1);
                    if (isNotPaymentAlreadyPresent) {
                      alert('You cannot add a payment field as there is already a field present');
                      return;
                    }
                  }
                  const updatedFields = [...fields];
                  updatedFields[index].type = e.target.value;
                  setFields(updatedFields);
                }}
              >
                <option value="fileupload">File Upload</option>
                <option value="textbtn">Text button</option>
                <option value="payment">Payment info</option>
                <option value="link">Link share</option>
              </select>

              {field.type === "fileupload" && (
                <>
                  <div className={styles.popUpFields}>
                    <label htmlFor="">Heading</label>
                    <input
                      type="text"
                      placeholder='Upload your passport'
                      value={field.heading}
                      onChange={(e) => {
                        const updatedFields = [...fields];
                        updatedFields[index].heading = e.target.value;
                        setFields(updatedFields);
                      }}
                    />
                  </div>
                  <div className={styles.popUpFields}>
                    <label htmlFor="">Sub Heading</label>
                    <input
                      type="text"
                      placeholder="Enter details"
                      value={field.subtext}
                      onChange={(e) => {
                        const updatedFields = [...fields];
                        updatedFields[index].subtext = e.target.value;
                        setFields(updatedFields);
                      }}
                    />
                  </div>
                </>
              )}
              {field.type === "textbtn" && (
                <>
                  <div className={styles.popUpFields}>
                    <label htmlFor="">Heading</label>
                    <input
                      type="text"
                      placeholder='Upload your passport'
                      value={field.heading}
                      onChange={(e) => {
                        const updatedFields = [...fields];
                        updatedFields[index].heading = e.target.value;
                        setFields(updatedFields);
                      }}
                    />
                  </div>
                  <div className={styles.popUpFields}>
                    <label htmlFor="">Sub Heading</label>
                    <input
                      type="text"
                      placeholder="Enter details"
                      value={field.subtext}
                      onChange={(e) => {
                        const updatedFields = [...fields];
                        updatedFields[index].subtext = e.target.value;
                        setFields(updatedFields);
                      }}
                    />
                  </div>
                  <div className={styles.popUpFields}>
                    <label htmlFor="">Button Text</label>
                    <input
                      type="text"
                      placeholder='Button text'
                      value={field.btntxt}
                      onChange={(e) => {
                        const updatedFields = [...fields];
                        updatedFields[index].btntxt = e.target.value;
                        setFields(updatedFields);
                      }}
                    />
                  </div>
                </>
              )}
              {field.type === "payment" && (
                <>
                  <div className={styles.popUpFields}>
                    <label htmlFor="">Heading</label>
                    <input
                      type="text"
                      placeholder='Upload your passport'
                      value={field.heading}
                      onChange={(e) => {
                        const updatedFields = [...fields];
                        updatedFields[index].heading = e.target.value;
                        setFields(updatedFields);
                      }}
                    />
                  </div>
                  <div className={styles.popUpFields}>
                    <label htmlFor="">Sub Heading</label>
                    <input
                      type="text"
                      placeholder='Enter sub heading'
                      value={field.subtext}
                      onChange={(e) => {
                        const updatedFields = [...fields];
                        updatedFields[index].subtext = e.target.value;
                        setFields(updatedFields);
                      }}
                    />
                  </div>
                  <div className={styles.popUpFields}>
                    <label htmlFor="">Amount</label>
                    <input
                      type="text"
                      placeholder='Amount'
                      value={field.amount}
                      onChange={(e) => {
                        const updatedFields = [...fields];
                        updatedFields[index].amount = e.target.value;
                        setFields(updatedFields);
                      }}
                    />
                  </div>
                  <div className={styles.popUpFields}>
                    <label htmlFor="">Button Text</label>
                    <input
                      type="text"
                      placeholder='Button text'
                      value={field.btntxt}
                      onChange={(e) => {
                        const updatedFields = [...fields];
                        updatedFields[index].btntxt = e.target.value;
                        setFields(updatedFields);
                      }}
                    />
                  </div>
                  <div className={styles.popUpFields}>
                    <label htmlFor="">Payment Link</label>
                    <input
                      type="text"
                      placeholder='Payment link'
                      value={field.link}
                      onChange={(e) => {
                        const updatedFields = [...fields];
                        updatedFields[index].link = e.target.value;
                        setFields(updatedFields);
                      }}
                    />
                  </div>
                </>
              )}

              {field.type === "link" && (
                <>
                  <div className={styles.popUpFields}>
                    <label htmlFor="">Subheading</label>
                    <input
                      type="text"
                      placeholder="Enter subheading"
                      value={field.subtext}
                      onChange={(e) => {
                        const updatedFields = [...fields];
                        updatedFields[index].subtext = e.target.value;
                        setFields(updatedFields);
                      }}
                    />
                  </div>
                  <div className={styles.popUpFields}>
                    <label htmlFor="">Link</label>
                    <input
                      type="text"
                      placeholder="Enter link"
                      value={field.link}
                      onChange={(e) => {
                        const updatedFields = [...fields];
                        updatedFields[index].link = e.target.value;
                        setFields(updatedFields);
                      }}
                    />
                  </div>
                </>
              )}
              {index === fields.length - 1 && (
                <p className={styles.addAndRmvBtn} onClick={addField}>
                  <Add2 />
                </p>
              )}
            </div>
          ))}

          {/* <p className={styles.addAndRmvBtn} onClick={addField}>
            <Add2 />
          </p> */}
          <div className={styles.btnS}>
            <button onClick={handleCancelClick}>Cancel</button>
            <button onClick={handleSave}>Save</button>
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

        <p className={styles.createdDate}>Created on {clientApplicationDetails.createdAt}</p>
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
                <a href={`/client-details/application/stage?id=${stageDetail.stageNumber}&docId=${docId}`}>
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