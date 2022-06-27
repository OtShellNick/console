export type TQuery = {
    count: string[];
    limit: number;
    offset: number;
    orderBy: string[];
    select: string[]
}

export type TAddDomainZone = {
    host: string;
    type: string;
}

export type TDeleteDnsRecord = {
    host: string;
    id: number;
}
