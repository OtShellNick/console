export interface IQuery {
    count: string[],
    limit: number,
    offset: number,
    orderBy: string[],
    select: string[]
}

type count = number;

type reportRow = {
    id: number;
    info: string;
    date: number;
    userId: number;
    projectId: number;
}

export interface IReportsData {
    rows: reportRow[],
    count: count
}

export interface IReportData {
    id?: number;
    date?: number;
    info: string;
    projectId?: number;
    userId?: number;
}
