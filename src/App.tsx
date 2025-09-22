import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './common/Header';
import ErrorPage from './common/ErrorPage';
import RouteProtected from './context/RouteProtected';
import { RouteConfig } from './RouteConfig';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <Header />

      <Routes>
        {RouteConfig.map(({ path, component: Component, protected: isProtected, role }, index) => (
          <Route
            key={index}
            path={path}
            element={
              isProtected ? (
                <RouteProtected role={role as 'HR' | 'EMP'} path={path}>
                  <Component />
                </RouteProtected>
              ) : (
                <Component />
              )
            }
          />
        ))}

        {/* Fallback */}
      
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <ToastContainer />
    </>
  );
};

export default App;
