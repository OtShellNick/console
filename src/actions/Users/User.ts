import AppServer from '@helpers/server';

import { TLoginData, TRegisterValues } from '@actions/Users/UsersTypes';

export const Login = (data: TLoginData) => AppServer.post('sbx-auth/sign-in', data);

export const Register = (data: TRegisterValues) => AppServer.post('sbx-auth/sign-up', data);
