import { createContext, useEffect, useMemo, useState } from "react";

export const authContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const userdata = localStorage.getItem("user");
  useMemo(() => {
    setUser(JSON.parse(userdata));
  }, [userdata]);
  useEffect(() => {
    console.log(user);
  }, [user]);
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    logout,
  };
  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
