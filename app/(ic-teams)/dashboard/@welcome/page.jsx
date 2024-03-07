import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";

async function loadUser() {
    const at = cookies().get('at').value;

    if (!at) permanentRedirect('/unauthorized');

    try {
        const response = await fetch(`${process.env.BASE_URL}/api/users`, {
            method: 'get',
            headers: { 'Authorization': at }
        })

        const result = await response.json();
        console.log(result.data);
        if(result?.status == 401) return 'unauthorized';

        return result?.data;
    } catch (error) {
        console.log(error)
    }
}


export default async function WelcomePage() {
    const loadedUser = await loadUser();

    if (loadedUser == 'unauthorized') permanentRedirect('/unauthorized')

    const { first_name, last_name } = loadedUser || {};
    const username = `${first_name || '' } ${last_name || '' }`;

    return (
        <div>
            <h1 className="text-[24px] font-bold">Hi, {username} 👋 </h1>
            <p className="text-gray-400 text-[12px]">Let&apos;s track you Daily Tasks & Targets.</p>
        </div>
    )
}