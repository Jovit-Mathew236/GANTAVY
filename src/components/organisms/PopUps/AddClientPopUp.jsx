'use client'
import React, { useEffect, useState } from 'react'
import styles from './PopUps.module.css'
import firebase from '../../../firebase/config';

const AddClientPopUp = ({ setPopUp, onSave, id }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [clientId, setClientId] = useState('');
    const [addedAt, setAddedAt] = useState('');
    const [hasError, setHasError] = useState(false);
    const [disable, setDisable] = useState(false)
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
        setDisable(true)
        // Validate the input data
        // validate email
        const emailRegex = /\S+@\S+\.\S+/;
        const phoneRegex = /^\d{10}$/;
        if (!emailRegex.test(email) || !phoneRegex.test(phone) || !email || !name || !phone) {
            setHasError(true);
            setDisable(false)
            setTimeout(() => {
                setHasError(false);
            }, 3000);
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
                    <button disabled={disable} onClick={handleSaveClick}>Save</button>
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

        </div>
    );
}

export default AddClientPopUp