import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import microserviceCaller from "@/app/(ic-teams)/lib/ApiCaller/microserviceCaller";
import { decryptToken } from "@/utils/cryptoJs";

export async function POST(req) {
    const at = cookies().get('at').value;
    const body = await req.json();
    try {
        const decryptedToken = decryptToken(at);
        const { token } = decryptedToken

        const microservice = microserviceCaller(token);

        const response = await microservice.post('/ic-teams/task-uploaded-file-requirements', body)
        console.log(response)
        return NextResponse.json({ status: 200, data: response?.data });
    } catch (error) {
        return NextResponse.json({ status: error?.response?.status, message: error?.response.data })
    }
}

export async function GET(req) {
    const headers = new Headers(req.headers)
    const at = headers.get('at');
    const { searchParams } = new URL(req.url);
    const uuid = searchParams.get('uuid');
    const task_uuid = searchParams.get('taskUuid');

    try {
        const decryptedToken = decryptToken(at);
        const { token } = decryptedToken;

        const microservice = microserviceCaller(token);

        const response = await microservice.get(`/ic-teams/task-uploaded-file-requirements/${task_uuid}?file_requirement_item_uuid=${uuid}`);
        return NextResponse.json({status: 200, data: response.data})
    } catch (error) {
        console.log(error)
        return NextResponse.json({status: error?.response.status, message: error?.response.data});
    }
}