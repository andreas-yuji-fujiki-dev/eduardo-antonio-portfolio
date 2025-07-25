import { api } from "../api";

interface AuthBodyContentTypes {
    user: string;
    password: string;
};

import { AxiosResponse } from "axios";

// login
export async function loginRequest( data:AuthBodyContentTypes ): Promise<AxiosResponse> {
    const { user, password } = data;

    const response = await api.post('/auth/login', {
        user,
        password
    });
    
    return response;
};

// register
export async function registerRequest( data:AuthBodyContentTypes ): Promise<AxiosResponse> {
    const { user, password } = data;

    const response = await api.post('/auth/register', {
        "user": user,
        "password": password
    });

    return response;
};