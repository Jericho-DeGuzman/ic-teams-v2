import microserviceCaller from "@/app/(ic-teams)/lib/ApiCaller/microserviceCaller";
import { decryptToken } from "@/utils/cryptoJs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(req) {
    const at = cookies().get('at').value;
    const status = await req.json();

    const { searchParams } = new URL(req.url);
    const uuid = searchParams.get('uuid');

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    try {
        let status_uuid = '';

        switch (status) {
            case 'todo': status_uuid = 'e57a9b1f-34d7-4c23-9101-e71613718d78';
                break;
            case 'inprogress': status_uuid = 'cd4bfded-13b7-45b6-9365-b102dae6c92b';
                break;
            case 'review': status_uuid = '6e3ae4db-9458-4304-8b4b-8e2f71e1bac6';
                break;
            case 'done': status_uuid = 'zI9vqYP1HyU82nvb';
                break
        }

        const response = await microservice.put(`/ic-teams/task-statuses/${uuid}`, { status_uuid });

        return NextResponse.json({ status: 200 })
    } catch (error) {
        return NextResponse.json({ status: error?.response.status, message: error?.response.data })
    }
}