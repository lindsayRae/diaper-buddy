import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { AiOutlineClose } from 'react-icons/ai';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ open, closeModal, children }) => {
  const nodeRef = React.useRef(null);
  const handleClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      closeModal();
    }
  };

  const modal = (
    <CSSTransition
      in={open}
      timeout={500}
      classNames='show-up'
      nodeRef={nodeRef}
      unmountOnExit
    >
      <div
        ref={nodeRef}
        className='modal-overlay'
        id='modal-overlay'
        onClick={handleClick}
      >
        <div className='modal'>
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <AiOutlineClose size={16} onClick={() => closeModal()} />
          </div>
          {children}
        </div>
      </div>
    </CSSTransition>
  );

  return ReactDOM.createPortal(modal, modalRoot);
};

export default Modal;
