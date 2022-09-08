import React from 'react';
import { useNavigate } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../context/Profile.context';

const PrivateRoute = ({ children }) => {
  const {profile, isLoading} = useProfile();
  const navigate = useNavigate();
  
  if(isLoading && !profile){
    return <Container>
      <Loader center vertical size='md' content='Loading...' speed='slow'  />
    </Container>
  }
  
  if(!profile && !isLoading){
    return  navigate('/signin')
  }

  return(
    <>
        { children }
    </>
  )
}
export default PrivateRoute;
