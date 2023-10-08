"use client";
import React, { useState, useEffect } from "react";
import styles from "./SideNavBar.module.css";
import { usePathname } from "next/navigation";
import { GoHome } from "react-icons/go";
import { TbMessage, TbProgressHelp } from "react-icons/tb";
import { RiAdminLine } from "react-icons/ri";

const SideNav = () => {
  const url = usePathname();

  const [marginTop, setMarginTop] = useState("0px");
  const [transform2, setTransform2] = useState("0deg");
  const [transform3, setTransform3] = useState("0deg");
  const [hamburgerIconDisplay, setHamburgerIconDisplay] = useState("block");

  const [sideNavDisplay, setSideNavDisplay] = useState("flex");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if window is defined (client-side)
      setSideNavDisplay(window.innerWidth > 830 ? "flex" : "none");
    }

    const handleResize = () => {
      if (typeof window !== "undefined") {
        // Check if window is defined (client-side)
        setSideNavDisplay(window.innerWidth > 830 ? "flex" : "none");
      }
    };

    if (typeof window !== "undefined") {
      // Check if window is defined (client-side)
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        // Check if window is defined (client-side)
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const animateHamburgerIcon = () => {
    setMarginTop(sideNavDisplay === "none" ? "-20px" : "0px");
    setTransform2(sideNavDisplay === "none" ? "45deg" : "0deg");
    setTransform3(sideNavDisplay === "none" ? "135deg" : "0deg");
    setHamburgerIconDisplay(sideNavDisplay === "none" ? "none" : "block");
  };

  const toggleSideNavBar = () => {
    if (window.innerWidth <= 830) {
      animateHamburgerIcon();
      setSideNavDisplay(sideNavDisplay === "flex" ? "none" : "flex");
    }
  };

  if (
    url !== "/client-details" &&
    url !== "/login" &&
    url !== "/client-details/application" &&
    url !== "/client-details/application/stage"
  )
    return (
      <>
        <div className={styles.menu_btn} onClick={toggleSideNavBar}>
          <p
            style={{ transform: `rotate(${transform2})` }}
            className={styles.lines}
          ></p>
          <p
            style={{
              transform: `rotate(${transform3})`,
              marginTop: `${marginTop}`,
            }}
            className={styles.lines}
          ></p>
        </div>
        <nav style={{ display: `${sideNavDisplay}` }} className={styles.navBar}>
        {/* <nav className={styles.navBar}> */}
          <div className={styles.logo}></div>
          <hr />
          <div className={styles.menu}>
            <a
              href="/"
              style={
                url === "/" ? { color: "#141220", fontWeight: "bold" } : {}
              }
              className={styles.menuItem}
            >
              <GoHome /> Home
            </a>
            <a
              href="/message"
              style={
                url === "/message"
                  ? { color: "#141220", fontWeight: "bold" }
                  : {}
              }
              className={styles.menuItem}
            >
              <TbMessage /> Message
            </a>
            <a
              href="/admin"
              style={
                url === "/admin" ? { color: "#141220", fontWeight: "bold" } : {}
              }
              className={styles.menuItem}
            >
              <RiAdminLine /> Admin
            </a>
            <a
              href="/help"
              style={
                url === "/help" ? { color: "#141220", fontWeight: "bold" } : {}
              }
              className={styles.menuItem}
            >
              <TbProgressHelp />
              Help
            </a>
          </div>

          <p className={styles.companyBrand}>Oronium</p>
        </nav>
      </>
    );
  else {
    return <></>;
  }
};

export default SideNav;
