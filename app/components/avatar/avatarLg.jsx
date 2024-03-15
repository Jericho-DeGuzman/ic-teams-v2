import microserviceCaller from "@/app/(ic-teams)/lib/ApiCaller/microserviceCaller";
import { decryptToken } from "@/utils/cryptoJs";
import { DefaultPhoto } from "@/utils/imageUtils";
import { cookies } from "next/headers";
import Image from "next/image";
import { permanentRedirect } from "next/navigation";

async function loadProfilePic(id) {
    const at = cookies().get('at').value;

    if (!at) permanentRedirect('/unauthorized');

    try {
        // decrypt token
        const decryptedToken = decryptToken(at);
        const { token } = decryptedToken;

        const microservice = microserviceCaller(token);

        const response = await microservice.get(`/files/files/${id}`);

        const { file } = response.data;

        return file;

    } catch (error) {
        if (error?.response?.status == 404) return null;
        if (error?.response?.status == 401) return 'unauthorized';
        throw new Error('something went wrong!') //TODO: handle this error properly.
    }
}


export default async function AvatarLg({ id }) {
    const profile = await loadProfilePic(id) || DefaultPhoto;

    return (
        <div className="rounded-full w-[72px] h-[72px] overflow-hidden border-[1px] border-blue-500">
            <Image src={profile} width={72} height={72} alt="profile" priority={true} />
        </div>
    )
}