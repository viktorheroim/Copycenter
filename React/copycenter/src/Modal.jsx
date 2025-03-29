import React from 'react';
import './Modal.css'; // не забудь про стили

const Modal = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose}>Закрыть</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;