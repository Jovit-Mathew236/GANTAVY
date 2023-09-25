"use client";
import React from "react";
import styles from "./SideNavBar.module.css";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const url = usePathname();
  if (url != "/client-details")
    return (
      <nav className={styles.navBar}>
        <div className={styles.logo}></div>
        <hr />
        <div className={styles.menu}>
          <a
            href="/"
            style={url === "/" ? { color: "#141220", fontWeight: "bold" } : {}}
            className={styles.menuItem}
          >
            Home
          </a>
          <a
            href="/message"
            style={
              url === "/message" ? { color: "#141220", fontWeight: "bold" } : {}
            }
            className={styles.menuItem}
          >
            Message
          </a>
          <a
            href="/admin"
            style={
              url === "/admin" ? { color: "#141220", fontWeight: "bold" } : {}
            }
            className={styles.menuItem}
          >
            Admin
          </a>
          <a
            href="/help"
            style={
              url === "/help" ? { color: "#141220", fontWeight: "bold" } : {}
            }
            className={styles.menuItem}
          >
            Help
          </a>
        </div>

        <p className={styles.companyBrand}>Oronium</p>
      </nav>
    );
  else {
    return null;
  }
};

export default SideNav;
