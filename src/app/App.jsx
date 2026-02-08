import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import ErrorBoundary from '../components/ErrorBoundary';
import { AuthProvider } from '../auth/AuthContext';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  );
}
