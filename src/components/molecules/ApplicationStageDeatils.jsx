import React from "react";
import styles from "./molecules.module.css";
import Page404 from "./Page404";
import RightArrow from "../atom/svgs/RightArrow";

function ApplicationStageDeatils({ stageDetails, docId }) {
  return (
    <>
      {stageDetails.length !== 0 ?
        stageDetails.map((stageDetail) => {
          const formattedDate = new Date(stageDetail.addedAt.seconds * 1000).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });

          return (
            <div className={styles.stage}>
              <p className={styles.date}>{formattedDate ? formattedDate : ""}</p>
              <div className={styles.level}>
                <p>{stageDetail.stageNumber}</p>
              </div>
              <div>
                <h2 className={styles.head}>{stageDetail.heading}</h2>
                <p className={styles.status} style={!stageDetail.completed ? { color: "#FF6060" } : { color: "#8AB867" }}>{
                  stageDetail.completed ? 'Completed' : 'On going'
                }</p>
              </div>
              <a href={`/client-details/application/stage?id=${stageDetail.stageNumber}&docId=${docId}`}>
                <RightArrow />
              </a>
            </div>
          )
        })
        : (
          <Page404 errMessage={"Add new stages"} oops={false} />
        )
      }
    </>
  );
}

export default ApplicationStageDeatils;
