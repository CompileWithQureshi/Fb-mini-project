import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUserId) {
      setUser(storedUserId);
    }
    setLoading(false); // Set loading to false once data is restored
  }, []);

  const logins = (newToken, id) => {
    if (!newToken || !id) {
      console.error("Both token and user ID are required for login.");
      return;
    }
    setToken(newToken);
    localStorage.setItem("token", newToken);
    setUser(id);
    localStorage.setItem("userId", id);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUser(null);
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ token, logins, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
