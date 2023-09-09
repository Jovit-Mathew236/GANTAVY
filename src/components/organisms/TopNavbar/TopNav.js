import React from "react";
import styles from "./TopNavBar.module.css";
import Notification from "../../atom/svgs/Notification";

const TopNav = () => {
  return (
    <div className={styles.topNav}>
      <p className={styles.notification}></p>
      <p className={styles.profilePic}></p>
    </div>
  );
};

export default TopNav;
