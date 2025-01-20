import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { destroyLoginData } from '../../../../redux/actions/auth/auth.actions';
import { Navigate } from 'react-router-dom';

export const Logout = () => {

    const dispatch = useDispatch();

    const { isLogginSuccess,  } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(destroyLoginData()) // Destroy login data to logout user
    },[dispatch])

    if (!isLogginSuccess) { // Redirect to login if logout is successful
        return <Navigate to="/" replace />
    }
    

}