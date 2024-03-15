// TODO I'm just a dummy data, please replace me later.
import TargetsDummy from '@/sample_data/targetData';

// TODO connect IC Microservice later.
// this endpoint is for testing only.
// api should be in IC microservices.
const data = TargetsDummy()
function retrieveById(id) {
    const targets = data.find(item => item.uuid == id)
    return targets;
}

function retrieveByLevel(level) {
    const targets = data.filter(item => item.level == level )
    return targets;
}

export function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const level = searchParams.get('level');

    if (id) {
        const targets = retrieveById(id);
        if (!targets) return Response.json({ status: 200, error: 'Item not found.' });
        return Response.json({ status: 200, message: 'Item found.', data: targets });
    }

    if (level) {
        const targets = retrieveByLevel(level);
        if (!targets) return Response.json({ status: 200, error: 'Item not found.' });
        return Response.json({ status: 200, message: 'Item found.', data: targets });
    }

    return Response.json({ status: 200, data: data });
}

export function POST() {
     
}