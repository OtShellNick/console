import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import './NotFound.scss';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <Button className="btn_back" size="small" variant="contained" onClick={() => navigate('/', { replace: true })} color="inherit">Go Back</Button>
      <div className="boo-wrapper">
        <div className="boo">
          <div className="face" />
        </div>
        <div className="shadow" />

        <h1>Ops! 404</h1>
        <small>Page Not Found.</small>
      </div>
    </div>
  );
};

export default NotFound;
