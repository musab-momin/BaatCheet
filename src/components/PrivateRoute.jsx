import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const PrivateRoute = ({ children }) => {
  const isLoggedin = false;
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
