import { createContext, useContext, useState } from 'react';

export const userContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(userContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
