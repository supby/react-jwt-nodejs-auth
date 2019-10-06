export interface IUser {
    id: number;
    username: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role: string;
}

export interface IUserView {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    token: string;
}

export interface IUserAuthInput {
    username: string;
    password: string;
}


