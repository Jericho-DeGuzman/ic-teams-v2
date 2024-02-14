import React from "react";
import TaskCard from "../card/taskCard";
import TaskDropArea from "./taskDropArea";

export default async function TaskBoard({ id, type, name, tasks }) {
    return (
        <section className='w-[20%] min-h-screen'>
            <header className={`w-full text-[12px] p-2 rounded-t-md text-center font-semibold text-white
                ${type == 'pending' && 'bg-yellow-400'}
                ${type == 'doing' && 'bg-green-400'}
                ${type == 'review' && 'bg-purple-400'}
                ${type == 'done' && 'bg-green-500'}
                ${type == 'revise' && 'bg-green-400'}`}>
                {name}
            </header>
            <main className='w-full p-2 bg-gray-100 min-h-screen rounded-b-md'>
                <TaskDropArea />
                {tasks.map((task) => (
                    <React.Fragment key={task.uuid}>
                        <TaskCard uuid={task.uuid} title={task.title} />
                        <TaskDropArea />
                    </React.Fragment>
                ))}
            </main>
        </section>
    )
}