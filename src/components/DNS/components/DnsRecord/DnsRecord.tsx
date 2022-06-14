import React from 'react';
import Table from 'sbx-react-table';
import { useLocation } from 'react-router-dom';

import Page from '@containers/Page/Page';
import Confirm from '@containers/Confirm/Confirm';

import { getDnsByHosts } from '@actions/DNS/dns';

import DnsIcon from '@assets/dns.svg?tsx';
import TrashIcon from '@assets/trash.svg?tsx';

import './DnsRecord.scss';

type Location = {
  state: {
    name: string
  }
}

const DnsRecord = () => {
  const location = useLocation() as Location;

  return (
    <Page name="DNS system" description="Base Dns information." icon={<DnsIcon />}>
      <Table
        name="dns by host"
        action={() => {
          const { name } = location.state;
          return getDnsByHosts(name);
        }}
        structure={{
          id: {
            name: 'id',
          },
          host: {
            name: 'host',
            val: ({ host }: {host: string}) => `${host}.${location.state.name}`,
          },
          type: {
            name: 'type',
          },
          ttl: {
            name: 'ttl',
          },
          record: {
            name: 'record',
            val: ({ record }: {record: string}) => <span style={{ display: 'inline-block', overflow: 'hidden', maxWidth: 200 }}>{record}</span>,
          },
          status: {
            name: 'status',
          },
          failover: {
            name: 'failover',
          },
          actions: {
            name: 'actions',
            val: () => (
              <Confirm
                title="Delete DNS Host Record"
                description="You really want delete DNS Host Record?"
                onConfirm={() => console.log('yes')}
              >
                <TrashIcon />
              </Confirm>
            ),
          },
        }}
      />
    </Page>
  );
};

export default DnsRecord;
