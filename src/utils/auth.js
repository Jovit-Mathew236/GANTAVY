// utils/auth.js
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import firebase from '../firebase/config'

const checkAuth = (callback) => {
  const auth = getAuth(firebase);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user);
    } else {
      const router = useRouter();
      router.push('/login');
    }
  });
};

export default checkAuth;
