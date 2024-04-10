import React from 'react';
import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ProtectRouter({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/signin', { replace: true });
    }
  }, [user, navigate]);
  return children;
}

export default ProtectRouter;
