import React, { createContext, useContext } from 'react';
import useFetchData from './useFetchData';

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const { data:data1, loading:loading1, error:error1 } = useFetchData('https://lightyellow-crocodile-157579.hostingersite.com/jsoneditor/target.json');
  
  if (loading1) {
    return <div>Loading...</div>;
  }
  if (error1) {
    return <div>Error: {error1.message}</div>;
  }

  return (
    <DataContext.Provider value={{ data1, loading1, error1 }}>
      {children}
    </DataContext.Provider>
  );
};
