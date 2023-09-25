import React, { useState } from "react";
import styles from "./TopNavBar.module.css";
import firebase from "../../../firebase/config";

const TopNav = () => {
  const [showLogout, setShowLogout] = useState(false);
  const userProfilePicURL = localStorage.getItem("user_photoURL");

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    localStorage.removeItem("user_photoURL");
    window.location.href = "/login";
  };

  return (
    <div className={styles.topNav}>
      <p className={styles.notification}></p>
      {/* Profile picture */}
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
            Log Out
          </button>
        )}
      </p>
    </div>
  );
};

export default TopNav;
