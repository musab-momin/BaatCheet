import React from "react";
import { Route, Routes } from "react-router";
import 'rsuite/dist/styles/rsuite-default.css'; 
import './styles/main.scss';
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";


function App() {
  return (
    <Routes>
      <Route exact path="/signin" element={<PublicRoute />} />
      <Route exact path="/" element={ <PrivateRoute /> } />
    </Routes>
  );
}

export default App;



// https://baatcheet-3c34f.firebaseapp.com/__/auth/handler