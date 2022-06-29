import React, { ReactNode } from 'react';
import Modal from 'react-modal';
import { IconButton } from '@mui/material';

import CloseIcon from '@assets/close.svg?tsx';

import './Modal.scss';

type TModal = {
    title: string;
    isOpen: boolean;
    hide: () => void;
    children: ReactNode;
    size: 'sm' | 'md' | 'lg';
}

const ModalBox = ({
  title, isOpen, hide, children, size,
}: TModal) => {
  Modal.setAppElement('#modal_root');

  const sizesModal = {
    sm: '30',
    md: '60',
    lg: '90',
  };

  return (
    <Modal
      style={{
        content: {
          inset: sizesModal[size] === '90' ? '5vh 0' : sizesModal[size] === '60' ? '15vh 0' : '30vh 0',
          maxWidth: `${sizesModal[size]}vw`,
          maxHeight: `${sizesModal[size]}vh`,
          margin: '0 auto',
        },
      }}
      isOpen={isOpen}
      onRequestClose={hide}
    >
      <div className="modal">
        <div className="modal__heading">
          <h2>{title}</h2>
          <IconButton aria-label="close" size="small" onClick={hide}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="modal__content">
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default ModalBox;
