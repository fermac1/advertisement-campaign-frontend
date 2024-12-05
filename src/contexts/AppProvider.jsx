import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const loadDataFromStorage = () => {
    const savedData = localStorage.getItem('data');
    return savedData ? JSON.parse(savedData) : null;
  };

  const [data, setData] = useState(loadDataFromStorage);

  useEffect(() => {
    if (data !== null) {
      localStorage.setItem('data', JSON.stringify(data));
    }
  }, [data]); 

  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
