import { api } from "../api";

interface UserTypes {
    id: number;
    name: string;
    password: string;
};

interface AuthBodyContentTypes {
    user: string;
    password: string;
};

// login
export async function loginRequest( data:AuthBodyContentTypes ): Promise<UserTypes> {
    const { user, password } = data;

    const response = await api.post('/login', {
        "user": user,
        "password": password
    });
    
    return response.data;
};

// register
export async function registerRequest( data:AuthBodyContentTypes ): Promise<UserTypes> {
    const { user, password } = data;

    const response = await api.post('/register', {
        "user": user,
        "password": password
    });

    return response.data;
};