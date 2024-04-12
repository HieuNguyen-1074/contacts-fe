import { createContext, useContext, useEffect, useState } from 'react';
import { user_api } from './api/users';
import Cookies from 'js-cookie';
import { TOOKENNAME } from './api/constant';

export const userContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    /// async fucnc
    const getUserData = async () => {
      try {
        const userData = await user_api.getUser();
        setUser(userData);
      } catch (error) {
        Cookies.remove(TOOKENNAME);
        setUser(null);
      }
    };

    // main scope
    Cookies.get(TOOKENNAME) && getUserData();
    return () => {};
  }, []);

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
