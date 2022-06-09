type TMethods = {
    id: number,
    GET: boolean,
    POST: boolean,
    PUT: boolean,
    DELETE: boolean
}

type TPermission = {
    1?: TMethods,
    2?: TMethods,
    3?: TMethods,
    4?: TMethods,
    5?: TMethods,
    6?: TMethods,
    7?: TMethods,
    8?: TMethods,
    9?: TMethods,
    10?: TMethods,
    11?: TMethods
}

export type TPermissionsGroup = {
    auth: TPermission,
    packages: TPermission,
    board: TPermission,
    notifications: TPermission,
    projects: TPermission,
    platforms: TPermission,
    deploy: TPermission,
    tasks: TPermission,
    users: TPermission,
    files: TPermission,
    comments: TPermission,
    clients: TPermission,
    competitors: TPermission,
    instances: TPermission,
    dns: TPermission,
    // eslint-disable-next-line camelcase
    token_projects: TPermission,
    tokens: TPermission,
    'node-query': TPermission,
    'service-query': TPermission,
    'node-monitoring': TPermission,
    'service-deploy': TPermission,
    'service-mutation': TPermission,
    chats: TPermission,
    redis: TPermission,
    ctl: TPermission,
    node: TPermission,
    service: TPermission,
    ingres: TPermission,
    pool: TPermission,
    cluster: TPermission
}
