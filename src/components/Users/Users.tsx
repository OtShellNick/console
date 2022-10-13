import React from 'react';
import Table from 'sbx-react-table';
import { useNavigate } from 'react-router-dom';

import Page from '@containers/Page/Page';
import Image from '@containers/Image/Image';

import { getUsersList } from '@actions/Users/User';
import { TLoginResponseData } from '@actions/Users/UsersTypes';

import UsersIcon from '@assets/users.svg?tsx';
// @ts-ignore
import NoImageIcon from '@assets/no_image.jpg';

import './Users.scss';

const Users = () => {
  const navigate = useNavigate();

  return (
    <Page
      name="Users"
      description="Base Users information."
      className="description"
      icon={<UsersIcon />}
    >
      <Table
        name="Users List"
        action={getUsersList}
        onRowClick={(user: TLoginResponseData) => navigate(`/users/${user.id}`, { state: { user } })}
        structure={{
          id: {
            name: 'ID',
          },
          photo: {
            name: 'Photo',
            // eslint-disable-next-line react/no-unused-prop-types,react/require-default-props
            val: ({ photo }: { photo?: string }) => {
              if (photo) {
                return (
                  <Image
                    className="users__photo"
                    hash={photo}
                  />
                );
              }

              return (
                <img
                  className="users__photo"
                  src={NoImageIcon}
                  alt="'N/A"
                />
              );
            },
          },
          name: {
            name: 'Name',
            val: ({ firstName, lastName }: { firstName: string; lastName: string }) => `${firstName} ${lastName}`,
          },
          email: {
            name: 'Email',
          },
          phone: {
            name: 'Phone',
            // eslint-disable-next-line react/no-unused-prop-types
            val: ({ phone }: { phone: string[] }) => (
              <ul>{phone.length > 0 ? phone.map((ph) => <li key={ph + 1}>{`${ph}`}</li>) : 'N/A'}</ul>
            ),
          },
          position: {
            name: 'Position',
          },
        }}
      />
    </Page>
  );
};

export default Users;
