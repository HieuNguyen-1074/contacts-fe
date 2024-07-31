import React, { useCallback } from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useMatch,
  useNavigate,
} from 'react-router-dom';
import Cookies from 'js-cookie';

import HomePage from '../pages/HomePage';
import SignPage from '../pages/SignPage';
import ProtectRouter from './ProtectRouter';

import { IoIosLogOut } from 'react-icons/io';
import { REFRESH_TOKEN_NAME, TOOKENNAME } from '../api/constant';
import { openToast } from '../lib/toast';

export default function Router() {
  //create browser router
  const routers = createBrowserRouter([
    {
      path: '/',
      element: (
        <Layout>
          <Outlet /> {/* Child routes will render here */}
        </Layout>
      ),
      children: [
        {
          path: '/',
          element: (
            <ProtectRouter>
              <HomePage />
            </ProtectRouter>
          ),
        },

        {
          path: '/signin',
          element: <SignPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routers} />;
}

function Layout({ children }) {
  const isLoginPage = useMatch('/signin');
  const navigate = useNavigate();

  // event
  const handleLogout = useCallback(() => {
    navigate('/signin', { replace: true });
    Cookies.remove(TOOKENNAME);
    Cookies.remove(REFRESH_TOKEN_NAME);
    openToast({
      message: 'Logout done !',
      type: 'success',
    });
  }, []);
  return (
    <>
      {isLoginPage ? (
        <></>
      ) : (
        <div className='flex justify-end -mr-2 mt-4'>
          <IoIosLogOut
            onClick={handleLogout}
            size={35}
          />
        </div>
      )}
      {children}
    </>
  );
}
