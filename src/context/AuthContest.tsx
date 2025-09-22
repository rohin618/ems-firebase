import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";


interface AuthContextType {
  Auth: string | null;
  Role: string | null;
  login: (token: string, role: string, name: string | null) => void;
  logout: () => void;
  userName: string | null;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
}


interface AuthProviderProps {
  children: ReactNode;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [Auth, setAuth] = useState<string | null>(localStorage.getItem("Auth_token"));
  const [Role, setRole] = useState<string | null>(localStorage.getItem("role"));
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("Auth_token");
    const role = localStorage.getItem("role");
    if (token) setAuth(token);
    if (role) setRole(role);

  }, []);

  const login = (token: string, role: string,name: string | null) => {
    setAuth(token);
    setRole(role);
    setUserName(name);
    localStorage.setItem("Auth_token", token);
    localStorage.setItem("role", role);
  };

  const logout = () => {
    setAuth(null);
    setRole(null);
    localStorage.removeItem("Auth_token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ Auth, Role, login, logout,userName,setUserName }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
