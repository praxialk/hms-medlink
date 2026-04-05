import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [user_id, setUser_id] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [doctorId, setDoctorId] = useState(null);
  const [userType, setuserType] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        setIsLoggedIn,
        username,
        setUsername,
        user_id,
        setUser_id,
        isOpen,
        setIsOpen,
        doctorId,
        setDoctorId,
        userType,
        setuserType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
