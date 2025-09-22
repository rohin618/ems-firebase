import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './AuthContest';

interface RouteProtectedProps {
  children: React.ReactNode;
  role: 'HR' | 'EMP'; // limit roles
  path: string;
}

const  RouteProtected: React.FC<RouteProtectedProps> = ({ children, role,path }) => {
  const { Auth, Role } = useAuthContext();
  console.log(Auth, Role);

  // Not logged in → redirect
  if (!Auth) {
    return <Navigate to="/login" replace />;
  }

  if(path==="/ems-firebase"){
    if(Role==="HR"){
      return <Navigate to="/hrinfo" replace />;
    }else{
      return <Navigate to="/emsinfo" replace />;
    }
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
