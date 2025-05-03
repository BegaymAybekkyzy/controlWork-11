export interface IUserForm {
    username: string;
    password: string;
    displayName: string;
    phone: number | null;
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

export interface IItem {
    _id: string;
    title: string;
    image: string;
    category: string;
    price: number;
}

export interface IItemDetail {
    _id: string;
    user: {
        _id: string;
        displayName: string;
        phone: number;
    }
    category: {
        _id: string;
        title: string;
    };
    title: string;
    description: string;
    image: string;
    price: number;
}

export interface IItemForm {
    title: string;
    category: string;
    description: string;
    image: File | null;
    price: number | null;
}

export interface ICategory {
    _id: string;
    title: string;
}