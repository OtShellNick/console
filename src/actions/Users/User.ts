import AppServer from '@helpers/server';
import * as CookieHelper from '@helpers/Cookie';

import {
  TLoginData, TRegisterValues, TQuery, TUsersList,
} from '@actions/Users/UsersTypes';
import checkAuth from '@helpers/checkAuth';

export const login = (data: TLoginData) => AppServer.post('sbx-auth/sign-in', data);

export const logout = () => {
  CookieHelper.del('Authorization');
  localStorage.removeItem('Authorization');
};

export const register = (data: TRegisterValues) => AppServer.post('sbx-auth/sign-up', data);

export const getSelf = () => AppServer.get('sbx-auth/user/me').catch(checkAuth);

export const getUsersList = (query: TQuery) => AppServer.get('sbx-auth/user/list', query)
  .then((users: TUsersList) => ({ ...users, count: [{ id: users.count }] }))
  .catch(checkAuth);
