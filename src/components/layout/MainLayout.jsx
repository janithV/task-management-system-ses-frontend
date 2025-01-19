import React from 'react';
import { useSelector } from 'react-redux';
import Backdrop from '../common/Backdrop';
import { Outlet } from 'react-router-dom';
import NotificationToast from '../common/NotificationToast';

const MainLayout = () => {
    const { visibility } = useSelector(state => state.backdrop)
    const notification = useSelector(state => state.notification)

    return (
        <>
            {visibility && visibility === true && <Backdrop />}
            <div className="container-fluid">
                <Outlet />
                <div>
                    {notification && notification.visibility && <NotificationToast type={notification.type} message={notification.message} />}
                </div>
            </div>
        </>
    );
};

export default MainLayout;