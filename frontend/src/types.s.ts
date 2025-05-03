export interface IUserForm {
    username: string;
    password: string;
}

export interface IUser {
    _id: string;
    username: string;
    token: string;
}

export interface IDetailedError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface IError {
    error: string;
}