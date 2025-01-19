import React from 'react';
import { USER_SESSION_KEY } from '../../configs/definitions';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectRoute = ({children}) => {

    let userData = JSON.parse(localStorage.getItem(USER_SESSION_KEY));
    let location = useLocation();

    if (userData?.length === 0) {
        return <Navigate to="/" state={{from: location}} replace/>
    }

    return children;
};

export default ProtectRoute;