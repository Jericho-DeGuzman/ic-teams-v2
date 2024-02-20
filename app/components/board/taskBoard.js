'use client'
import React, { memo } from "react";
import TaskCard from "../card/taskCard";
import TaskDropArea from "./taskDropArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const TaskBoard = memo(({ title, id, cards, onDrop }) => {
    return (
        <section className='w-[25%] min-h-screen z-10'>
            {id == 'todo' ? (
                <header className={`w-full text-[12px] p-2 rounded-t-md text-center font-semibold text-white bg-blue-500
                    grid grid-cols-3 gap-1`}>
                    <div className="flex justify-start items-center">
                        <div className="flex items-center justify-center tooltip tooltip-right" data-tip="add new task.">
                            <FontAwesomeIcon icon={faPlus} className="w-4 h-4 p-1 cursor-pointer rounded-full hover:bg-blue-600 duration-200" />
                        </div>
                    </div>

                    <div className="flex items-center justify-start gap-1 p-1 col-span-2">
                        <span>{title}</span>
                        <span>{`(${cards.length})`}</span>
                    </div>
                </header>
            ) : (
                <header className={`w-full text-[12px] p-2 rounded-t-md text-center font-semibold text-white bg-blue-500
                    flex items-center justify-center`}>
                    <div className="flex items-center justify-center gap-1 p-1">
                        <span>{title}</span>
                        <span>{`(${cards.length})`}</span>
                    </div>
                </header>
            )}
            <main className='w-full p-2 bg-gray-200 min-h-screen rounded-b-md' style={{ borderWidth: '1px' }}>
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