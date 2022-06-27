import AppServer from '@helpers/server';
import checkAuth from '@helpers/checkAuth';

import { TAddDomainZone, TQuery, TDeleteDnsRecord } from '@actions/DNS/dnsTypes';

export const getDns = (query: TQuery) => AppServer.get('sbx-dns/dns', { ...query, limit: 100 })
  .catch(checkAuth);

export const getDnsByHosts = (host: string) => AppServer.get(`sbx-dns/dns/${host}`, { host })
  .catch(checkAuth);

export const addZoneRecord = (data: TAddDomainZone) => AppServer.post('sbx-dns/dns/zone', data).then(checkAuth);

export const deleteDnsRecord = (data: TDeleteDnsRecord) => AppServer.delete('sbx-dns/dns', data).then(checkAuth);
