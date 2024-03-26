import microserviceCaller from "@/app/(ic-teams)/lib/ApiCaller/microserviceCaller";
import { decryptToken } from "@/utils/cryptoJs";
import { NextResponse } from "next/server";

export async function GET(req) {
    const headers = new Headers(req.headers);
    const at = headers.get('at');
    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    try {
        const response = await microservice.get('/core-v3/users', {
            params: { 'app_id': process.env.APP_ID }
        })

        const { roles: [role_persmissions] } = response.data

        return NextResponse.json({status: 200, data: role_persmissions})

    } catch (error) {
        return NextResponse.json({status: error?.response.status, message: error?.response.data})
    }

}