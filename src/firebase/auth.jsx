// utils/auth.js
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import firebase from "./config";

const CheckAuth = ({ callback }) => {
  const auth = getAuth(firebase);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        callback(user);
        console.log("User is signed in");
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, callback, router]);

  return null;
};

export default CheckAuth;
