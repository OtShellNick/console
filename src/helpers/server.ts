import Server from 'sbx-client-request';

const { stage } = CONFIG;
const { REST: { protocol, host, port }, VERSION: { version } } = stage;

const url: string = `${protocol}://${host}:${port}/${version}/`;

const AppServer = new Server({ url, authKey: 'Authorization' });

export default AppServer;
