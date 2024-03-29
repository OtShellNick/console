import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import moment from 'moment';

import Page from '@containers/Page/Page';
import Image from '@containers/Image/Image';
import ModalBox from '@containers/Modal/Modal';

import UserUpdateForm from '@components/Users/UserUpdateForm/UserUpdateForm';

import { TLoginResponseData } from '@actions/Users/UsersTypes';

import UserIcon from '@assets/user.svg?tsx';
// @ts-ignore
import NoImageIcon from '@assets/no_image.jpg';
import CV from '@components/Users/User/components/CV/CV';
import UpdateCVForm from '@components/Users/User/components/UpdateCVForm/UpdateCVForm';

import './User.scss';

type TLocation = {
  state: { user?: TLoginResponseData };
};

const User = () => {
  const location = useLocation() as TLocation;
  const navigate = useNavigate();
  const [user, setUser] = useState<TLoginResponseData | null>(null);
  const [openModal, setModalOpen] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);

  useEffect(() => {
    if (!location.state) navigate('/users', { replace: true });

    if (location.state?.user) setUser(location.state.user);
  }, [location]);

  const getUserYears = (birthday: string): string => {
    const userBirthday = moment(birthday);

    return userBirthday.fromNow(true);
  };

  return (
    <Page
      name="User"
      description="User information."
      className="description"
      icon={<UserIcon />}
    >
      {user && (
        <ModalBox
          size="md"
          title="User Update"
          isOpen={openModal}
          hide={() => setModalOpen((prevState) => !prevState)}
        >
          <UserUpdateForm user={user} />
        </ModalBox>
      )}
      {user && (
        <div className="user">
          <div className="user__info">
            {user.photo ? (
              <Image hash={user.photo} />
            ) : (
              <img
                src={NoImageIcon}
                alt="empty"
              />
            )}
            <div className="user__info_main">
              <div className="user__info_main_heading">
                <h1 className="user__info_name">{`${user.firstName} ${user.lastName}`}</h1>
                <Button
                  size="small"
                  variant="contained"
                  color="info"
                  onClick={() => setModalOpen(true)}
                >
                  Edit Profile
                </Button>
              </div>
              {user.position && <p className="user__info_position">{user.position}</p>}
              <p className="user__info_text">
                {user.gender === 'male' ? 'Man,' : 'Woman,'}
                {' '}
                {getUserYears(user.birthday)}
              </p>
              {user.country && <p className="user__info_text">{`${user.country}, ${user.city}`}</p>}
              <span className="user__info_contacts">Contacts:</span>
              <div className="user__info_contacts_block">
                <div>
                  <div>
                    <span>Emails:</span>
                    {user.email.join(', ')}
                  </div>
                  <div>
                    <span>Phones: </span>
                    {user.phone.join(', ')}
                  </div>
                </div>
                <div>
                  {user.links.skype && (
                    <div>
                      <span>Skype:</span>
                      {user.links.skype}
                    </div>
                  )}
                  {user.links.telegram && (
                    <div>
                      <span>Telegram:</span>
                      {user.links.telegram}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="user__cv">
        <div className="user__cv_heading">
          <Button
            size="small"
            variant="contained"
            color="info"
            onClick={() => setUpdateForm((prevState) => !prevState)}
          >
            Edit CV
          </Button>
        </div>
        {!updateForm && <CV />}
        {updateForm && <UpdateCVForm />}
      </div>
    </Page>
  );
};

export default User;
