import microserviceCaller from "@/app/(ic-teams)/lib/ApiCaller/microserviceCaller";
import { decryptToken } from "@/utils/cryptoJs";
import sanitizeInput from "@/utils/sanitizeInput";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    const newTask = await req.json();
    const at = cookies().get('at').value;

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const { target_uuid, title, description, due_date, assigned_members, file_requirement_items } = newTask;
    const assignees = [];

    assigned_members.map((member) => {
        assignees.push({ id: member.value });
    })

    const task = { target_uuid, title, description, due_date, file_requirement_items };

    for (const key in task) {
        if (key !== 'members' || key !== 'file_requirement_items') {
            const val = task[key];
            task[key] = sanitizeInput(val);
        }
    }

    const microservice = microserviceCaller(token);

    try {
        const response = await microservice.post('/ic-teams/tasks', task);
        const { data: { uuid } } = response;

        if (assignees.length > 0) {
            const assignees_response = await microservice.post(`/ic-teams/task-assignees`, { 
                task_uuid: uuid,
                task_assignees: assignees 
            });
        }

        const addedTask = await microservice.get(`/ic-teams/tasks/${uuid}`);

        return NextResponse.json({ status: 200, data: addedTask.data });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: error?.response.status, message: error?.response.data });
    }
}

export async function PUT(req) {
    const at = cookies().get('at').value;
    const updateTask = await req.json();

    const { searchParams } = new URL(req.url);
    const task_uuid = searchParams.get('uuid');

    const { title, description, due_date, status_id, target: { uuid } } = updateTask
    const target_uuid = uuid;

    const task = { target_uuid, title, description, due_date, status_id };

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    try {
        const response = await microservice.put(`/ic-teams/tasks/${task_uuid}`, task);
        return NextResponse.json({ status: 200, data: response?.data })
    } catch (error) {
        return NextResponse.json({ status: error?.response.status, message: error?.response.data })
    }
}

export async function GET(req) {
    const headers = new Headers(req.headers);
    const at = headers.get('at');
    const { searchParams } = new URL(req.url);
    const uuid = searchParams.get('uuid');


    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    try {
        const response = await microservice.get(`/ic-teams/tasks/${uuid}`);
        const { data } = response;

        return NextResponse.json({ status: 200, data: data })

    } catch (error) {
        return NextResponse.json({ status: error?.response.status, message: error?.response.data })
    }
}

export async function DELETE(req) {
    const at = cookies().get('at').value;
    const { searchParams } = new URL(req.url);
    const uuid = searchParams.get('uuid');

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    try {
        const response = await microservice.delete(`/ic-teams/tasks/${uuid}`);

        return NextResponse.json({ status: 200, data: response?.data });
    } catch (error) {
        return NextResponse.json({ status: error?.response.status, message: error?.response?.data });
    }
}