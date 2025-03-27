import { createContext, useState } from 'react';

export const HelloContext = createContext();

export const MyProvider = ({ children }) => {
  const [userName, setUserName] = useState('Hello, User!');

  return (
    <HelloContext.Provider value={{ userName, setUserName }}>
      {children}
    </HelloContext.Provider>
  );
};
