/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

// 1. Creamos el contexto (No hace falta exportarlo, usamos el hook)
const AuthContext = createContext();

// 2. Creamos y exportamos el Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData, userToken) => {
    setUser(userData);
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Exportamos tu Custom Hook (¡La forma pro de usarlo!)
export const useAuth = () => useContext(AuthContext);