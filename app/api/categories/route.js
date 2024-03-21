import microserviceCaller from "@/app/(ic-teams)/lib/ApiCaller/microserviceCaller";
import { decryptToken } from "@/utils/cryptoJs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
    const at = cookies().get('at').value;

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    const response = await microservice.get('/ic-teams/categories');

    const { data } = response;

    const categories = [];

    data.map((val) => {
        categories.push({ value: val.uuid, label: val.name });
    })

    return NextResponse.json({ status: 200, data: categories })
}