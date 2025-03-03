import React, { useEffect, useState } from "react";
import { AuthContext } from "../authContext";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);


  useEffect(() => {
    // Check for existing user data and token
    const token = Cookies.get("userToken");

    if (token) {
      setToken(token);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [isAuthenticated]);

  function login(user, token) {
    setUser(user);
    setToken(token);
    setIsAuthenticated(true);
    // localStorage.setItem("user", JSON.stringify(user));
    Cookies.set("userToken", token);
    localStorage.setItem("isAuthenticated", true);
  }

  const router = useRouter();

  function logout() {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    // localStorage.setItem("isAuthenticated", false);
    localStorage.removeItem("isAuthenticated", false);
    Cookies.remove("userToken");
    router.push("/auth/login");
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
