import { api } from "../api";
import { AxiosResponse } from "axios";

import { AuthBodyContentTypes } from "@/types/api/AuthBodyContentTypes";

// login
export async function loginRequest( data:AuthBodyContentTypes ):Promise<AxiosResponse<AuthBodyContentTypes>> {
    const { user, password } = data;

    const response = await api.post('/auth/login', {
        user,
        password
    });
    
    return response;
};

// register
export async function registerRequest( data:AuthBodyContentTypes ): Promise<AxiosResponse<AuthBodyContentTypes>> {
    const { user, password } = data;

    const response = await api.post('/auth/register', {
        "user": user,
        "password": password
    });

    return response;
};