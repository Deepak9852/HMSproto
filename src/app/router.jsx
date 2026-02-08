import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Patients from '../pages/Patients';
import Doctors from '../pages/Doctors';
import Appointments from '../pages/Appointments';

function Layout() {
  return (
    <div className="app-root">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'patients', element: <Patients /> },
      { path: 'doctors', element: <Doctors /> },
      { path: 'appointments', element: <Appointments /> },
    ],
  },
]);

export default router;
