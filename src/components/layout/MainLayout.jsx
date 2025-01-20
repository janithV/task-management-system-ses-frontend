import React from 'react';
import { useSelector } from 'react-redux';
import Backdrop from '../common/Backdrop';
import { Outlet } from 'react-router-dom';
import NotificationToast from '../common/NotificationToast';
import NavBar from '../common/NavBar';
import { Container } from 'react-bootstrap';

const MainLayout = () => {
    const { visibility } = useSelector(state => state.backdrop)
    const notification = useSelector(state => state.notification)

    return (
        <>
            {visibility && visibility === true && <Backdrop />}
            <Container fluid className='ps-0 pe-0'>
                <NavBar />
                <Container className='pt-3'>
                    <Outlet />
                </Container>
                <div>
                    {notification && notification.visibility && <NotificationToast type={notification.type} message={notification.message} />}
                </div>
            </Container>
        </>
    );
};

export default MainLayout;