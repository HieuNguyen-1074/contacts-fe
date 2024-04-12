import React, { useEffect } from 'react';

import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';

import { user_api } from '../api/users';
import Cookies from 'js-cookie';
import { TOOKENNAME } from '../api/constant';

function ProtectRouter({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const tooken = Cookies.get(TOOKENNAME);
    if (!user && !tooken) {
      navigate('/signin', { replace: true });
    }
  }, [user, navigate]);
  return children;
}

export default ProtectRouter;
