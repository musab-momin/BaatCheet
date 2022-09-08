import React from "react";
import { Container, Loader } from 'rsuite';
import { useNavigate } from "react-router";
import { useProfile } from "../context/Profile.context";

const PublicRoute = ({ children }) => {

  const { profile, isLoading } = useProfile();
  const navigate = useNavigate();

  if(isLoading && !profile){
    return <Container>
    <Loader center vertical size='md' content='Loading...' speed='slow'  />
  </Container>
  }

  if(profile && !isLoading){
    return navigate('/')
  }

  return(
    <>
      { children }
    </>
  );
};

export default PublicRoute;
