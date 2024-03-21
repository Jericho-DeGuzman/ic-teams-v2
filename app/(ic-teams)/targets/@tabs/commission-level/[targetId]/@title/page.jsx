import microserviceCaller from "@/app/(ic-teams)/lib/ApiCaller/microserviceCaller";
import TargetTitleHeader from "@/app/components/header/targetTitleHeader";
import { decryptToken } from "@/utils/cryptoJs";
import { cookies } from "next/headers";

async function loadTitle(uuid) {
    const at = cookies().get('at').value;

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    try {
        const response = await microservice.get(`/ic-teams/targets/${uuid}`);
        return response?.data;
    } catch (error) {
        throw new Error(error)
    }
}

export default async function TitlePage({ params }) {
    const { targetId } = params;
    const target = await loadTitle(targetId);
    
    return (
        <TargetTitleHeader key={targetId} uuid={targetId} title={target?.title} />
    )
}