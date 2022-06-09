import AppServer from '@helpers/server';

export const getPermissionsGroup = () => AppServer.get('sbx-auth/permission/group');
