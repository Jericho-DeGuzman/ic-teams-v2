'use client'
import Select from 'react-select'
import TaskBoard from '@/app/components/board/taskBoard'
import { Suspense, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { setCardTask } from '@/app/redux/features/cardPositions'
import TaskLoading from '@/app/components/loading/taskLoading'

// list on kanban board.
const boards = [
    { id: 0, type: 'pending', name: 'Pending' },
    { id: 1, type: 'doing', name: 'Doing' },
    { id: 2, type: 'review', name: 'For Review' },
    { id: 3, type: 'done', name: 'Done' },
    { id: 4, type: 'revise', name: 'For Revise' }
]

export default function TargetTask() {
    const cards = useAppSelector(state => state.cardPositionSlice.tasks);
    // TODO: create better UI for empty folder
    if (!cards.length) {
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
                        <TaskBoard key={board.id} id={board.id} type={board.type} name={board.name}
                            cards={cards.filter((task) => board.type == task.status)}
                        />
                    </Suspense>
                ))}
            </main>
        </section>
    )
}