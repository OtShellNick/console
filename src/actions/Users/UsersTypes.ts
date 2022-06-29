export type TLoginData = {
    email: string,
    password: string
}

export type TLoginResponseData = {
    id: number,
    email: string[],
    phone: string[],
    slackId: string,
    firstName: string,
    lastName: string,
    photo?: string,
    position?: string,
    country?: string,
    currency?: string,
    role: number,
    activity: number,
    subscribe: number,
    gender: string,
    login: string,
    birthday: string,
    city?: string,
    links: {
        skype?: string,
        telegram?: string
    },
    isCandidate: boolean,
    wantedSalary?: number,
    roles: (string | number)[],
    report: boolean,
    __token: string
}

export type TRegisterValues = {
    firstName: string,
    lastName: string,
    gender: 'male' | 'female',
    phone: string,
    email: string,
    password: string,
    repeatPassword?: string,
}

export type TQuery = {
    count: string[];
    limit: number;
    offset: number;
    orderBy: string[];
    select: string[]
}

export type TUsersList = {
    rows: TLoginResponseData[],
    count: number
}

export type TUpdateUserData = {
    id: number,
    roles?: number[],
    position?: string,
    email?: string[],
    phone?: string[],
    firstName?: string,
    lastName?: string,
    password?: string,
    birthday?: number,
    photo?: File,
    gender?: 'male' | 'female',
    city?: string,
    country?: string,
    links?: {
        skype?: string,
        telegram?: string
    },
    isCandidate?: boolean,
    report?: boolean,
}
