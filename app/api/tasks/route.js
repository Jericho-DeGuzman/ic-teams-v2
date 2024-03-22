import microserviceCaller from "@/app/(ic-teams)/lib/ApiCaller/microserviceCaller";
import { decryptToken } from "@/utils/cryptoJs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    const newTask = await req.json();
    const at = cookies().get('at').value;

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);
    //TODO FIX ADDING MEMBERS/ASSIGNEES;

    try {
        const response = await microservice.post('/ic-teams/tasks', newTask);
        const { data: { uuid } } = response;

        const addedTask = await microservice.get(`/ic-teams/tasks/${uuid}`);
        
        return NextResponse.json({status: 200, data: addedTask.data});
    } catch (error) {
        return NextResponse.json({ status: error?.response.status, message: error?.response.data });
    }

}