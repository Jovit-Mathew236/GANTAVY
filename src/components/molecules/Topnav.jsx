'use client'
import React, { useState } from 'react'
import styles from './molecules.module.css'
import Back from '../atom/svgs/Back'
import Edit2 from '../atom/svgs/Edit2'
import Delete2 from '../atom/svgs/Delete2'
import firebase from '../../firebase/config';
import { AiFillHome } from 'react-icons/ai'
import { useRouter } from 'next/navigation'


const Topnav = ({ id, collection, where, deletion, setEditClientPopUp, isBtn, home }) => {
    // console.log(id, collection, where);
    const router = useRouter()
    const [popUp, setPopUp] = useState(false);
    return (
        <>
            {popUp && <div className={styles.popUp}>
                <div className={styles.popUpContainer}>
                    <h1>Are you sure you want to delete this {deletion} ?</h1>
                    <div className={styles.btns}>
                        <button onClick={() => {
                            setPopUp(false)
                        }}>No</button>
                        <button onClick={() => {
                            firebase.firestore().collection(collection).where(where, '==', parseInt(id)).get().then((snapshot) => {
                                snapshot.docs.map((doc) => {
                                    firebase.firestore().collection(collection).doc(doc.id).delete().then(() => {
                                        setTimeout(() => {
                                            window.history.back()
                                        }, 1000);
                                        console.log('Document successfully deleted');
                                    }).catch((error) => {
                                        console.error('Error deleting document: ', error);
                                    });
                                });
                            }).catch((error) => {
                                console.error('Error fetching documents: ', error);
                            });
                            setPopUp(false)
                        }}>Yes</button>
                    </div>
                </div>
            </div>}


            <div className={styles.topnav}>
                <p onClick={
                    () => {
                        window.history.back()
                    }
                }><Back /> </p>
                {isBtn && <div className={styles.btns}>
                    {setEditClientPopUp && <p onClick={() => {
                        setEditClientPopUp(true)
                    }}><Edit2 /></p>}
                    {deletion && <p
                        onClick={() => {
                            setPopUp(true)
                        }}
                    ><Delete2 /></p>}
                    {home && <p
                        onClick={() => {
                            router.push('/')
                        }}
                        className={styles.homeBtn}
                    ><AiFillHome /></p>}
                </div>}
            </div>
        </>
    )
}

export default Topnav