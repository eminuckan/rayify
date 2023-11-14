import axios from 'axios';
export async function login(username: string, password: string){

    const res = await axios.get("/api/login");
    return res.data;
}