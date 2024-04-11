import microserviceCaller from "@/app/(ic-teams)/lib/ApiCaller/microserviceCaller";
import { decryptToken } from "@/utils/cryptoJs";
import { NextResponse } from "next/server";

export async function GET(req) {
    const headers = new Headers(req.headers);
    const at = headers.get('at');
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    try {
        const response = await microservice.get(`/files/files/${id}`);
        return NextResponse.json({status: 200, data: response.data.file})
    } catch (error) {
        console.log(error)
        return NextResponse.json({status: error?.response.status, message: error?.response.data});
    }
}