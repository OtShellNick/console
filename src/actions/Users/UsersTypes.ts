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
    country: string,
    currency?: string,
    role: number,
    activity: number,
    subscribe: number,
    gender: string,
    login: string,
    birthday: string,
    city: string,
    links: object,
    isCandidate: boolean,
    wantedSalary?: number,
    roles: (string | number)[],
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
