import React from 'react';

function Modal({children, open, handleClose}) {
  if (!open) return null;
  return (
    <div className='modal'>
      <div
        className='modal__overlay'
        onClick={handleClose}
      ></div>
      <div className='modal__body'>{children}</div>
    </div>
  );
}

export default Modal;
