import React, { createContext, useState } from 'react';

export const UserContext = createContext('');

// eslint-disable-next-line
export default ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('userData'))
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
