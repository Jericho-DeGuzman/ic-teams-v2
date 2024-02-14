'use client'
import Select from 'react-select'
import TaskBoard from '@/app/components/board/taskBoard'
import { useEffect, useState } from 'react'

// list on kanban board.
const boards = [
    { id: 0, type: 'pending', name: 'Pending' },
    { id: 1, type: 'doing', name: 'Doing' },
    { id: 2, type: 'review', name: 'For Review' },
    { id: 3, type: 'done', name: 'Done' },
    { id: 4, type: 'revise', name: 'For Revise' }
]

export default function TargetTask({uuid}) {
    const [cards, setCards] = useState(null);

    // TODO: try to create better solution.
    // TODO: add try catch block for error handling.
    useEffect(() => {
        const loadTasks = async () => {
            const response = await fetch(`http://localhost:3000/api/tasks?id=${uuid}`, {
                method: 'get'
            })

            const result = await response.json();
            if (result.status == 200) setCards(result?.tasks);
        }
        loadTasks();
    }, [])

    // TODO: create better UI for empty folder
    if (!cards) {
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
                    <TaskBoard key={board.id} id={board.id} uuid={uuid} type={board.type} name={board.name}
                        tasks={cards.tasks.filter((task) => task.status == board.type)}
                    />
                ))}
            </main>
        </section>
    )
}