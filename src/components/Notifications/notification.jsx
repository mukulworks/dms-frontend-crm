import React  from 'react'
import Toast from 'react-bootstrap/Toast';


const Notification = ({notificationMessage}) => {
    return (
        <div
            aria-live="polite"
            aria-atomic="true"
            style={{
                position: 'relative',
                minHeight: '100px'}}>
            <Toast delay={5000} autohide
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                }}
            >
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">Message</strong>
                </Toast.Header>
                <Toast.Body>{notificationMessage}</Toast.Body>
            </Toast>
        </div>
    )
};

export default Notification