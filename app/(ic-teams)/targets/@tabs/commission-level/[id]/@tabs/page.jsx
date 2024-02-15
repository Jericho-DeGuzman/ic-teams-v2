'use client'
import { Suspense, useEffect, useState } from "react"
import TargetTask from "./targetTask"
import TargetActivity from "./targetActivity"
import TargetMember from "./targetMember"
import TaskLoading from "@/app/components/loading/taskLoading"
import { useAppDispatch } from "@/app/redux/hooks"
import { setCardTask } from "@/app/redux/features/cardPositions"

export default function CommissionTargetTabs({ params }) {
    // to set active tab.
    const [active, setActive] = useState('task');
    const dispatch = useAppDispatch();


    // get target task & store to redux to render on kanban board.
    useEffect(() => {
        const loadTasks = async () => {
            const response = await fetch(`http://localhost:3000/api/tasks?id=${params.id}`, {
                method: 'get'
            })

            const result = await response.json();
            if (result.status == 200) dispatch(setCardTask(result?.tasks.tasks));
        }
        loadTasks();
    }, [])

    // to render which tab is selected
    const renderComponent = () => {
        if (active == 'task') return <TargetTask />
        if (active == 'activity') return <TargetActivity uuid={params.id} />
        if (active == 'member') return <TargetMember uuid={params.id} />
    }

    return (
        <section className="w-full">
            <header className="w-full text-gray-400 flex">
                <button className={`py-2 px-4 ${active == 'task' && 'border-x-[1px] border-t-[1px] border-gray-400 bg-white top-[1px] relative'}
                    hover:text-blue-500 duration-300`} onClick={() => setActive('task')}>
                    Task
                </button>
                <button className={`py-2 px-4 ${active == 'activity' && 'border-x-[1px] border-t-[1px] border-gray-400 bg-white top-[1px] relative'}
                    hover:text-blue-500 duration-300`} onClick={() => setActive('activity')}>
                    Activity
                </button>
                <button className={`py-2 px-4 ${active == 'member' && ' border-x-[1px] border-t-[1px] border-gray-400 bg-white top-[1px] relative'}
                    hover:text-blue-500 duration-300`} onClick={() => setActive('member')}>
                    Member
                </button>
            </header>
            <main className="min-h-screen border-[1px] border-gray-400">
                {renderComponent()}
            </main>
        </section>
    )
}