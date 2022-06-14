import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'sbx-react-table';

import Page from '@containers/Page/Page';

import { getDns } from '@actions/DNS/dns';

import DnsIcon from '@assets/dns.svg?tsx';

import './DNS.scss';

const DNS = () => {
  const navigate = useNavigate();

  return (
    <Page name="DNS system" description="Base Dns information." icon={<DnsIcon />}>
      <Table
        name="dns"
        action={getDns}
        onRowClick={({ name }) => {
          const to = `/dns/${name.replaceAll(/[.]/gm, '&')}`;
          navigate(to, { state: { name } });
        }}
        structure={{
          name: {
            name: 'name',
          },
          zone: {
            name: 'zone',
          },
          type: {
            name: 'type',
          },
          status: {
            name: 'status',
          },
        }}
      />
    </Page>
  );
};

export default DNS;
