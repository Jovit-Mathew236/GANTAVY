'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import styles from './StageDetails.module.css'
import Topnav from '../../molecules/Topnav'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from '../../../firebase/config';
import Loading from '../../molecules/Loading';
import { IoSend } from 'react-icons/io5'

const StageDetails = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const docId = searchParams.get('docId');
    const [user, setUser] = useState(null);
    const [adminResponse, setAdminResponse] = useState('')
    const [stageUpdate, setstageUpdate] = useState(false)
    const [stage, setStage] = useState({
        completed: false,
        fields: [{
            link: "",
            response: "",
            status: "",
            subtext: "",
            heading: "",
            btntxt: "",
            adminResponse: "",
            type: ""
        }]
    })
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
    useEffect(() => {
        const query = firebase.firestore().collection('applications').doc(docId).collection('stages').where('stageNumber', '==', parseInt(id));
        const unsubscribe = query.onSnapshot((snapshot) => {
            snapshot.docs.forEach((doc) => {
                setStage(doc.data())
                console.log(doc.data());
            });
            setLoading(false);
        });
        return () => unsubscribe();
    }, [docId, id])
    const fields = stage.fields.map(field => ({
        link: field.link ? field.link : "",
        response: field.response ? field.response : "",
        status: field.status ? field.status : "",
        subtext: field.subtext ? field.subtext : "",
        heading: field.heading ? field.heading : "",
        btntxt: field.btntxt ? field.btntxt : "",
        adminResponse: field.adminResponse ? field.adminResponse : "",
        type: field.type ? field.type : ""
    }));

    // console.log(stage.fields);
    return (
        <div className={styles.StageDetailsPage}>
            {loading && <Loading />}
            <Topnav id={id} collection={`applications/${docId}/stages`} where={"stageNumber"} deletion={"stage"} />

            <div className={styles.stageDetailsContainer}>
                {fields.map((field, i) => {
                    return (
                        <>
                            <div key={i} className={styles.StageDetails}>
                                <h1>{field.heading}</h1>
                                <p>{field.subtext}</p>
                                <div className={styles.assetContainer}>
                                    {field.type === "fileupload" && <p className={styles.assets}>{field.response ? <a href={field.response}>{field.response}</a> : "No file uploaded"}</p>}
                                    {field.type === "textbtn" && <p className={styles.assets}>{field.btntxt}</p>}
                                    {field.type === "payment" && <div>
                                        <div>
                                            <p className={styles.label}>Amount</p>
                                            <p className={styles.assets}>RS 5000</p>
                                        </div>
                                        <div>
                                            <p className={styles.label}>Payment link</p>
                                            <p className={styles.assets}>{field.link}</p>
                                        </div>
                                    </div>}
                                    {field.type === "link" && <p className={styles.assets}><a href={field.link} target='_blank'>{field.link}</a></p>}
                                </div>
                                <div className={styles.responseField}>
                                    <input value={field.adminResponse} onChange={(e) => {
                                        setAdminResponse(e.target.value)
                                        setStage({
                                            ...stage,
                                            fields: stage.fields.map((item, index) => {
                                                if (index === i) {
                                                    return {
                                                        ...item,
                                                        adminResponse: e.target.value
                                                    }
                                                }
                                                return item;
                                            })
                                        })
                                    }} type="text" placeholder='Response' />
                                    <button onClick={() => {
                                        firebase.firestore().collection('applications').doc(docId).collection('stages').where('stageNumber', '==', parseInt(id)).get().then((snapshot) => {
                                            snapshot.docs.forEach((doc) => {
                                                const stageRef = firebase.firestore().collection('applications').doc(docId).collection('stages').doc(doc.id);
                                                const updatedStatusObject = {
                                                    link: doc.data().fields[i].link,
                                                    response: doc.data().fields[i].response,
                                                    subtext: doc.data().fields[i].subtext,
                                                    heading: doc.data().fields[i].heading,
                                                    btntxt: doc.data().fields[i].btntxt,
                                                    adminResponse: adminResponse,
                                                    type: doc.data().fields[i].type,
                                                    status: doc.data().fields[i].status,
                                                };
                                                const currentFields = doc.data().fields;
                                                currentFields[i] = updatedStatusObject;
                                                // setTimeout(() => {
                                                //     setstageUpdate(false);
                                                // }, 3000);
                                                // setstageUpdate(true);
                                                stageRef.update({
                                                    fields: currentFields
                                                }).then(() => {
                                                    console.log(`Status updated to ${adminResponse}`);
                                                }).catch((error) => {
                                                    console.error('Error updating status: ', error);
                                                });
                                            });
                                        });
                                    }}><IoSend color={"white"} /></button>
                                </div>
                                <div className={styles.selectContainer}>
                                    <select name="" id="" value={field.status} onChange={(e) => {
                                        setStage({
                                            ...stage,
                                            fields: stage.fields.map((item, index) => {
                                                if (index === i) {
                                                    return {
                                                        ...item,
                                                        status: e.target.value
                                                    }
                                                }
                                                return item;
                                            })
                                        })
                                        const newStatus = e.target.value; // New status value
                                        firebase.firestore().collection('applications').doc(docId).collection('stages').where('stageNumber', '==', parseInt(id)).get().then((snapshot) => {
                                            snapshot.docs.forEach((doc) => {
                                                const stageRef = firebase.firestore().collection('applications').doc(docId).collection('stages').doc(doc.id);
                                                const updatedStatusObject = {
                                                    link: doc.data().fields[i].link,
                                                    response: doc.data().fields[i].response,
                                                    subtext: doc.data().fields[i].subtext,
                                                    heading: doc.data().fields[i].heading,
                                                    btntxt: doc.data().fields[i].btntxt,
                                                    adminResponse: doc.data().fields[i].adminResponse,
                                                    type: doc.data().fields[i].type,
                                                    status: e.target.value,
                                                };
                                                const currentFields = doc.data().fields;
                                                currentFields[i] = updatedStatusObject;
                                                setTimeout(() => {
                                                    setstageUpdate(false);
                                                }, 3000);
                                                setstageUpdate(true);
                                                stageRef.update({
                                                    fields: currentFields
                                                }).then(() => {
                                                    console.log(`Status updated to ${newStatus}`);
                                                }).catch((error) => {
                                                    console.error('Error updating status: ', error);
                                                });
                                            });
                                        });
                                    }}
                                    >
                                        <option value="rejected">Reject</option>
                                        <option value="verified">Approve</option>
                                        <option value="notsubmitted">Not Submitted</option>
                                        <option value="notverified">Not Verified</option>
                                    </select>
                                </div>
                            </div>
                            <hr />
                        </>
                    )
                })}
            </div>
            <div className={styles.selectContainer}>
                <select className={styles.bottomSelect} value={stage.completed} onChange={(e) => {
                    setStage({
                        ...stage,
                        completed: JSON.parse(e.target.value)
                    })
                    firebase.firestore().collection('applications').doc(docId).collection('stages').where('stageNumber', '==', parseInt(id)).get().then((snapshot) => {
                        snapshot.docs.forEach((doc) => {
                            const stageRef = firebase.firestore().collection('applications').doc(docId).collection('stages').doc(doc.id);
                            stageRef.update({
                                addedAt: doc.data().addedAt,
                                heading: doc.data().heading,
                                stageNumber: doc.data().stageNumber,
                                completed: JSON.parse(e.target.value),
                                fields: doc.data().fields
                            }).then(() => {
                                console.log(`Status updated to ${JSON.parse(e.target.value)}`);
                            }).catch((error) => {
                                console.error('Error updating status: ', error);
                            });
                        });
                    });
                }}>
                    <option value={false}>Not Completed</option>
                    <option value={true}>Completed</option>
                </select>
            </div>
            {stageUpdate && <div class="error_message p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                <span class="font-medium">Success</span> Status updated successfully
            </div>}
        </div>
    )
}

export default StageDetails