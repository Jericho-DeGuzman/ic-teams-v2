'use client'
import Select from 'react-select'
import TaskBoard from '@/app/components/board/taskBoard'
import { Suspense, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import TaskLoading from '@/app/components/loading/taskLoading'

// new solution.
// fetch task -> store in different array by status but in one object.
// render kanban board and task.
// drag and drop card.

// list on kanban board.
const boards = [
    { id: 'pending', title: 'Pending' },
    { id: 'doing', title: 'Doing' },
    { id: 'review', title: 'For Review' },
    { id: 'done', title: 'Done' },
    { id: 'done', title: 'For Revise' }
]

export default function TargetTask({ uuid }) {
    const [cards, setCards] = useState(null);
    // get task.
    //TODO: make sure to match data from IC microservice.
    //TODO: make the function with try catch block.
    useEffect(() => {
        const setTask = async () => {
            const sorted = {};
            // fetch task.
            const response = await fetch(`http://localhost:3000/api/tasks?id=${uuid}`, {
                method: 'get',
            })
            const result = await response.json();
            const {tasks, status} = result;

            if(status !== 200) console.log(result);
            // sort task for front end use.
            // try to optimized.
            tasks.tasks.map((task) => {
                //check if status category is already exist.
                if(!sorted.hasOwnProperty(task.status)) {
                    sorted[task.status] = [];
                }
                sorted[task.status].push(task);
            })
            setCards(sorted);
        }
        setTask();
    }, [])

    // TODO: create better UI for empty folder
    if (cards == null) {
        return (
            <div className='w-full min-h-screen flex items-center justify-center text-gray-400'>
                No available task.
            </div>
        )
    }

    return (
        <section className="w-full min-h-screen p-4 overflow-hidden space-y-4">
            <header className="w-full flex items-center gap-2 text-[12px]">
                <span className='text-gray-400'>Filter:</span>
                <Select className='w-4/12' placeholder='Status' />
            </header>
            <main className='min-h-screen w-full flex gap-2' >
                {boards.map((board) => (
                    <Suspense key={board.id} fallback={<TaskLoading />}>
                        <TaskBoard key={board.id} id={board.id} title={board.title}
                            cards={cards[board.id]} />
                    </Suspense>
                ))}
            </main>
        </section>
    )
}