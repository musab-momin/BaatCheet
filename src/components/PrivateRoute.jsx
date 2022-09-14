import React from 'react';
import { Navigate } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../context/Profile.context';

const PrivateRoute = ({ children }) => {
  const {profile, isLoading} = useProfile();

  if(isLoading && !profile){
    return <Container>
      <Loader center vertical size='md' content='Loading...' speed='slow'  />
    </Container>
  }
  
  if(!profile && !isLoading){
    return  <Navigate replace to='/signin' />
  }

  return(
    <>
        { children }
    </>
  )
}
export default PrivateRoute;
