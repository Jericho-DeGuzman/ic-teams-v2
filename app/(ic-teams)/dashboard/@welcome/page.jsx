import { decryptToken } from "@/utils/cryptoJs";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";
import microserviceCaller from "../../lib/ApiCaller/microserviceCaller";

// get user information.
async function loadUser() {
    const at = cookies().get('at').value;

    if (!at) permanentRedirect('/unauthorized');

    try {
        // decrypt token
        const decryptedToken = decryptToken(at);
        const { token } = decryptedToken;

        const microservice = microserviceCaller(token);

        const response = await microservice.get(`/core-v3/users?app_id=${process.env.APP_ID}`);

        const { first_name, last_name } = response.data;

        return { first_name, last_name };

    } catch (error) {
        if (error?.response?.status == 401) return 'unauthorized';
        throw new Error ('something went wrong!') //TODO: handle this error properly.
    }
}


export default async function WelcomePage() {
    const loadedUser = await loadUser();

    if (loadedUser == 'unauthorized') permanentRedirect('/unauthorized')

    const { first_name, last_name } = loadedUser || {};
    const username = `${first_name || ''} ${last_name || ''}`;

    return (
        <div>
            <h1 className="text-[24px] font-bold">Hi, {username} 👋 </h1>
            <p className="text-gray-400 text-[12px]">Let&apos;s track you Daily Tasks & Targets.</p>
        </div>
    )
}