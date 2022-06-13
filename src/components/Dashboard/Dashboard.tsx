import React from 'react';

import Page from '@containers/Page/Page';
import Task from '@components/Dashboard/components/Task Tracker/Task';
import LogForm from '@components/Dashboard/components/Log Tracker/LogForm';

import './Dashboard.scss';

import DashboardIcon from '@assets/dashboard.svg?tsx';

const Dashboard = () => (
  <Page name="Dashboard" description="Base trading informations." icon={<DashboardIcon />}>
    <div className="dashboard">
      <div className="dashboard-left">
        <h2 className="dashboard__heading">Task Tracker</h2>
        <div className="dashboard__task">
          <Task />
        </div>
      </div>
      <div className="dashboard-right">
        <h2 className="dashboard__heading">Log Tracker</h2>
        <div className="dashboard__form">
          <LogForm />
        </div>
      </div>
    </div>
  </Page>
);

export default Dashboard;
