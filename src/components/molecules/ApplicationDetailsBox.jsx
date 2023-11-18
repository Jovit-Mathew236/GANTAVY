// ApplicationDetails.jsx
import React from "react";
import firebase from "../../firebase/config"; // Replace with the correct path
import styles from "./molecules.module.css"; // Update the path accordingly

const ApplicationDetailsBox = ({ clientApplicationDetails, docId, setClientApplicationDetails, countryData }) => {
    const formattedDate = (clientApplicationDetails) => {
        const date = new Date(clientApplicationDetails[0].createdAt.seconds * 1000);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const handleStatusChange = (e) => {
        setClientApplicationDetails([
            {
                ...clientApplicationDetails[0],
                completed: JSON.parse(e.target.value),
            },
        ]);

        firebase
            .firestore()
            .collection("applications")
            .doc(docId)
            .update({
                completed: JSON.parse(e.target.value),
            })
            .then(() => {
                console.log(`Status updated to ${JSON.parse(e.target.value)}`);
            })
            .catch((error) => {
                console.error("Error updating status: ", error);
            });
    };

    return (
        <div className={styles.applicationDetailsContainer}>
            <select
                name=""
                id=""
                value={clientApplicationDetails[0].completed}
                onChange={handleStatusChange}
            >
                <option value={false}>Not Completed</option>
                <option value={true}>Completed</option>
            </select>

            <div className={styles.id}>#{
                clientApplicationDetails.map((clientApplicationDetail) => {
                    return clientApplicationDetail.applicationId;
                })
            }</div>

            <h1>{
                clientApplicationDetails.map((clientApplicationDetail) => {
                    return clientApplicationDetail.visatype;
                })
            }</h1>
            <h1 className={styles.country_name}>{
                clientApplicationDetails.map((clientApplicationDetail) => {
                    return (countryData[clientApplicationDetail.country].name);
                })}
                <p className={styles.countryIcon}>
                    <img
                        width="15"
                        height="15"
                        src={`https://img.icons8.com/emoji/48/${countryData[clientApplicationDetails[0].country].name.split(' ').join('-').toLowerCase()}-emoji.png`}
                        alt={`${clientApplicationDetails[0].country}-emoji`}
                    />
                </p>
            </h1>

            <p className={styles.paymentType}>{
                clientApplicationDetails.map((clientApplicationDetail) => {
                    return clientApplicationDetail.paymenttype;
                })
            }{clientApplicationDetails[0].installment ? <span>{clientApplicationDetails[0].installment}</span> : null}</p>

            <p className={styles.createdDate}>Created on {formattedDate(clientApplicationDetails)}</p>
        </div>
    );
};

export default ApplicationDetailsBox;
