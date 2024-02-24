import AuthorizationPage from '@/pages/AuthorizationPage';
import DonationPage from '@/pages/DonationPage';
import ProfilePage from '@/pages/ProfilePage';
import RegisterEmailCodePage from '@/pages/RegisterEmailCodePage';
import RegisterEmailPage from '@/pages/RegisterEmailPage';
import RegisterPhonePage from '@/pages/RegisterPhonePage';
import RegisterPhoneCodePage from '@/pages/RegisterPhonePage copy';
import Root from '@/pages/Root';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ErrorPage from '@/pages/ErrorPage';
import DonationNotificationPage from '@/pages/DonationNotificationPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <DonationPage /> },
        { path: '/notification', element: <DonationNotificationPage /> },
        { path: '/profile', element: <ProfilePage /> },
        { path: '/auth', element: <AuthorizationPage /> },
        { path: '/auth/phone', element: <RegisterPhonePage /> },
        { path: '/auth/email', element: <RegisterEmailPage /> },
        { path: '/auth/email/pin', element: <RegisterEmailCodePage /> },
        { path: '/auth/phone/pin', element: <RegisterPhoneCodePage /> },
      ],
    },
  ],
  {
    basename: '/DonorSearch-Module',
  }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
