import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { destroyLoginData } from '../../../../redux/actions/auth/auth.actions';
import { Navigate } from 'react-router-dom';

export const Logout = () => {

    const dispatch = useDispatch();

    const { isLogginSuccess,  } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(destroyLoginData())
    },[dispatch])

    if (!isLogginSuccess) {
        return <Navigate to="/" replace />
    }
    

}