'use client'
import React from 'react'
import styles from './molecules.module.css'
import Back from '../atom/svgs/Back'
import Edit2 from '../atom/svgs/Edit2'
import Delete2 from '../atom/svgs/Delete2'
import firebase from '../../firebase/config';


const Topnav = ({ id, collection, where }) => {
    // console.log(id, collection, where);
    return (
        <div className={styles.topnav}>
            <p onClick={
                () => {
                    window.history.back()
                }
            }><Back /> </p>
            <div className={styles.btns}>
                <p><Edit2 /></p>
                <p
                    onClick={() => {
                        firebase.firestore().collection(collection).where(where.toString(), '==', id).get().then((snapshot) => {
                            snapshot.docs.map((doc) => {
                                firebase.firestore().collection(collection).doc(doc.id).delete()
                            })
                        }).then(() => {
                            setTimeout(() => {
                                window.history.back()
                            }, 1000);
                        })
                    }}
                ><Delete2 /></p>
            </div>
        </div>
    )
}

export default Topnav