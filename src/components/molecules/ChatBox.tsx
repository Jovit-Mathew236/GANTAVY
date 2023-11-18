// MessageSection.tsx
import React, { useState } from "react";
import styles from "./molecules.module.css";
import SendBlack from "../atom/svgs/SendBlack";

function MessageSection({
  handleSendClick,
  title,
  setTitle,
  message,
  setMessage,
  notification,
}) {
  function Notification({ data }) {
    const formattedDate = new Date(
      data.sendAt.seconds * 1000
    ).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <div className={styles.message}>
        <p className={styles.date}>{formattedDate}</p>
        <div className={styles.body}>
          <h2>{data.title}</h2>
          <p>{data.message}</p>
        </div>
        {data.length !== 0 ? <hr /> : null}
      </div>
    );
  }
  return (
    <div className={styles.messageSection}>
      <div className={styles.messageHeader}>
        <input
          type="text"
          placeholder="Caption"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button onClick={handleSendClick}>
          Send <SendBlack />
        </button>
      </div>

      <div className={styles.messageBody}>
        {notification.length !== 0 ? (
          notification.map((data, i) => <Notification key={i} data={data} />)
        ) : (
          <div className={styles.errContainer}>
            <p className={styles.errMessage}>
              <br />
              Send new message
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageSection;
