import { decryptToken } from "@/utils/cryptoJs";
import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";
import microserviceCaller from "../../lib/ApiCaller/microserviceCaller";
import AvatarLg from "@/app/components/avatar/avatarLg";
import { Suspense } from "react";
import styles from '../target.module.css'

// get user information.
async function loadUser() {
    const at = cookies().get('at').value;
    try {
        // decrypt token
        const decryptedToken = decryptToken(at);
        const { token } = decryptedToken;

        const microservice = microserviceCaller(token);

        const response = await microservice.get(`/core-v3/users`, {
            params: { 'app_id': process.env.APP_ID }
        });

        const { first_name, last_name, profile_pic_id } = response.data;

        return { first_name, last_name, profile_pic_id };

    } catch (error) {
        throw new Error(error?.response?.data) //TODO: handle this error properly.
    }
}


export default async function WelcomePage() {
    const loadedUser = await loadUser();

    const { first_name, last_name, profile_pic_id } = loadedUser || {};
    const username = `${first_name || ''} ${last_name || ''}`;

    return (
        <>
            <Suspense fallback={<div className="w-[72px] h-[72px] bg-gray-300 animate-pulse duration-300 rounded-full" />}>
                <AvatarLg key={0} id={profile_pic_id} />
            </Suspense>
            <div>
                <h1 className={`${styles.welcome} font-bold`}>Hi, {username} 👋 </h1>
                <p className="text-gray-400 text-[12px]">Track your Daily Tasks & Targets.</p>
            </div>
        </>
    )
}