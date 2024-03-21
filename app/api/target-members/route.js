import microserviceCaller from "@/app/(ic-teams)/lib/ApiCaller/microserviceCaller";
import { decryptToken } from "@/utils/cryptoJs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
    const at = cookies().get('at').value;
    const { searchParams } = new URL(req.url);
    const uuid = searchParams.get('uuid');

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    try {
        const response = await microservice.get(`/ic-teams/target-members?target_uuid=${uuid}`);
        const {data} = response;

        const assignees = [];

        data.map((person) => {
            assignees.push({value: person.id, label: person.fullname});
        })

        return NextResponse.json({status: 200, data: assignees})

    } catch (error) {
        console.log(error)
        return NextResponse.json({status: error?.response.status, message: error?.response?.data})
    }
}