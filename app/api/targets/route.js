import microserviceCaller from "@/app/(ic-teams)/lib/ApiCaller/microserviceCaller";
import { decryptToken } from "@/utils/cryptoJs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    const at = cookies().get('at').value;
    const newTarget = await req.json();

    const { title, level_uuid, type, category_uuid, description, distribution, start_date, end_date } = newTarget;
    const distribution_groups_array = [];

    distribution.map((val) => {
        distribution_groups_array.push({ id: val.value })
    })

    const distribution_groups = JSON.stringify(distribution_groups_array);

    const target = { title, level_uuid, type, category_uuid, distribution_groups, description, start_date, end_date }

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    try {

        const response = await microservice.post('/ic-teams/targets', target);
        const { data } = response;
        return NextResponse.json({status: 200, data: data});

    } catch (error) {
        return NextResponse.json({ status: error?.response?.status, message: error?.response?.data });
    }

}