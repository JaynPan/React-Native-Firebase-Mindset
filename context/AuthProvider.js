import React, {
  useState, useContext, createContext, useMemo, useEffect,
} from 'react';
import * as firebase from 'firebase';

const Auth = createContext(null);
export const useAuth = () => useContext(Auth);

export default function AuthProvider({ children }) {
  const [uid, setUid] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [refetchUserInfo, setRefetchUserInfo] = useState(false);

  const getCurrentSignInUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      } else {
        firebase.auth().signOut();
      }
    });
  };

  const getUserInfo = async () => {
    if (!uid) {
      await getCurrentSignInUser();
    }

    const doc = await firebase.firestore().collection('users').doc(uid).get();
    setUserInfo(doc.data());
  };

  useEffect(() => {
    getUserInfo();
  }, [uid]);

  useEffect(() => {
    if (refetchUserInfo) {
      getUserInfo();
      setRefetchUserInfo(false);
    }
  }, [refetchUserInfo]);

  const authDataValue = useMemo(() => (
    { uid, userInfo, setRefetchUserInfo }), [uid, userInfo, setRefetchUserInfo]);

  return (
    <Auth.Provider value={{ ...authDataValue, setUid }}>
      {children}
    </Auth.Provider>
  );
}
