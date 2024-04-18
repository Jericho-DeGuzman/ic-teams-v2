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
        const response = await microservice.get(`/ic-teams/file-requirement-headers`)
        console.log(response);
        return NextResponse.json({status: 200, data: response.data})

    } catch (error) {
        return NextResponse.json({status: error?.reponse?.status, message: error?.response?.data});
    }
}