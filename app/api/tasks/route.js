// TODO: this is just temporary api, replace with IC microservice.

import TasksDummy from "@/sample_data/tasksData";

const data = TasksDummy();

function retrieveById(id) {
    const tasks = data.find(item => item.uuid == id);
    return tasks;
}

export function GET(req) {
    const {searchParams} = new URL(req.url);
    const id = searchParams.get('id');

    if(!id) {
        return Response.json({status: 404, error: 'No item found.'})
    }

    const tasks = retrieveById(id);
    return Response.json({status: 200, message: 'Items found', tasks: tasks})
}