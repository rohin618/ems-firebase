import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './AuthContest';

interface RouteProtectedProps {
  children: React.ReactNode;
  role: 'HR' | 'ems'; // limit roles
}

const RouteProtected: React.FC<RouteProtectedProps> = ({ children, role }) => {
  const { Auth, Role } = useAuthContext();

  // Not logged in → redirect
  if (!Auth) {
    return <Navigate to="/login" replace />;
  }

  // Admin can access both Admin and User routes
  if (Role === 'HR') {
    return <>{children}</>;
  }

  // User can only access User routes
  if (Role === 'ems' && role === 'ems') {
    return <>{children}</>;
  }

  // Unauthorized → go back or send to "403 Forbidden" page
  return <Navigate to="/unauthorized" replace />;
};

export default RouteProtected;
