'use client'
import React, { useEffect, useState } from 'react'
import styles from './popUps.module.css'
import firebase from '../../../firebase/config';

const AddClientPopUp = ({ setPopUp, onSave, id }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [clientId, setClientId] = useState('');
    const [addedAt, setAddedAt] = useState('');
    useEffect(() => {
        id && firebase
            .firestore()
            .collection('clients')
            .where('clientId', '==', id)
            .get().then((snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setName(data[0].name);
                setEmail(data[0].email);
                setPhone(data[0].phone);
                setClientId(data[0].clientId);
                setAddedAt(data[0].addedAt);
            }).catch((error) => {
                console.error('Error fetching documents: ', error);
            });
    }, [])

    const handleCancelClick = () => {
        setPopUp(false);
    };
    const handleSaveClick = () => {
        // Validate the input data
        if (name.trim() === '' || email.trim() === '' || phone.trim() === '') {
            // Handle validation error (you can show an error message)
            return;
        }

        // Call the onSave function to save the client data
        id ? onSave({
            name,
            email,
            phone,
            clientId,
            addedAt,
        }) : onSave({
            name,
            email,
            phone,
        });

        // Close the popup
        setPopUp(false);
    };

    return (
        <div className={styles.popUp}>
            <div className={styles.popUpContainer}>
                <div className={styles.popUpFields}>
                    <label htmlFor="name">Client full name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone number</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="+91 1234567890"
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                    />
                </div>
                <div className={styles.btnS}>
                    <button onClick={handleCancelClick}>Cancel</button>
                    <button onClick={handleSaveClick}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default AddClientPopUp