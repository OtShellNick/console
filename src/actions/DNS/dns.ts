import AppServer from '@helpers/server';

import { TQuery } from '@actions/DNS/dnsTypes';

export const getDns = (query: TQuery) => AppServer.get('sbx-dns/dns', { ...query, limit: 100 });

export const getDnsByHosts = (host: string) => AppServer.get(`sbx-dns/dns/${host}`, { host });
