import React from 'react';
import { USER_SESSION_KEY } from '../../configs/definitions';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectRoute = ({children}) => {

    let userData = JSON.parse(localStorage.getItem(USER_SESSION_KEY));
    let location = useLocation();
   
    // If user is not logged in, redirect to login page
    if (!userData) {
        return <Navigate to="/" state={{from: location}} replace/>
    }

    return children;
};

export default ProtectRoute;