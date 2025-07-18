import React, { createContext, useEffect, useState } from "react";
import { serverLinks } from "../constants";
import axios from "axios";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState("");
  useEffect(() => {
    getUserProfile();
    async function getUserProfile() {
      try {
        const res = await axios.get(serverLinks.profile, {
          withCredentials: true,
        });

        const data = res.data;

        if (data) {
          console.log("data before setUserInfo", data);
          setUserInfo(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, []);
  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
