import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useProfile } from "../context/Profile.context";

const PublicRoute = ({ children }) => {

  const isLoggedIn = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if(isLoggedIn){
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  return(
    <>
      { children }
    </>
  );
};

export default PublicRoute;
