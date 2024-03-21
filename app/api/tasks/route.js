// // TODO: this is just temporary api, replace with IC microservice.

import microserviceCaller from "@/app/(ic-teams)/lib/ApiCaller/microserviceCaller";
import { decryptToken } from "@/utils/cryptoJs";
import { cookies } from "next/headers";

// import TasksDummy from "@/sample_data/tasksData";

// const data = TasksDummy();

// function retrieveById(id) {
//     const tasks = data.find(item => item.uuid == id);
//     return tasks;
// }

// export function GET(req) {
//     const {searchParams} = new URL(req.url);
//     const id = searchParams.get('id');

//     if(!id) {
//         return Response.json({status: 404, error: 'No item found.'})
//     }

//     const tasks = retrieveById(id);
//     return Response.json({status: 200, message: 'Items found', tasks: tasks})
// }

export async function POST(req) {
    const newTask = await req.json();
    const at = cookies().get('at').value;

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);
    console.log(newTask)
    try {
        const response = await microservice.post('/ic-teams/tasks', newTask);

        console.log(response)
    } catch(error) {
        console.log(error);
    }

}