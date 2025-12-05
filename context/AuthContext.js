"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Load user from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem("bz-user");
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(saved));
    }
    setLoadingUser(false);
  }, []);

  // Login (save user data)
  const login = (data) => {
    localStorage.setItem("bz-user", JSON.stringify(data));
    setUser(data);
  };

  // Update user info locally (like editing profile)
  const updateUser = (data) => {
    const updated = { ...user, ...data };
    localStorage.setItem("bz-user", JSON.stringify(updated));
    setUser(updated);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("bz-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingUser,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
