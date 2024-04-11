import microserviceCaller from "@/app/(ic-teams)/lib/ApiCaller/microserviceCaller";
import { decryptToken } from "@/utils/cryptoJs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(req) {
    const at = cookies().get('at').value;
    const { searchParams } = new URL(req.url);
    const status = await req.json();
    const uuid = searchParams.get('uuid');

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    try {
        let status_uuid = ''

        switch (status) {
            case 'pending': status_uuid = 'MtiMh8BRAPZk3oZv';
                break;
            case 'ongoing': status_uuid = 'DuznMjz3RHzSRGBg';
                break;
            case 'onhold': status_uuid = 't2hPi3eEqWUjLkTa';
                break;
            case 'completed': status_uuid = '7e2ec0ea-a154-460c-9394-5e6b99c73b2d';
                break;
        }

        const response = await microservice.put(`/ic-teams/target-statuses/${uuid}`, { status_uuid })
        return NextResponse.json({ status: 200, data: response.data });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: error?.response.status, message: error?.response.data })
    }
}