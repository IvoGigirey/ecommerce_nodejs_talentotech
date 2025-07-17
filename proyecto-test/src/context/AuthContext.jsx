import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => localStorage.getItem("user") || null);
  const [isAdmin, setIsAdmin] = useState(() => {
    const stored = localStorage.getItem("isAdmin");
    return stored === "true";
  });

  const login = (username, adminStatus) => {
    localStorage.setItem("user", username);
    localStorage.setItem("isAdmin", adminStatus ? "true" : "false");
    setUser(username);
    setIsAdmin(adminStatus);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
