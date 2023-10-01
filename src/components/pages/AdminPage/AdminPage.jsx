'use client'
import React, { useEffect, useState } from 'react'
import styles from './Admin.module.css'
import Edit from '../../atom/svgs/Edit'
import Delete from '../../atom/svgs/Delete'
import firebase from '../../../firebase/config'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Loading from '../../molecules/Loading'

const AdminPage = () => {
  const [popUp, setPopUp] = useState(false)
  const [user, setUser] = useState(null);
  const [admins, setAdmins] = useState([])
  const [email, setEmail] = useState('')
  const [updatedEmail, setUpdatedEmail] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(true);
  const handleCancelClick = () => {
    setPopUp(false);
  };

  useEffect(() => {
    const auth = getAuth(firebase);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
    });
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
                            console.log('Document successfully updated!');
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


export default AdminPage;