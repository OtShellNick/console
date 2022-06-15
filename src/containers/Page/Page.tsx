import React, { ReactNode } from 'react';
import { ButtonGroup, Button } from '@mui/material';

import './Page.scss';

type TButton = {
    name: string;
    onClick: () => void
}

type TPage = {
    name: string;
    description: string;
    className?: string;
    icon: ReactNode;
    children: ReactNode;
    buttons?: TButton[]
}
const Page = ({
  name, description, className, icon, children, buttons,
}: TPage) => {
  const arrButton = buttons?.map((btn) => (
    <Button
      size="small"
      variant="contained"
      color="info"
      key={btn.name}
      onClick={btn.onClick}
    >
      {btn.name}
    </Button>
  ));
  return (
    <div className={`page ${className || ''}`}>
      <div className="page__heading">
        <div className="page__heading_left">
          {icon}
          <div>
            <h1 className="page__heading_head">{name}</h1>
            <p className="page__heading_description">{description}</p>
          </div>
        </div>
        <div className="page__heading_right">
          {buttons && (
            <ButtonGroup size="small" aria-label="small button group">
              {arrButton}
            </ButtonGroup>
          )}
        </div>
      </div>
      <div className="page__content">
        {children}
      </div>
    </div>
  );
};
Page.defaultProps = {
  className: '',
  buttons: [],
};
export default Page;
