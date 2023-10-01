'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import styles from './StageDetails.module.css'
import Topnav from '../../molecules/Topnav'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from '../../../firebase/config';
import Loading from '../../molecules/Loading';

const StageDetails = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const docId = searchParams.get('docId');
    const [status, setStatus] = useState("")
    const [user, setUser] = useState(null);
    const [stage, setStage] = useState({
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
    // useEffect(() => {
    //     firebase.firestore().collection('applications').doc(docId).collection('stages').where('stageNumber', '==', parseInt(id)).get().then((snapshot) => {
    //         snapshot.docs.map((doc) => {
    //             setStage(doc.data())
    //             console.log(doc.data());
    //         })
    //     }).then(() => {
    //         setLoading(false)
    //     })
    // }, []);
    useEffect(() => {
        const query = firebase.firestore().collection('applications').doc(docId).collection('stages').where('stageNumber', '==', parseInt(id));
        const unsubscribe = query.onSnapshot((snapshot) => {
            snapshot.docs.forEach((doc) => {
                setStage(doc.data())
                console.log(doc.data());
            });
            // console.log(updatedStageData);
            // setStage(updatedStageData);
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
                            <select name="" id="" value={status} onChange={(e) => {
                                setStatus(e.target.value);
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
                    )
                })}
            </div>
        </div>
    )
}

export default StageDetails