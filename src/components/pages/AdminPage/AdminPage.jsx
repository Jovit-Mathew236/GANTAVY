import React from 'react'
import styles from './Admin.module.css'
import Edit from '../../atom/svgs/Edit'
import Delete from '../../atom/svgs/Delete'

const AdminPage = () => {
  return (
    <div className={styles.adminPage}>
      <h1>Admin</h1>

      <div className={styles.adminContainer}>
        
        <div className={styles.adminFiled}>
          <input type="text" value={"jovitmathew236@gmail.com"} disabled />
          <div className={styles.adminControl}>
            <p><Edit/></p>
            <p><Delete/></p>
          </div>
        </div>
        
        <div className={styles.adminFiled}>
          <input type="text" value={"jovitmathew236@gmail.com"} disabled />
          <div className={styles.adminControl}>
            <p><Edit/></p>
            <p><Delete/></p>
          </div>
        </div>
        
        <div className={styles.adminFiled}>
          <input type="text" value={"jovitmathew236@gmail.com"} disabled />
          <div className={styles.adminControl}>
            <p><Edit/></p>
            <p><Delete/></p>
          </div>
        </div>
        
      </div>

      <button>Add new</button>
    </div>
  )
}

export default AdminPage