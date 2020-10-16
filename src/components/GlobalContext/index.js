import React, { useState, createContext } from 'react';

export const GlobalContext = createContext();

export const GlobalStorage = ({ children }) => {
  const [imageDetailsId, setImageDetailsId] = useState('');
  const [collectionTittle, setCollectionTittle] = useState('');
  const [myCollections, setMyCollections] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        imageDetailsId,
        setImageDetailsId,

        collectionTittle,
        setCollectionTittle,

        myCollections,
        setMyCollections,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
