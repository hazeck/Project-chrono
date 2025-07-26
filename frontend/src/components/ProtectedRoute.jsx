// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <p style={{ color: "#c00" }}>Please log in to access this section.</p>;
  }
  return <>{children}</>;
}

export default ProtectedRoute;
