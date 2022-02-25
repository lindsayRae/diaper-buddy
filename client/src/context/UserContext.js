import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

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
