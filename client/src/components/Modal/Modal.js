import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import { CSSTransition } from 'react-transition-group';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ open, closeModal, children }) => {
  console.log(open);
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
        <div className='modal'>{children}</div>
      </div>
    </CSSTransition>
  );

  return ReactDOM.createPortal(modal, modalRoot);
};

export default Modal;
