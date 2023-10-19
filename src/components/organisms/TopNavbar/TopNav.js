'use client'
import React, { useState, useEffect, useRef } from "react";
import styles from "./TopNavBar.module.css";
import firebase from "../../../firebase/config";
import { IoExitOutline } from "react-icons/io5";
import { CgClose } from "react-icons/cg";
import { MdNotificationsActive, MdOutlineNotificationsActive } from "react-icons/md";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { usePathname } from "next/navigation";

const TopNav = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [userProfilePicURL, setUserProfilePicURL] = useState(null);
  const profilePicRef = useRef(null);
  const notificationIconRef = useRef(null);
  const notificationPopupRef = useRef(null);
  const url = usePathname();

  const closePopups = () => {
    setShowLogout(false);
    setShowNotification(false);
  };

  const toggleLogout = () => {
    setShowLogout(!showLogout);
    setShowNotification(false);
  };

  const toggleNotification = () => {
    setShowNotification(!showNotification);
    setShowLogout(false);
    if (showNotification) {
      const db = firebase.firestore();
      db.collection("notifications")
        .where("recipient", "==", "admin")
        .where("messageStatus", "==", false)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            db.collection("notifications").doc(doc.id).update({
              messageStatus: true,
            });
          });
        });
    }
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    window.location.href = "/login";
  };

  useEffect(() => {
    const auth = getAuth(firebase);
    const db = firebase.firestore();

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUserProfilePicURL(user ? user.photoURL : null);
    });

    const unsubscribeNotifications = db
      .collection("notifications")
      .where("recipient", "==", "admin")
      .onSnapshot((snapshot) => {
        const allNotifications = snapshot.docs.map((doc) => doc.data());
        const unReadCount = allNotifications.filter((notification) => !notification.messageStatus).length;

        const groupedNotifications = allNotifications.reduce((acc, notification) => {
          const date = new Date(notification.sendAt.seconds * 1000);
          const formattedDate = `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })} ${date.getFullYear()}`;

          acc[formattedDate] = acc[formattedDate] || [];
          acc[formattedDate].push(notification);
          return acc;
        }, {});

        const sortedGroupedNotifications = Object.keys(groupedNotifications).sort().reverse();

        const finalData = sortedGroupedNotifications.reduce((acc, key) => {
          acc[key] = groupedNotifications[key];
          return acc;
        }, {});

        setNotifications(finalData);
        setUnreadNotifications(unReadCount);
      });

    return () => {
      unsubscribeAuth();
      unsubscribeNotifications();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profilePicRef.current &&
        !profilePicRef.current.contains(e.target) &&
        notificationIconRef.current &&
        !notificationIconRef.current.contains(e.target) &&
        notificationPopupRef.current &&
        !notificationPopupRef.current.contains(e.target)
      ) {
        closePopups();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.topNav}>
      {url !== "/client-details" && url !== "/login" && url !== "/client-details/application" && url !== "/client-details/application/stage" && (
        <>
          <div className={styles.notification}>
            <div className={styles.notificationIcon} onClick={toggleNotification}></div>
            {showNotification && (
              <div className={styles.notificationContainer} ref={notificationPopupRef}>
                <div className={styles.notificationHeader}>
                  <h2>Notifications</h2>
                  <div className={styles.closeIcon}>
                    <CgClose onClick={toggleNotification} />
                  </div>
                </div>
                <div className={styles.notificationBody}>
                  {Object.keys(notifications).map((date) => (
                    <div key={date}>
                      <p className={styles.notificationDate}>{date}</p>
                      {notifications[date].map((notification) => (
                        <p className={styles.notificationMessage}>
                          {notification.messageStatus ? <MdOutlineNotificationsActive /> : <MdNotificationsActive />}{" "}
                          {notification.message}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div
            style={{
              backgroundImage: `url(${userProfilePicURL})`,}}
            className={styles.profilePic}
            ref={profilePicRef}
            onClick={toggleLogout}
          >
            {showLogout && (
              <button onClick={handleLogout} className={styles.logoutButton}>
                <IoExitOutline />
                Log Out
              </button>
            )}
          </div>
          {(showLogout || showNotification) && <div className={styles.popUpContainer}></div>}
        </>
      )}
    </div>
  );
};

export default TopNav;
