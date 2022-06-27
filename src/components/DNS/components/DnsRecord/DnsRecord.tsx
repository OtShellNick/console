import React, { useRef, useState } from 'react';
import Table from 'sbx-react-table';
import { useLocation } from 'react-router-dom';

import Page from '@containers/Page/Page';
import Confirm from '@containers/Confirm/Confirm';

import { deleteDnsRecord, getDnsByHosts } from '@actions/DNS/dns';

import DnsIcon from '@assets/dns.svg?tsx';
import TrashIcon from '@assets/trash.svg?tsx';

import './DnsRecord.scss';
import Notify from '@helpers/Notify';

type Location = {
  state: {
    name: string
  }
}

const DnsRecord = () => {
  const location = useLocation() as Location;
  const [openModal, setModalOpen] = useState(false); // TODO add Modal zone create
  const table = useRef(null);

  const buttons = [
    {
      name: 'Add DNS Record',
      onClick: () => setModalOpen((prevState) => !prevState),
    },
  ];

  return (
    <Page
      name="DNS system"
      description="Base Dns information."
      icon={<DnsIcon />}
      buttons={buttons}
    >
      <Table
        ref={table}
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
            // eslint-disable-next-line react/no-unused-prop-types
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
            // eslint-disable-next-line react/no-unused-prop-types
            val: ({ id, host }: {id: number, host: string}) => (
              <Confirm
                title="Delete DNS Host Record"
                description="You really want delete DNS Host Record?"
                onConfirm={async () => {
                  try {
                    await deleteDnsRecord({ id, host });
                    console.log(table);
                  } catch (e) {
                    Notify({ err: e });
                  }
                }}
              >
                <TrashIcon className="dns-record__remove" />
              </Confirm>
            ),
          },
        }}
      />
    </Page>
  );
};

export default DnsRecord;
