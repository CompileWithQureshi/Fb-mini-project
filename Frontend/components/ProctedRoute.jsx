import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../hooks/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    // Show a loading spinner or null until initialization completes
    return <div>Loading...</div>;
  }

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  return children; // Render the protected component
};

export default ProtectedRoute;
