// src/components/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("chrono_user");
      if (stored) setUser(JSON.parse(stored));
    } catch (err) {
      setUser(null);
      localStorage.removeItem("chrono_user");
    }
  }, []);

  const login = (userObj) => {
    setUser(userObj);
    localStorage.setItem("chrono_user", JSON.stringify(userObj));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("chrono_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
