import microserviceCaller from "@/app/(ic-teams)/lib/ApiCaller/microserviceCaller";
import { decryptToken } from "@/utils/cryptoJs";
import sanitizeInput from "@/utils/sanitizeInput";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get('uuid');

    const headers = new Headers(req.headers);
    const at = headers.get('at');

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    try {
        const response = await microservice.get(`/ic-teams/sub-tasks?task_uuid=${taskId}`);
        return NextResponse.json({ status: 200, data: response?.data });
    } catch (error) {
        return NextResponse.json({ status: error?.response.status, message: error?.response.data });
    }
}

export async function POST(req) {
    const at = cookies().get('at').value;
    const body = await req.json();

    const { task_uuid, title } = body;
    const subtask = { task_uuid, title };
    subtask['title'] = sanitizeInput(subtask['title']);

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    try {
        const response = await microservice.post(`/ic-teams/sub-tasks?task_uuid=${task_uuid}`, subtask);
        return NextResponse.json({status: 200, data: response?.data})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: error?.response.status, message: error?.response.data });
    }
}