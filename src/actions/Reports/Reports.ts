import AppServer from '@helpers/server';
import checkAuth from '@helpers/checkAuth';
import { IQuery, IReportData, IReportsData } from '@actions/Reports/ReportsTypes';

export const getReports = (query: IQuery) => AppServer.get('sbx-auth/report/list/self', query)
  .then((resp: IReportsData) => ({ ...resp, count: [{ id: resp.count }] }))
  .catch(checkAuth);

export const addReport = (data: IReportData) => AppServer.post('sbx-auth/report', data)
  .catch(checkAuth);

export const deleteReport = (id: number) => AppServer.delete('sbx-auth/report', { id })
  .catch(checkAuth);

export const updateReport = (data: IReportData) => AppServer.put('sbx-auth/report/self', data)
  .catch(checkAuth);
