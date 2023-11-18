// DetailsHeader.tsx
import React from "react";
import { MdEdit } from "react-icons/md";
import styles from "./molecules.module.css"; // Make sure to update the path accordingly
import Delete3 from "../atom/svgs/Delete3";

function DetailsHeader({
  clientDetails,
  setEditClientPopUp,
  setDeletePopUp,
  countryData,
}) {
  return (
    <div className={styles.detailsHeader}>
      <p className={styles.id}>#ID{clientDetails && clientDetails.clientId}</p>
      <h1>{clientDetails && clientDetails.name}</h1>
      <p className={styles.email}>{clientDetails && clientDetails.email}</p>
      <p className={styles.phone}>{clientDetails && clientDetails.phone}</p>
      <div className={styles.countries}>
        {clientDetails &&
          clientDetails.country.map((country, k) => {
            return (
              <p key={k} className={styles.country}>
                <img
                  width="20"
                  height="20"
                  src={`https://img.icons8.com/emoji/48/${countryData[
                    country
                  ].name
                    .split(" ")
                    .join("-")
                    .toLowerCase()}-emoji.png`}
                  alt={`${country}-emoji`}
                />
              </p>
            );
          })}
      </div>
      <div className={styles.buttons}>
        <button
          onClick={() => {
            setEditClientPopUp(true);
          }}
        >
          <MdEdit />
          Edit Profile
        </button>
        <button
          onClick={() => {
            setDeletePopUp(true);
          }}
        >
          <Delete3 />
          Delete Profile
        </button>
      </div>
    </div>
  );
}

export default DetailsHeader;
