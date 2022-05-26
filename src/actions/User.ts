import AppServer from '@helpers/server';

type TLogin = {
    email: string,
    password: string
}
const Login = (data: TLogin) => {
  console.log('data', data);
  return AppServer.post('sbx-auth/sign-in', data);
};

export default Login;
