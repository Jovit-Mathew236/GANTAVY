'use client'
import React, { useEffect, useState } from 'react'
import styles from './Admin.module.css'
import Edit from '../../atom/svgs/Edit'
import Delete from '../../atom/svgs/Delete'
import firebase from '../../../firebase/config'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Loading from '../../molecules/Loading'
import checkAuth from '@/src/utils/auth'

const AdminPage = () => {
  const [popUp, setPopUp] = useState(false)
  const [user, setUser] = useState(null);
  const [admins, setAdmins] = useState([])
  const [email, setEmail] = useState('')
  const [updatedEmail, setUpdatedEmail] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const handleCancelClick = () => {
    setPopUp(false);
    setEmail('')
    setUpdatedEmail('')
  };

  useEffect(() => {
    checkAuth((user) => {
      setUser(user);
    })
  }, []);

  useEffect(() => {
    firebase.firestore().collection('admins').get().then((snapshot) => {
      const allDocs = snapshot.docs.map((infos) => {
        return {
          ...infos.data(),
          id: infos.id,
        };
      });

      setAdmins(allDocs)
      setLoading(false)
    })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.adminPage}>
      {loading && <Loading />}
      {popUp && <div className={styles.addAdminPopUp}>
        <div className={styles.popUpContainer}>
          <h1>&nbsp;&nbsp;&nbsp; Add email</h1>
          <input type="text" id="" name='email' placeholder="example@gmail.com" value={updatedEmail == '' ? email : updatedEmail} autoComplete="email" onChange={(e) => {
            updatedEmail == '' ? setEmail(e.target.value) : setUpdatedEmail(e.target.value)
          }} />
          <div className={styles.btnS}>
            <button onClick={handleCancelClick}>Cancel</button>
            {!isEdit ? <button
              onClick={() => {
                setPopUp(false)
                firebase.firestore().collection('admins').add({
                  email: email,
                  addedAt: new Date(),
                  isSuperAdmin: false
                }).then(() => {
                  setAdmins((prev) => {
                    return [...prev, { email: email }]
                  })
                }).then(() => {
                  setEmail('')
                })
              }}
            >Add</button>
              : <button
                onClick={() => {
                  setPopUp(false);
                  firebase
                    .firestore()
                    .collection('admins')
                    .where('email', '==', email)
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                        doc.ref
                          .update({
                            email: updatedEmail,
                            addedAt: new Date(),
                            isSuperAdmin: false,
                          })
                          .then(() => {
                            setAdmins((prev) => {
                              return prev.map((item) => {
                                if (item.email == email) {
                                  item.email = updatedEmail
                                }
                                return item
                              })
                            })
                              .then(() => {
                                setEmail('')
                              })
                          })
                          .catch((error) => {
                            console.error('Error updating document: ', error);
                          });
                      });
                    })
                    .catch((error) => {
                      console.error('Error retrieving documents: ', error);
                    });
                }}

              >Update</button>

            }
          </div>
        </div>
      </div>}

      <h1>Admin</h1>

      <div className={styles.adminContainer}>

        {admins.map((admin, i) => (
          <div key={i} className={styles.adminFiled}>
            <input type="text" id="" name='email' value={admin.email} disabled autoComplete="email" />
            <div className={styles.adminControl}>
              <p onClick={() => {
                setPopUp(true)
                setEmail(admin.email)
                setUpdatedEmail(admin.email)
                setIsEdit(true)
              }}><Edit /></p>
              <p onClick={() => {
                firebase.firestore().collection('admins').where('email', '==', admin.email).get().then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    if (doc.data().isSuperAdmin) {
                      setIsSuperAdmin(true)
                      setTimeout(() => {
                        setIsSuperAdmin(false)
                      }, 30000);
                      return
                    }
                    doc.ref.delete().then(() => {
                      setAdmins((prev) => {
                        return prev.filter((item) => {
                          return item.email != admin.email
                        })
                      })
                      console.log('Document successfully deleted!');
                    }).catch((error) => {
                      console.error('Error removing document: ', error);
                    });
                  });
                }).catch((error) => {
                  console.log('Error getting documents: ', error);
                });
              }}><Delete /></p>
            </div>
          </div>
        ))

        }

      </div>
      {isSuperAdmin && <div class="error_message flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
        <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span class="sr-only">Info</span>
        <div>
          <span class="font-medium">Sorry</span> You can't delete super admin
        </div>
      </div>}
      <ClientButton setPopUP={setPopUp} setIsEdit={setIsEdit} setEmail={setEmail} setUpdatedEmail={setUpdatedEmail} />
    </div>
  )
}

const ClientButton = ({ setPopUP, setIsEdit, setEmail, setUpdatedEmail }) => {
  const handleAddNewClick = () => {
    setIsEdit(false)
    setPopUP(true);
    setEmail('')
    setUpdatedEmail('')
  };

  return (
    <>
      <button onClick={handleAddNewClick}>
        <p>Add new</p>
      </button>
    </>
  );
};


export default AdminPage;