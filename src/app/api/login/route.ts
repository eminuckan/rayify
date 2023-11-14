import axios from 'axios';
import https from 'https';
export async function GET() {
    const instance = axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    });
    const res = await instance.post('https://localhost:7072/api/User/login', {
        username: "string",
        password: "string"
    });


    return Response.json(res.data);
}