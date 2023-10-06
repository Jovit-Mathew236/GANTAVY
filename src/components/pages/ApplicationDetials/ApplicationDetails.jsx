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
import { countryData } from '../../molecules/Countries';

const ApplicationDetails = () => {
  const [popUp, setPopUp] = useState(false);
  const [user, setUser] = useState(null);
  const [stageName, setStageName] = useState('');
  // const [heading, setHeading] = useState('');
  // const [type, setType] = useState('')
  const [docId, setDocId] = useState();
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isNotPaymentAlreadyPresent, setIsNotPaymentAlreadyPresent] = useState(false)


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
          // sort data by stageNumber
          setStageDetails(data.sort((a, b) => a.stageNumber - b.stageNumber));
        })
        setLoading(false);
      })
        .catch((error) => {
          console.error('Error fetching documents: ', error);
        });

    }
  }, [id])

  const formattedDate = (date) => {
    return date ? new Date(date[0].createdAt.seconds * 1000).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }) : 'no date';
  };
  // console.log(clientApplicationDetails);
  return (
    <div className={styles.applicationDetails}>
      {loading && <Loading />}
      <Topnav id={id} collection={"applications"} where={'applicationId'} deletion={"Application"} />
      {!isCompleted && <BottomIcon setPopUp={setPopUp} icon={<New />} text={"Add stage"} />}

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
                      setIsNotPaymentAlreadyPresent(true);
                      setTimeout(() => {
                        setIsNotPaymentAlreadyPresent(false);
                      }, 3000);
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
        {hasError &&
          <div class="error_message flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div>
              <span class="font-medium">Invalid Felid!</span> Enter valid data
            </div>
          </div>
        }
        {isNotPaymentAlreadyPresent &&
          <div class="error_message flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 " role="alert">
            <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div>
              <span class="font-medium">Sorry!</span>You cannot add a payment field as there is already a field present
            </div>
          </div>
        }
      </div>}

      <div className={styles.applicationDetailsContainer}>
        <select name="" id="" value={isCompleted} onChange={(e) => {
          setIsCompleted(JSON.parse(e.target.value))
          firebase.firestore().collection('applications').doc(docId).update({
            completed: JSON.parse(e.target.value)
          }).then(() => {
            setClientApplicationDetails([
              {
                ...clientApplicationDetails[0],
                completed: JSON.parse(e.target.value)
              }
            ])
            console.log(`Status updated to ${JSON.parse(e.target.value)}`);
          }).catch((error) => {
            console.error('Error updating status: ', error);
          });
        }}>
          <option value={false}>Not Completed</option>
          <option value={true}>Completed</option>
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
        <h1 className={styles.country_name}>{
          clientApplicationDetails.map((clientApplicationDetail) => {
            return (countryData[clientApplicationDetail.country].name)
          })}
          <p className={styles.countryIcon}>
            <img
              width="15"
              height="15"
              src={`https://img.icons8.com/emoji/48/${countryData[clientApplicationDetails[0].country].name.split(' ').join('-').toLowerCase()}-emoji.png`}
              alt={`${clientApplicationDetails[0].country}-emoji`}
            />
          </p></h1>

        <p className={styles.paymentType}>{
          clientApplicationDetails.map((clientApplicationDetail) => {
            return clientApplicationDetail.paymenttype
          })
        }{clientApplicationDetails[0].installment ? <span>{clientApplicationDetails[0].installment}</span> : null}</p>

        <p className={styles.createdDate}>Created on {formattedDate(clientApplicationDetails)}</p>
      </div>

      <div className={styles.stageContainer}>
        <h1>Stages</h1>

        {stageDetails.length !== 0 ?
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
                  <p className={styles.status} style={!stageDetail.completed ? { color: "#FF6060" } : { color: "#8AB867" }}>{
                    stageDetail.completed ? 'Completed' : 'On going'
                  }</p>
                </div>
                <a href={`/client-details/application/stage?id=${stageDetail.stageNumber}&docId=${docId}`}>
                  <RightArrow />
                </a>
              </div>
            )
          })
          : (
            <div className={styles.errContainer}>
              <p className={styles.err}></p>
              <p className={styles.errMessage}><span>Oops!</span>
                <br />
                no records found.</p>
            </div>)
        }

      </div>


    </div>
  )
}

export default ApplicationDetails