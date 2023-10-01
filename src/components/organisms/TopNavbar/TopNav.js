import React, { useState, useEffect } from "react";
import styles from "./TopNavBar.module.css";
import firebase from "../../../firebase/config";
import { IoExitOutline } from "react-icons/io5";
import { CgClose } from "react-icons/cg";
import { MdNotificationsActive } from "react-icons/md";
import { MdOutlineNotificationsActive } from "react-icons/md";

const TopNav = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const userProfilePicURL = localStorage.getItem("user_photoURL");

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    localStorage.removeItem("user_photoURL");
    window.location.href = "/login";
  };

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db
      .collection("notifications")
      .where("recipient", "==", "admin")
      .onSnapshot((snapshot) => {
        const allNotifications = snapshot.docs.map((doc) => doc.data());
        const groupedNotifications = allNotifications.reduce(
          (acc, notification) => {
            const date = new Date(notification.sendAt.seconds * 1000);
            const day = date.getDate();
            const month = date.toLocaleString("en-US", { month: "short" });
            const year = date.getFullYear();

            const key = `${day} ${month} ${year}`;
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(notification);
            return acc;
          },
          {}
        );
        const sortedGroupedNotifications = Object.keys(
          groupedNotifications
        ).sort((a, b) => {
          const dateA = new Date(a);
          const dateB = new Date(b);
          return dateB - dateA;
        });

        const finalData = sortedGroupedNotifications.reduce((acc, key) => {
          acc[key] = groupedNotifications[key];
          return acc;
        }, {});

        setNotifications(finalData);
      });
    return () => unsubscribe();
  }, []);
  console.log(notifications);
  return (
    <div className={styles.topNav}>
      <p className={styles.notification}>
        <p className={styles.notificationIcon} onClick={toggleNotification}></p>
        <span className={styles.notificationCount}>1</span>
        {showNotification && (
          <div className={styles.notificationContainer}>
            <div className={styles.notificationHeader}>
              <h2>Notifications</h2>
              <p className={styles.closeIcon}>
                <CgClose onClick={toggleNotification} />
              </p>
            </div>
            <div className={styles.notificationBody}>
              {Object.keys(notifications).map((date) => {
                return (
                  <>
                    <p className={styles.notificationDate}>{date}</p>
                    {notifications[date].map((notification) => {
                      return (
                        <p className={styles.notificationMessage}>
                          <MdNotificationsActive /> {notification.message}
                        </p>
                      );
                    })}
                  </>
                );
              })}
            </div>
          </div>
        )}
      </p>
      <p
        style={{
          background: `url(${userProfilePicURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={styles.profilePic}
        onClick={toggleLogout} // Toggle the button on profile picture click
      >
        {/* Logout button */}
        {showLogout && (
          <button onClick={handleLogout} className={styles.logoutButton}>
            <IoExitOutline />
            Log Out
          </button>
        )}
      </p>
      {(showLogout || showNotification) && (
        <div className={styles.popUpContainer}></div>
      )}
    </div>
  );
};

export default TopNav;
