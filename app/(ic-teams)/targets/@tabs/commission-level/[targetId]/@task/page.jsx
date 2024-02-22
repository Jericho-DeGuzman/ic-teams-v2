import KanbanBoard from '@/app/components/board/kanbanBoard'

async function loadTask(uuid) {
    const sorted = {
        todo: [],
        inprogress: [],
        review: [],
        done: [],
    };

    try {
        const response = await fetch(`${process.env.BASE_URL}/api/tasks?id=${uuid}`, {
            method: 'get',
        })

        const result = await response.json();
        const { tasks, status } = result;

        //TODO: hanle with better approach
        if (status !== 200) console.log(result);

        tasks.tasks.map((task) => {
            sorted[task.status].push(task);
        })
    } catch (error) {
        console.log(error);
    } finally {
        return sorted;
    }
}

export default async function TaskPage({ params }) {
    const { targetId } = params;
    const tasks = await loadTask(targetId);

    // check if cards or tasks is empty.
    // if (!tasks) {
    //     return (
    //         <div className='w-full min-h-screen flex items-center justify-center text-gray-400
    //             flex-col space-y-2'>
    //             <Image src={EmptyFolder} height={72} width={72} alt='icon' />
    //             <p>
    //                 No available task.
    //             </p>
    //         </div>
    //     )
    // }

    return (
        <section className="w-full min-h-screen p-4 overflow-hidden space-y-4">
            <KanbanBoard key={'kanban'} tasks={tasks} />
        </section>
    )
}