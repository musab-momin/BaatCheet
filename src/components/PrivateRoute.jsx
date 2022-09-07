import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Home from '../pages/Home';

const PrivateRoute = () => {
  const isLoggedin = false;
  const navigate = useNavigate();
  
  
  useEffect(()=>{
    if(!isLoggedin)
        navigate('/signin')
  }, [isLoggedin,navigate])

  return(
    <Home />
  )
}
export default PrivateRoute;
