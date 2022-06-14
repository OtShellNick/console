import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Button } from '@mui/material';

import './Confirm.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';

type TConfirm = {
    title: string,
    description: string,
    onConfirm: () => void,
    children: React.ReactNode
}

const Confirm = ({
  title, description, onConfirm, children,
}: TConfirm) => {
  const confirm = () => confirmAlert({
    customUI: ({ onClose }) => (
      <div className="custom-ui confirm">
        <h3 className="confirm__title">{title}</h3>
        <p className="confirm__description">{description}</p>
        <div className="confirm__btn-group">
          <Button
            size="small"
            color="success"
            variant="contained"
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm
          </Button>
          <Button
            size="small"
            color="error"
            variant="contained"
            type="button"
            onClick={onClose}
          >
            Decline
          </Button>
        </div>
      </div>
    ),
  });

  return <div onClick={confirm}>{children}</div>;
};

export default Confirm;
