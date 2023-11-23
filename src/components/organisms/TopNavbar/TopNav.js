"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./TopNavBar.module.css";
import firebase from "../../../firebase/config";
import { IoExitOutline } from "react-icons/io5";
import { CgClose } from "react-icons/cg";
import { MdNotificationsActive } from "react-icons/md";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { usePathname } from "next/navigation";

const TopNav = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unReadNotifications, setUnReadNotifications] = useState(0);
  const [userProfilePicURL, setUserProfilePicURL] = useState(null); // Initialize with null
  // Add a ref to the profile pic div
  const profilePicRef = useRef(null);

  // Add a ref to the notification icon div
  const notificationIconRef = useRef(null);
  const notificationPopupRef = useRef(null);
  useEffect(() => {
    const closePopUpOnClickOutside = (e) => {
      if (
        profilePicRef.current &&
        notificationIconRef.current &&
        !profilePicRef.current.contains(e.target) &&
        !notificationIconRef.current.contains(e.target)
      ) {
        // If the click is outside both profile pic and notification icon, close the pop-up
        setShowLogout(false);
        setShowNotification(false);
      }
    };

    window.addEventListener("mousedown", closePopUpOnClickOutside);

    return () => {
      window.removeEventListener("mousedown", closePopUpOnClickOutside);
    };
  }, []);
  // Add a click event listener to the notification pop-up to prevent propagation
  useEffect(() => {
    const preventPropagation = (e) => {
      e.stopPropagation();
    };

    if (showNotification && notificationPopupRef.current) {
      notificationPopupRef.current.addEventListener(
        "click",
        preventPropagation
      );
    }

    return () => {
      if (showNotification && notificationPopupRef.current) {
        notificationPopupRef.current.removeEventListener(
          "click",
          preventPropagation
        );
      }
    };
  }, [showNotification]);

  const url = usePathname();

  const toggleLogout = () => {
    setShowLogout(!showLogout);
    setShowNotification(false); // Close the notification pop-up
  };

  const toggleNotification = () => {
    const db = firebase.firestore();
    {
      showNotification &&
        db
          .collection("notifications")
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
    setShowNotification(!showNotification);
    setShowLogout(false);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    // localStorage.removeItem("user_photoURL");
    window.location.href = "/login";
  };

  useEffect(() => {
    const auth = getAuth(firebase);
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, you can access their photoURL
        setUserProfilePicURL(user.photoURL);
      } else {
        // User is signed out
        setUserProfilePicURL(null);
      }
    });

    const db = firebase.firestore();
    const unsubscribeNotifications = db
      .collection("notifications")
      .where("recipient", "==", "admin")
      .onSnapshot((snapshot) => {
        const allNotifications = snapshot.docs.map((doc) => doc.data());
        setUnReadNotifications(
          allNotifications.filter((notification) => !notification.messageStatus)
            .length
        );
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

    // Combine unsubscribe functions
    return () => {
      unsubscribeAuth();
      unsubscribeNotifications();
    };
  }, []);

  if (
    url !== "/client-details" &&
    url !== "/login" &&
    url !== "/client-details/application" &&
    url !== "/client-details/application/stage"
  )
    return (
      <div className={styles.topNav}>
        <div className={styles.notification}>
          <div
            className={styles.notificationIcon}
            onClick={toggleNotification}
          ></div>
          {unReadNotifications > 0 && (
            <div className={styles.notificationCount}>
              <p>{unReadNotifications}</p>
            </div>
          )}
          {showNotification && (
            <div className={styles.notificationContainer}>
              <div className={styles.notificationHeader}>
                <h2>Notifications</h2>
                <div className={styles.closeIcon}>
                  <CgClose onClick={toggleNotification} />
                </div>
              </div>
              <div className={styles.notificationBody}>
                {Object.keys(notifications).map((date) => {
                  return (
                    <div key={date}>
                      <p className={styles.notificationDate}>{date}</p>
                      {notifications[date].map((notification) => {
                        return (
                          <p className={styles.notificationMessage}>
                            {notification.messageStatus ? (
                              <MdOutlineNotificationsActive />
                            ) : (
                              <MdNotificationsActive />
                            )}{" "}
                            {notification.message}
                          </p>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div
          style={{
            backgroundImage: `url(${userProfilePicURL})`,
          }}
          className={styles.profilePic}
          onClick={toggleLogout}
        >
          {showLogout && (
            <button onClick={handleLogout} className={styles.logoutButton}>
              <IoExitOutline />
              Log Out
            </button>
          )}
        </div>
        {(showLogout || showNotification) && (
          <div className={styles.popUpContainer}></div>
        )}
      </div>
    );
  else {
    return <></>;
  }
};

export default TopNav;
