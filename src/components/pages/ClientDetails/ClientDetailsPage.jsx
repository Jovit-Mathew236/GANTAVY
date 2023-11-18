"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./ClientDetails.module.css";
import firebase from "../../../firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "../../molecules/Loading";
import Topnav from "../../molecules/Topnav";
import BottomIcon from "../../molecules/BottomIcon";
import New from "../../atom/svgs/New";
import AddApplicationPopUp from "../../organisms/PopUps/AddApplicationPopUp";
import AddClientPopUp from "../../organisms/PopUps/AddClientPopUp";
import { countryData } from "../../molecules/Countries";
import Card from "../../organisms/Card/Card";
import DeleteConfirmationPopup from "../../organisms/PopUps/DeleteConfirmationPopup";
import Page404 from "../../molecules/Page404";
import MessageSection from "../../molecules/ChatBox";
import DetailsHeader from "../../molecules/ClientDetailsHeader";

const ClientDetailsPage = () => {
  const [popUp, setPopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [editClientPopUp, setEditClientPopUp] = useState(false);
  const [country, setCountry] = useState("");
  const [visa, setVisa] = useState("");
  const [paymentType, setPaymentType] = useState("upfront"); // Default to 'upfront'
  const [installment, setInstallment] = useState(0);
  const [clientDetails, setClientDetails] = useState(null);
  const [clientApplicationDetails, setClientApplicationDetails] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const id = parseInt(searchParams.get("id"));
  const [disable, setDisable] = useState(false);

  const handleCancelClick = () => {
    setPopUp(false);
  };

  const generateApplicationID = () => {
    const min = 10000; // Minimum 5-digit number
    const max = 99999; // Maximum 5-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const fetchClientDetails = async (clientId) => {
    try {
      const snapshot = await firebase.firestore().collection("clients").where("clientId", "==", clientId).get();
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const clientsWithCountries = await Promise.all(
        data.map(async (doc) => {
          const snapshot = await firebase.firestore().collection("applications").where("clientid", "==", doc.clientId).get();
          const allDocs = snapshot.docs.map((infos) => ({
            ...infos.data(),
            id: infos.id,
          }));
          const countries = allDocs.map((doc) => doc.country);
          return { ...doc, country: countries };
        })
      );
      setClientDetails(clientsWithCountries[0]);
    } catch (error) {
      console.error("Error fetching client details: ", error);
    }
  };

  const fetchNotifications = (clientId) => {
    firebase.firestore().collection("notifications").where("recipient", "==", clientId).get().then((snapshot) => {
      const allDocs = snapshot.docs.map((infos) => ({
        ...infos.data(),
        id: infos.id,
      }));
      const sorted = allDocs.sort((a, b) => b.sendAt - a.sendAt);
      setNotification(sorted);
    }).catch((error) => {
      console.error("Error fetching notifications: ", error);
    });
  };

  const fetchClientApplicationDetails = (clientId) => {
    firebase.firestore().collection("applications").where("clientid", "==", clientId).orderBy("createdAt", "desc").get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClientApplicationDetails(data);
      setLoading(false);
    }).catch((error) => {
      console.error("Error fetching client application details: ", error);
    });
  };

  useEffect(() => {
    const auth = getAuth(firebase);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/login");
      }
    });
  }, []);

  useEffect(() => {
    if (id && id !== "") {
      fetchClientDetails(id);
      fetchNotifications(id);
      fetchClientApplicationDetails(id);
    }
  }, [id]);

  const handleSendClick = () => {
    // validation
    if (title.trim() === "" || message.trim() === "") {
      setHasError(true);
      return;
    }
    const currentDate = Date.now();
    firebase.firestore().collection("notifications").add({
      title,
      message,
      recipient: id,
      messageStatus: false,
      sendAt: new Date(),
      sender: "admin",
    }).then(() => {
      setTitle("");
      setMessage("");
      setNotification((prev) => [
        {
          title,
          message,
          recipient: id,
          messageStatus: false,
          sendAt: {
            seconds: Math.floor(currentDate / 1000),
            nanoseconds: (currentDate % 1000) * 1000000,
          },
          sender: "admin",
        },
        ...prev,
      ]);
    });
  };

  const handleSaveClick = () => {
    setDisable(true);
    // validation
    if (country.trim() === "" || visa.trim() === "") {
      setHasError(true);
      setDisable(false);
      setTimeout(() => {
        setHasError(false);
      }, 3000);
      return;
    }
    // create a new application and check if there is an existing application with the same id
    let newApplicationID;
    do {
      newApplicationID = generateApplicationID();
    } while (
      clientApplicationDetails.some(
        (data) => data.applicationId === newApplicationID
      )
    );
    firebase.firestore().collection("applications").add({
      applicationId: newApplicationID,
      country,
      visatype: visa,
      paymenttype: paymentType,
      installment,
      clientid: id,
      createdAt: new Date(),
      completed: false,
    }).then((docRef) => {
      const currentDate = Date.now();
      setClientApplicationDetails((prev) => {
        return [
          {
            applicationId: newApplicationID,
            id: docRef.id,
            country,
            visatype: visa,
            paymenttype: paymentType,
            installment: parseInt(installment),
            clientid: id,
            createdAt: {
              seconds: Math.floor(currentDate / 1000),
              nanoseconds: (currentDate % 1000) * 1000000,
            },
          },
          ...prev,
        ];
      });
      setDisable(false);
      setPopUp(false);
    })
      .catch((error) => {
        console.error("Error adding application: ", error);
      });
  };

  const handleEditClient = (clientData) => {
    firebase.firestore().collection("clients").doc(clientDetails.id).update({
      ...clientData,
    }).then(() => {
      setClientDetails((prev) => {
        return {
          ...prev,
          ...clientData,
        };
      });
      setEditClientPopUp(false);
    }).catch((error) => {
      console.error("Error adding client data: ", error);
    });
  };

  return (
    <div className={styles.clientDetailsPage}>
      {loading && <Loading />}
      <Topnav
        id={id}
        collection={"clients"}
        where={"clientId"}
        setEditClientPopUp={setEditClientPopUp}
        deletion={"Client"}
        isBtn={false}
      />
      <BottomIcon setPopUp={setPopUp} icon={<New />} text={"Add new"} />

      {popUp && (
        <AddApplicationPopUp
          setCountry={setCountry}
          setVisa={setVisa}
          paymentType={paymentType}
          setPaymentType={setPaymentType}
          setInstallment={setInstallment}
          handlePaymentTypeChange={handlePaymentTypeChange}
          handleCancelClick={handleCancelClick}
          handleSaveClick={handleSaveClick}
          hasError={hasError}
          disable={disable}
        />
      )}

      {deletePopUp && (
        <DeleteConfirmationPopup
          setDeletePopUp={setDeletePopUp}
          clientApplicationDetails={clientApplicationDetails}
          clientDetails={clientDetails}
          router={router}
          setHasError={setHasError}
        />
      )}

      {editClientPopUp && (
        <AddClientPopUp
          setPopUp={setEditClientPopUp}
          onSave={handleEditClient} // Pass the onSave function
          id={id}
        />
      )}

      <div className={styles.detailsContainer}>
        <DetailsHeader
          clientDetails={clientDetails}
          setEditClientPopUp={setEditClientPopUp}
          setDeletePopUp={setDeletePopUp}
          countryData={countryData}
        />
        <hr />
        <MessageSection
          handleSendClick={handleSendClick}
          title={title}
          setTitle={setTitle}
          message={message}
          setMessage={setMessage}
          notification={notification}
        />
      </div>

      <div className={styles.applicationContainer}>
        <h1>Applications</h1>
        <div className={styles.applications}>
          {clientApplicationDetails.length !== 0 ? (
            clientApplicationDetails.map((data, i) => (
              <Card key={i} data={data} type="application" />
            ))
          ) : (
            <Page404 errMessage="No applications found" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsPage;
