import microserviceCaller from "@/app/(ic-teams)/lib/ApiCaller/microserviceCaller";
import { decryptToken } from "@/utils/cryptoJs";
import sanitizeInput from "@/utils/sanitizeInput";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
    const headers = new Headers(req.headers);
    const at = headers.get('at');

    const { searchParams } = new URL(req.url);
    const uuid = searchParams.get('uuid');

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    try {
        const response = await microservice(`/ic-teams/target-comments?target_uuid=${uuid}`)
        return NextResponse.json({ status: 200, data: response.data });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: error?.response.status, message: error?.response.data });
    }
}

export async function POST(req) {
    const at = cookies().get('at').value;
    const body = await req.json();

    const { target_uuid, comment } = body;

    const newComment = {
        target_uuid,
        comment: sanitizeInput(comment)
    }

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);
    
    try {
        const response = await microservice.post('/ic-teams/target-comments', newComment );
        return NextResponse.json({ status: 200, data: response.data });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: error?.response.status, message: error?.response.data });
    }
}