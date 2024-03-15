'use server'
import { decryptToken } from "@/utils/cryptoJs";
import { cookies } from "next/headers";
import microserviceCaller from "../microserviceCaller";

export default async function loadCategories() {
    const at = cookies().get('at').value;

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    const response = await microservice.get('/ic-teams/categories');

    const { data } = response;
    
    const selection = [];

    data.map((val) => {
        selection.push({id: val.id, label: val.name})
    })

    return selection;

}