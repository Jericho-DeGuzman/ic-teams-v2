import microserviceCaller from "@/app/(ic-teams)/lib/ApiCaller/microserviceCaller";
import { decryptToken } from "@/utils/cryptoJs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const at = cookies().get('at').value;

    if(!at) return NextResponse.json({status: 401, message: 'Unauthorized'});

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    const response = await microservice.get('/ic-teams/categories');

    const { data } = response;

    const categories = [];
    
    data.map((val) => {
        categories.push({value: val.id, label: val.name});
    })

    return NextResponse.json({status: 200, data: categories})
}