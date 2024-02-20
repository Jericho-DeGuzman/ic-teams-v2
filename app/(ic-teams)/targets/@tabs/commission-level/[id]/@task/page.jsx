import { baseUrl } from '@/app/constant/url'
import KanbanBoard from '@/app/components/board/kanbanBoard'
import { EmptyFolder } from '@/utils/imageUtils';
import Image from 'next/image';

async function loadTask(id) {
    const sorted = {};
    try {
        const response = await fetch(`${baseUrl}/api/tasks?id=${id}`, {
            method: 'get',
        })

        const result = await response.json();
        const {tasks, status} = result;

        //TODO: hanle with better approach
        if(status !== 200) console.log(result);

        tasks.tasks.map((task) => {
            if(!sorted.hasOwnProperty(task.status)) {
                sorted[task.status] = [];
            }

            sorted[task.status].push(task);
        })

        return sorted;
    } catch(error) {
        console.log(error);
    }
}

export default async function TaskPage({ params }) {
    const { id } = params;
    const tasks = await loadTask(id);

    // check if cards or tasks is empty.
    if (!tasks) {
        return (
            <div className='w-full min-h-screen flex items-center justify-center text-gray-400
                flex-col space-y-2'>
                <Image src={EmptyFolder} height={72} width={72} alt='icon' />
                <p>
                    No available task.
                </p>
            </div>
        )
    }

    return (
        <section className="w-full min-h-screen p-4 overflow-hidden space-y-4">
            <KanbanBoard key={'kanban'} tasks={tasks} />
        </section>
    )
}