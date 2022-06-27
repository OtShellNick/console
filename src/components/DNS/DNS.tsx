import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'sbx-react-table';

import Page from '@containers/Page/Page';
import ModalBox from '@containers/Modal/Modal';
import AddDomainForm from '@components/DNS/components/AddDomainForm/AddDomainForm';

import { getDns } from '@actions/DNS/dns';

import DnsIcon from '@assets/dns.svg?tsx';

import './DNS.scss';

const DNS = () => {
  const navigate = useNavigate();
  const [openModal, setModalOpen] = useState(false);

  const buttons = [
    {
      name: 'Add Domain',
      onClick: () => setModalOpen((prevState) => !prevState),
    },
  ];

  return (
    <Page
      name="DNS system"
      description="Base Dns information."
      className="description"
      icon={<DnsIcon />}
      buttons={buttons}
    >
      <ModalBox
        size="sm"
        title="Add Domain"
        isOpen={openModal}
        hide={() => setModalOpen((prevState) => !prevState)}
      >
        <AddDomainForm Hide={() => setModalOpen(false)} />
      </ModalBox>
      <Table
        name="dns"
        action={getDns}
        onRowClick={({ name }: {name: string}) => {
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
