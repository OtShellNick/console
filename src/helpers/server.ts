import Server from 'sbx-client-request';

// @ts-ignore
// eslint-disable-next-line no-undef
const { REST: { protocol, host, port }, VERSION: { version } } = CONFIG[CONFIG_NAME];

const url: string = `${protocol}://${host}:${port}/${version}/`;

const AppServer = new Server({ url, authKey: 'Authorization' });

export default AppServer;
