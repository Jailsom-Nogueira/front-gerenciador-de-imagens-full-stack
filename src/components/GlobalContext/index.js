import React, { useState, createContext } from 'react';

export const GlobalContext = createContext();

export const GlobalStorage = ({ children }) => {
  const [imageDetailsId, setImageDetailsId] = useState('');

  return (
    <GlobalContext.Provider
      value={{
        imageDetailsId,
        setImageDetailsId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
