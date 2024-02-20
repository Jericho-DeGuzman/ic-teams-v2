'use client'
import Select from 'react-select'
import TaskBoard from '@/app/components/board/taskBoard'
import { Suspense, useEffect, useState } from 'react'
import Image from 'next/image'
import { EmptyFolder } from '@/utils/imageUtils'
import { moveCardTask } from '@/utils/moveCardTaks'
import { useAppSelector } from '@/app/redux/hooks'
import { useKanbanStore } from '@/app/zustand/kanban-store'
import { baseUrl } from '@/app/constant/url'

// list on kanban board.
const boards = [
    { id: 'todo', title: 'To Do' },
    { id: 'inprogress', title: 'In Progress' },
    { id: 'review', title: 'For Review' },
    { id: 'done', title: 'Done' },
]

export default function TaskPage({ params }) {
    const { id } = params;
    const [cards, setCards] = useState({});
    const draggingCard = useKanbanStore((state) => state.draggingCard) // active dragging card.

    // get task.
    //TODO: make sure to match data from IC microservice.
    //TODO: make the function with try catch block.
    useEffect(() => {
        const setTask = async () => {
            const sorted = {};
            try {
                // fetch task.
                const response = await fetch(`${baseUrl}/api/tasks?id=${id}`, {
                    method: 'get',
                })
                const result = await response.json();
                const { tasks, status } = result;

                if (status !== 200) console.log(result);
                // sort task for front end use.
                // try to optimized.
                tasks.tasks.map((task) => {
                    //check if status category is already exist.
                    if (!sorted.hasOwnProperty(task.status)) {
                        sorted[task.status] = [];
                    }
                    sorted[task.status].push(task);
                })
                setCards(sorted);
            } catch (err) {
                console.log(err)
            }
        }

        setTask();
    }, [])

    // function when cards is drop and move.
    // TODO: add a function that also update the task on microservice.
    const onDrop = (board, index) => {
        if (!draggingCard) return;
        const newCards = moveCardTask({
            cards,
            cardId: draggingCard,
            board,
            index
        })
        setCards(newCards);
    }

    // check if cards or tasks is empty.
    if (!Object.keys(cards).length) {
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
            <main className='min-h-screen w-full flex gap-2' >
                {boards.map((board) => (
                    <TaskBoard key={board.id} id={board.id} title={board.title} onDrop={onDrop}
                        cards={cards[board.id]} />))}
            </main>
        </section>
    )
}