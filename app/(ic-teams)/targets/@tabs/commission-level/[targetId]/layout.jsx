'use client'
import { useState } from "react"

export default function CommissionTargetLayout({ children, title, overview, comments, task, activity, member, modal }) {
    const [activeTabs, setActiveTabs] = useState('task')

    return (
        <section className="w-full min-h-screen p-4 space-y-2">
            <header className="w-full">
                {title}
            </header>
            <div className="w-full min-h-screen flex gap-2">
                <aside className="w-3/12 flex flex-col min-h-screen">
                    <div className="w-full">
                        {overview}
                    </div>
                    <div className="w-full mt-auto">
                        {comments}
                    </div>
                </aside>
                <main className="min-h-screen w-9/12">
                    <header className="w-full text-gray-400 flex">
                        <button className={`py-2 px-4 ${activeTabs == 'task' && 'text-blue-500 border-x-[1px] border-t-[1px] border-gray-400 bg-white top-[1px] relative'}
                    hover:text-blue-500 duration-300`} onClick={() => setActiveTabs('task')}>
                            Task
                        </button>
                        <button className={`py-2 px-4 ${activeTabs == 'activity' && 'text-blue-500 border-x-[1px] border-t-[1px] border-gray-400 bg-white top-[1px] relative'}
                    hover:text-blue-500 duration-300`} onClick={() => setActiveTabs('activity')}>
                            Activity
                        </button>
                        <button className={`py-2 px-4 ${activeTabs == 'member' && 'text-blue-500 border-x-[1px] border-t-[1px] border-gray-400 bg-white top-[1px] relative'}
                    hover:text-blue-500 duration-300`} onClick={() => setActiveTabs('member')}>
                            Member
                        </button>
                    </header>
                    <main className="min-h-screen border-[1px] border-gray-400">
                        {activeTabs == 'task' && task}
                        {activeTabs == 'activity' && activity}
                        {activeTabs == 'member' && member}
                    </main>
                </main>
            </div>
            {modal}
        </section>
    )
}