import microserviceCaller from "@/app/(ic-teams)/lib/ApiCaller/microserviceCaller";
import { decryptToken } from "@/utils/cryptoJs";
import sanitizeInput from "@/utils/sanitizeInput";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
    const headers = new Headers(req.headers);
    const at = headers.get('at');

    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page');
    const uuid = searchParams.get('uuid');

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    if (uuid) {
        try {
            const response = await microservice.get(`/ic-teams/targets/${uuid}`);
            const { data } = response;

            return NextResponse.json({ status: 200, data: data });

        } catch (error) {
            return NextResponse.json({ status: error?.response.status, message: error?.response.data });
        }
    }

    try {
        const response = await microservice.get(`/ic-teams/targets?page=${page}&per_page=12`);
        const { data } = response;
        return NextResponse.json({ status: 200, data: data });
    } catch (error) {
        return NextResponse.json({ status: error?.response.status, message: error?.response.data })
    }
}

export async function POST(req) {
    const at = cookies().get('at').value;
    const newTarget = await req.json();

    const { title, level_uuid, type, category_uuid, description, distribution, start_date, end_date } = newTarget;
    const distribution_groups_array = [];

    distribution.map((val) => {
        distribution_groups_array.push({ id: val.value })
    })

    const distribution_groups = JSON.stringify(distribution_groups_array);

    const target = { title, level_uuid, type, category_uuid, distribution_groups, description, start_date, end_date };

    for (const key in target) {
        if (key !== 'distribution_groups') {
            const val = target[key]
            target[key] = sanitizeInput(val);
        }
    }

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    try {

        const response = await microservice.post('/ic-teams/targets', target);
        const { data: { uuid } } = response;

        const addedTarget = await microservice.get(`/ic-teams/targets/${uuid}`);

        return NextResponse.json({ status: 200, data: addedTarget.data });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: error?.response?.status, message: error?.response?.data });
    }
}

export async function PUT(req) {
    const at = cookies().get('at').value;
    const updateTarget = await req.json();

    const { searchParams } = new URL(req.url);
    const targetId = searchParams.get('uuid');

    const { uuid, title, level_uuid, category_uuid, description, distribution, start_date, end_date, type } = updateTarget;
    const distribution_groups_array = [];

    distribution.map((val) => {
        distribution_groups_array.push({ id: val.value })
    })

    const distribution_groups = JSON.stringify(distribution_groups_array);

    const target = { uuid, title, level_uuid, category_uuid, distribution_groups, description, start_date, end_date, type };

    for (const key in target) {
        if (key !== 'distribution_groups') {
            const val = target[key]
            target[key] = sanitizeInput(val);
        }
    }

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    try {
        const response = await microservice.put(`/ic-teams/targets/${targetId}`, target);
        const { data: { uuid } } = response;

        const addedTarget = await microservice.get(`/ic-teams/targets/${uuid}`);

        return NextResponse.json({ status: 200, data: addedTarget.data });

    } catch (error) {
        return NextResponse.json({ status: error?.response?.status, message: error?.response?.data });
    }
}

export async function DELETE(req) {
    const at = cookies().get('at').value;
    const { searchParams } = new URL(req.url);
    const uuid = searchParams.get('uuid');

    try {
        const decryptedToken = decryptToken(at);
        const { token } = decryptedToken;

        const microservice = microserviceCaller(token);

        const response = await microservice.delete(`/ic-teams/targets/${uuid}`);

        return NextResponse.json({ status: 200, message: 'Target deleted' })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: error?.response.status, message: error?.response.statusText })
    }

}