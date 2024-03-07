import microserviceCaller from "@/app/(ic-teams)/lib/ApiCaller/microserviceCaller";
import authenticate from "@/utils/auth";
import { decryptToken } from "@/utils/cryptoJs";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export const dynamicParams = true;
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

export async function GET() {
    //check user authentication
    //const isAuth = authenticate();
    //console.log(isAuth);
    //if (!isAuth) return NextResponse.json({ message: 'Unauthorized access', status: 401 });
    try {
        const header = headers();
        //get and decrypt authorization bearer
        const encryptedToken = header.get('Authorization');
        const decryptedToken = decryptToken(encryptedToken);

        const { token } = decryptedToken;
        console.log(token)
        const microservice = microserviceCaller(token);
        //fetch to ic microservice
        const response = await microservice.get(`/core-v3/users?app_id=${process.env.APP_ID}`);

        const { id, first_name, middle_name, last_name, data, roles: [{ role_permissions }] } = response.data;
        
        return NextResponse.json({ data: { id, first_name, middle_name, last_name, data, role_permissions }, status: 200 });

    } catch (error) {
        if(error?.response?.status == 401) return NextResponse.json({message: 'Unauthorized access', status: 401});
        return NextResponse.json({ data: error, message: 'something went wrong', status: 500 });
    }
}