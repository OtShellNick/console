import React from 'react';

import Page from '@containers/Page/Page';

import ServicesIcon from '@assets/servers.svg?tsx';

import './Clusters.scss';

const Clusters = () => {
  const buttons = [
    {
      name: 'Add New Cluster',
      onClick: () => console.log('cluster'),
    },
  ];

  return (
    <Page
      name="Clusters"
      description="Clusters List"
      icon={<ServicesIcon />}
      buttons={buttons}
    >
      Clusters
    </Page>
  );
};

export default Clusters;
