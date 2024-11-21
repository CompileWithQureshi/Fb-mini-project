import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(null);
  const [user,setUser]=useState(null)
  // const navigate=useNavigate()
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUserId) {
      setUser(storedUserId);
    }
  }, []);
  

  const logins = (newToken,id) => {
    if (!newToken || !id) {
      console.error("Both token and user ID are required for login.");
      return;
    }
    setToken(newToken);
    localStorage.setItem("token", newToken);
    setUser(id)
    localStorage.setItem('userId',id)
    // Save token to localStorage
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token"); 
    setUser(null)
    localStorage.removeItem('userId')
  };

  return (
    <AuthContext.Provider value={{ token, logins, logout,user }}>
      {children}
    </AuthContext.Provider>
  );
};
