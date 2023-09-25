import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZkthW1rW_qszLHuEvmHKvWcrASYhZMbU",
  authDomain: "gantavy-immigration.firebaseapp.com",
  projectId: "gantavy-immigration",
  storageBucket: "gantavy-immigration.appspot.com",
  messagingSenderId: "548836707032",
  appId: "1:548836707032:web:4d8d53a80746ca42b1e5ad",
};

// const Firebase = firebase.initializeApp(firebaseConfig)
export default firebase.initializeApp(firebaseConfig);
// export { firebase as Firebase }
