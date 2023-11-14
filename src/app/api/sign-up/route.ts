import axios from 'axios';
import https from 'https';
export async function POST(request: Request) {

    const {username, password} = await request.json();

    const instance = axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    });

    const res = await instance.post('https://localhost:7072/api/User', {
        username: username,
        password: password
    });


    return Response.json(res.data);
}