import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './AuthContest';

interface RouteProtectedProps {
  children: React.ReactNode;
  role: 'HR' | 'EMP'; // limit roles
}

const  RouteProtected: React.FC<RouteProtectedProps> = ({ children, role }) => {
  const { Auth, Role } = useAuthContext();
  console.log(Auth, Role);
  // Not logged in → redirect
  if (!Auth) {
    return <Navigate to="/login" replace />;
  }

  // Admin can access both Admin and User routes
  if (Role === 'HR' && role === 'HR') {
    return <>{children}</>;
  }

  // User can only access User routes
  if (Role === 'EMP' && role === 'EMP') {
    return <>{children}</>;
  }

  // Unauthorized → go back or send to "403 Forbidden" page
  return <Navigate to="/ErrorPage" replace />;
};

export default RouteProtected;
