import React, {
  useState, useContext, createContext, useMemo, useEffect
} from 'react';
import * as firebase from 'firebase';

const Auth = createContext(null);
export const useAuth = () => useContext(Auth);

export default function AuthProvider({ children }) {
  const [uid, setUid] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [refetchUserInfo, setRefetchUserInfo] = useState(false);

  const getUserInfo = async () => {
    const doc = await firebase.firestore().collection('users').doc(uid).get();
    setUserInfo(doc.data())
  };

  useEffect(() => {
    if(uid) {
      getUserInfo();
    }
  }, [uid])

  useEffect(() => {
    if(refetchUserInfo) {
      getUserInfo();
      setRefetchUserInfo(false)
    }
  }, [refetchUserInfo]);

  const authDataValue = useMemo(() => (
    {uid, userInfo, setRefetchUserInfo}), [uid, userInfo, setRefetchUserInfo]);

  return (
    <Auth.Provider value={{ ...authDataValue, setUid }}>
      {children}
    </Auth.Provider>
  );
}