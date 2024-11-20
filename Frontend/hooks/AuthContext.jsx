import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken); // Set token if it exists in localStorage
    }
  }, []);

  const logins = (newToken) => {
    if (!newToken) {
      console.error("Token is required for login.");
      return;
    }
    setToken(newToken);
    localStorage.setItem("token", newToken); // Save token to localStorage
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ token, logins, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
