import AppServer from '@helpers/server';
import checkAuth from '@helpers/checkAuth';

export const getPermissionsGroup = () => AppServer.get('sbx-auth/permission/group').catch(checkAuth);
