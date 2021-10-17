export interface UserInput {
    name: string;
    surname: string;
    lastName: string;
    email: string;
    login: string;
}

export interface User {
    id: number;
    content: UserInput;
}
