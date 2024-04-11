import microserviceCaller from "@/app/(ic-teams)/lib/ApiCaller/microserviceCaller";
import { decryptToken } from "@/utils/cryptoJs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
    const headers = new Headers(req.headers)
    const at = headers.get('at');
    const { searchParams } = new URL(req.url);
    const uuid = searchParams.get('uuid');

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    try {
        const response = await microservice.get(`/ic-teams/task-assignees?task_uuid=${uuid}`);
        return NextResponse.json({ status: 200, data: response.data });
    } catch (error) {
        return NextResponse.json({ status: error?.response.status, message: error?.response.data });
    }
}

export async function POST(req) {
    const at = cookies().get('at').value;
    const body = await req.json();

    const { task_uuid, updatedAssignees } = body;

    const task_assignees = [];

    updatedAssignees.map((member) => {
        task_assignees.push({id: member.value});
    })

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    try {
        const response = await microservice.post('/ic-teams/task-assignees', {task_uuid, task_assignees})
        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: error?.response.status, message: error?.response.data });
    }
}