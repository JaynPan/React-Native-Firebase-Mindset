import React, {
  useState, useContext, createContext, useMemo,
} from 'react';

const Auth = createContext(null);
export const useAuth = () => useContext(Auth);

export default function AuthProvider({ children }) {
  const [uid, setUid] = useState(null);

  const authDataValue = useMemo(() => (
    {uid}), [uid]);

  return (
    <Auth.Provider value={{ ...authDataValue, setUid }}>
      {children}
    </Auth.Provider>
  );
}