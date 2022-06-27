// @ts-ignore
// eslint-disable-next-line no-undef
const { REST: { protocol, host, port }, VERSION: { version } } = CONFIG[CONFIG_NAME];

const url: string = `${protocol}://${host}:${port}/${version}/`;
export const getPhoto = (hash: string) => fetch(`${url}sbx-files/${hash}`).then((data) => data.blob());
