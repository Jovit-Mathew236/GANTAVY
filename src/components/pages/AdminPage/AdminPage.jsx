'use client'
import React, { useState } from 'react'
import styles from './Admin.module.css'
import Edit from '../../atom/svgs/Edit'
import Delete from '../../atom/svgs/Delete'

const AdminPage = () => {
  const [popUp, setPopUp] = useState(false)
  const handleCancelClick = () => {
    setPopUp(false);
  };
  return (
    <div className={styles.adminPage}>

      {popUp && <div className={styles.addAdminPopUp}>
        <div className={styles.popUpContainer}>
          <h1>&nbsp;&nbsp;&nbsp; Add email</h1>
          <input type="text" id="" name='email' placeholder="example@gmail.com" autoComplete="email" />
          <div className={styles.btnS}>
            <button onClick={handleCancelClick}>Cancel</button>
            <button>Add</button>
          </div>
        </div>
      </div>}

      <h1>Admin</h1>

      <div className={styles.adminContainer}>

        <div className={styles.adminFiled}>
          <input type="text" id="" name='email' value={"jovitmathew236@gmail.com"} disabled autoComplete="email" />
          <div className={styles.adminControl}>
            <p><Edit /></p>
            <p><Delete /></p>
          </div>
        </div>

        <div className={styles.adminFiled}>
          <input type="text" id="" name='email' value={"jovitmathew236@gmail.com"} disabled autoComplete="email" />
          <div className={styles.adminControl}>
            <p><Edit /></p>
            <p><Delete /></p>
          </div>
        </div>

        <div className={styles.adminFiled}>
          <input type="text" id="" name='email' value={"jovitmathew236@gmail.com"} disabled autoComplete="email" />
          <div className={styles.adminControl}>
            <p><Edit /></p>
            <p><Delete /></p>
          </div>
        </div>


      </div>

      <ClientButton setPopUP={setPopUp} />
    </div>
  )
}

const ClientButton = ({ setPopUP }) => {
  const handleAddNewClick = () => {
    setPopUP(true);
  };

  return (
    <button onClick={handleAddNewClick}>
      <p>Add new</p>
    </button>
  );
};
// const CancelButton = ({ setPopUP }) => {
//   const handleCancelClick = () => {
//     setPopUP(false);
//   };

//   return (
//     <button onClick={handleCancelClick}>Cancel</button>
//   );
// };

export default AdminPage;




// return (
//   <div className={styles.adminPage}>
//     <h1>Admin</h1>

//     <div className={styles.adminContainer}>
//       <AdminField email="jovitmathew236@gmail.com" />
//       <AdminField email="another@example.com" />
//       {/* Add more AdminField components as needed */}
//     </div>

//     <ClientButton />
//   </div>
// );

// const AdminField = ({ email }) => {
//   const handleEditClick = () => {
//     console.log(`Editing ${email}`);
//   };

//   const handleDeleteClick = () => {
//     console.log(`Deleting ${email}`);
//   };

//   return (
//     <div className={styles.adminField}>
//       <input
//         type="text"
//         value={email}
//         disabled
//         autoComplete="email"
//       />
//       <div className={styles.adminControl}>
//         <p onClick={handleEditClick}><Edit /></p>
//         <p onClick={handleDeleteClick}><Delete /></p>
//       </div>
//     </div>
//   );
// };


