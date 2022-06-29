import AppServer from '@helpers/server';
import checkAuth from '@helpers/checkAuth';

export const getRolesList = () => AppServer.get('/sbx-auth/role/list').catch(checkAuth);
