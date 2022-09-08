import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useProfile } from '../context/Profile.context';

const PrivateRoute = ({ children }) => {
  const isLoggedin = useProfile();
  const navigate = useNavigate();
  
  
  useEffect(()=>{
    if(!isLoggedin)
        navigate('/signin')
  }, [isLoggedin,navigate])

  return(
    <>
        { children }
    </>
  )
}
export default PrivateRoute;
