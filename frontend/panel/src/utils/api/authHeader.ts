import Cookies from "js-cookie";

export const authHeader = {
    headers: {
        Authorization: Cookies.get('token') ? `Bearer ${ Cookies.get('token') }` : '',
    },
};