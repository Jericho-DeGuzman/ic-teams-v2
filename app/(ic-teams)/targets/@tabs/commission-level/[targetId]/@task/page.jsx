import microserviceCaller from '@/app/(ic-teams)/lib/ApiCaller/microserviceCaller';
import KanbanBoard from '@/app/components/board/kanbanBoard'
import { decryptToken } from '@/utils/cryptoJs';
import { cookies } from 'next/headers';

async function loadTask(uuid) {
    const sorted = {
        todo: [],
        inprogress: [],
        review: [],
        done: [],
    };

    const at = cookies().get('at').value;

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    try {
        const response = await microservice.get(`/ic-teams/tasks`, {
            params: { 'target_uuid': uuid }
        })

        const { data } = response.data;

        data.map((task) => {
            sorted[task.status.machine_name].push(task);
        })

        return sorted;

    } catch (error) {
        throw new Error(error)
    }       
}

export default async function TaskPage({ params }) {
    const { targetId } = params;
    const tasks = await loadTask(targetId);

    return (
        <section className="w-full min-h-screen p-4 overflow-hidden space-y-4">
            <KanbanBoard key={'kanban'} tasks={tasks} uuid={targetId} />
        </section>
    )
}