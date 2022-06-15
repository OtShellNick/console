import { logout } from '@actions/Users/User';

const checkAuth = (data: any) => {
  const { code } = data;

  if (code === 405) {
    logout();
    if (window.location.pathname !== '/login') return window.location.replace('/login');
  }

  return data;
};

export default checkAuth;
