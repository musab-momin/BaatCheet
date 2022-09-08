import React from 'react';
import { Route, Routes } from 'react-router';
import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Home from './pages/Home';
import Signin from './pages/Signin';
import { ProfileProvider } from './context/Profile.context';

function App() {
  return (
    <ProfileProvider>
      <Routes>
        <Route
          exact
          path="/signin"
          element={
            <PublicRoute>
              <Signin />
            </PublicRoute>
          }
        />
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </ProfileProvider>
  );
}

export default App;

// https://baatcheet-3c34f.firebaseapp.com/__/auth/handler
