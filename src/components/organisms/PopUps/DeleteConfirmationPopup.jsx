// DeleteConfirmationPopup.jsx
import React from 'react';
import styles from './PopUps.module.css';
import firebase from '../../../firebase/config';

const DeleteConfirmationPopup = ({ setDeletePopUp, clientApplicationDetails, clientDetails, router, setHasError}) => {
    const handleNoClick = () => {
        setDeletePopUp(false);
    };

    const handleYesClick = async () => {
        try {
            // Delete all applications of the client
            for (const data of clientApplicationDetails) {
                await firebase.firestore().collection("applications").doc(data.id).delete();
            }

            // Delete the client after all applications have been deleted
            await firebase.firestore().collection("clients").doc(clientDetails.id).delete();

            // Once everything is deleted successfully, navigate to the desired location
            router.push("/");
        } catch (error) {
            console.error("Error deleting data: ", error);
            setHasError(true);
        }
    };

    return (
        <div className={styles.popUp}>
            <div className={styles.popUpContainer}>
                <h1>Are you sure you want to delete this client?</h1>
                <div className={styles.btnS}>
                    <button onClick={handleNoClick}>No</button>
                    <button onClick={handleYesClick}>Yes</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationPopup;
