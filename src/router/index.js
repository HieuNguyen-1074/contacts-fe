import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SignPage from '../pages/SignPage';
import AuthProvider from '../AuthProvider';
import ProtectRouter from './ProtectRouter';

export default function Router() {
  //create browser router
  const routers = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectRouter>
          <p>this is root</p>
        </ProtectRouter>
      ),
    },
    {
      path: '/home',
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
  ]);
  console.log(routers);
  return (
    <AuthProvider>
      <RouterProvider router={routers} />
    </AuthProvider>
  );
}
