import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import AlertSuccessIcon from '../../assets/icons/alert-success.svg'
import AlertErrorIcon from '../../assets/icons/alert-error.svg'
import { hideNotification } from '../../redux/actions/common/notification.actions';

const NotificationToast = ({ type, message }) => {

    const dispatch = useDispatch()

    const handleAutoClose = () => { // Hide the notification after 3 seconds
        dispatch(hideNotification({
            visibility: false,
            type: '',
            message: ''
        }))
    }

    return (
        <div
            aria-live="polite"
            aria-atomic="true"
            className="position-relative"

        >
            <ToastContainer
                className="p-3 position-fixed notification"
                position='bottom-end'
                style={{ zIndex: 9999 }}
            >
                <Toast onClose={handleAutoClose} autohide delay={3000}>
                    <Toast.Body className={type === 'success' ? 'success-toast' : ''}>
                        <div className='custom-toast-body'>
                            <img src={type === 'error' ? AlertErrorIcon : AlertSuccessIcon} alt="" />
                            <div className='custom-toast-body-message' style={{ color: 'black'}}>
                                {message}
                            </div>
                        </div>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default NotificationToast;