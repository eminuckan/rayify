import axios from 'axios';
import {jwtDecode} from "jwt-decode";

export async function login(username: string | undefined, password: string | undefined){
    let data;
    await axios.post("/api/login", {
        username : username,
        password: password
    }).then(res => {
        data = res.data
    }).catch(err => {
        console.log(err)
    });
return data ? data : {token : {accessToken: undefined}}
}

type RegisterData = {
    succeeded?: boolean;
    message?: string
}

export async function register(username: string | undefined, password: string | undefined){
    let data : RegisterData = {
        succeeded: false
    };
    await axios.post('/api/sign-up', {
        username,
        password
    }).then(res => {
        data = {
            succeeded: res.data.succeeded,
            message: res.data.message
        }
    }).catch(err => {
        console.log(err)
    });

    return data;
}

export function parseJWT(token: string | undefined){
    if (!token) return;
    return jwtDecode(token);
}