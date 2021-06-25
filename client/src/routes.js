import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts';
import HomeView from 'src/views/home/HomeView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ChatbotView from 'src/views/chatbot/ChatbotView';

const routes = () => [
  {
    path: '/app',
    element: <DashboardLayout />,
    children: [
      {
        path: 'home',
        element: <HomeView />
      },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    children: [
      { path: '/app/chatbot', element: <ChatbotView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/home" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
