'use server'
import { decryptToken } from "@/utils/cryptoJs";
import { cookies } from "next/headers";
import microserviceCaller from "../microserviceCaller";

export default async function loadDistributionGroup() {
    const at = cookies().get('at').value;

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    const response = await microservice.get('/core-v3/distribution-groups');

    const { data } = response.data;
    
    const selection = [];

    data.map((val) => {
        selection.push({ value: val.id, label: val.name })
    })

    return selection;

}