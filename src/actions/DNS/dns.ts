import AppServer from '@helpers/server';

import { TQuery } from '@actions/DNS/dnsTypes';
import checkAuth from '@helpers/checkAuth';

export const getDns = (query: TQuery) => AppServer.get('sbx-dns/dns', { ...query, limit: 100 })
  .catch(checkAuth);

export const getDnsByHosts = (host: string) => AppServer.get(`sbx-dns/dns/${host}`, { host })
  .catch(checkAuth);
