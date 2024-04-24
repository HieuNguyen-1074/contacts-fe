import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SignPage from '../pages/SignPage';
import ProtectRouter from './ProtectRouter';

export default function Router() {
  //create browser router
  const routers = createBrowserRouter([
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
  ]);
  return <RouterProvider router={routers} />;
}
