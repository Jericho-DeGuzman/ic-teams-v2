'use client'
import React, { memo } from "react";
import TaskCard from "../card/taskCard";
import TaskDropArea from "./taskDropArea";

const TaskBoard = memo(({ title, id, cards, onDrop }) => {
    return (
        <section className='w-[20%] min-h-screen'>
            <header className={`w-full text-[12px] p-2 rounded-t-md text-center font-semibold text-white bg-blue-500`}>
                <span>{title}</span>
                <span>{`(${cards.length})`}</span>
            </header>
            <main className='w-full p-2 bg-gray-200 min-h-screen rounded-b-md' style={{borderWidth: '1px'}}>
                <TaskDropArea onDrop={() => onDrop(id, 0)} />
                {cards.map((task, index) => (
                    <React.Fragment key={task.uuid}>
                        <TaskCard {...task} />
                        <TaskDropArea onDrop={() => onDrop(id, index + 1)} />
                    </React.Fragment>
                ))}
            </main>
        </section>
    )
})

TaskBoard.displayName = 'TaskBoard';
export default TaskBoard;   