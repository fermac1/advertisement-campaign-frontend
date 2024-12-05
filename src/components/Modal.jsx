import React from 'react';
import '../Modal.css';
import config from '../config';

const Modal = ({ isOpen, closeModal, campaign }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={closeModal}>&times;</span>
        <img
          src={`${campaign ? `${config.url}/storage/${campaign}` : ''}`}
          alt="Creative Preview"
          className="modal-image"
        />
      </div>
    </div>
  );
};

export default Modal;


