'use client'
import React, { memo, useState } from "react";
import TaskCard from "../card/taskCard";
import TaskDropArea from "./taskDropArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TaskEmptyDropArea from "./taskEmptyDropArea";
import { useAppDispatch } from "@/app/redux/hooks";
import { openTaskForm } from "@/app/redux/features/taskForm";

const TaskBoard = memo(({ title, id, cards, onDrop }) => {
    const dispatch = useAppDispatch();

    return (
        <section className='w-[25%] min-h-screen z-10'>
            {id == 'todo' ? (
                <header key={'todo-header'} className={`w-full text-[12px] p-2 rounded-t-md text-center font-semibold text-white bg-blue-500
                    grid grid-cols-3 gap-1`}>
                    <button className="flex justify-start items-center" onClick={() => dispatch(openTaskForm())}>
                        <div className="flex items-center justify-center tooltip tooltip-right" data-tip="add new task.">
                            <FontAwesomeIcon icon={faPlus} className="w-4 h-4 p-1 cursor-pointer rounded-full hover:bg-blue-600 duration-200" />
                        </div>
                    </button>

                    <div className="flex items-center justify-start gap-1 p-1 col-span-2">
                        <span>{title}</span>
                        <span>{`(${cards.length})`}</span>
                    </div>
                </header>
            ) : (
                <header key={id} className={`w-full text-[12px] p-2 rounded-t-md text-center font-semibold text-white bg-blue-500
                    flex items-center justify-center`}>
                    <div className="flex items-center justify-center gap-1 p-1">
                        <span>{title}</span>
                        <span>{`(${cards.length})`}</span>
                    </div>
                </header>
            )}
            {cards.length ? (
                <div key={id} className='w-full p-2 bg-gray-200 h-screen rounded-b-md' style={{ borderWidth: '1px' }}>
                    {cards.map((task, index) => (
                        <>
                            <TaskDropArea onDrop={() => onDrop(id, 0)} />
                            <React.Fragment key={task.uuid}>
                                <TaskCard {...task} />
                                <TaskDropArea onDrop={() => onDrop(id, index + 1)} />
                            </React.Fragment>
                        </>
                    ))
                    }
                </div>
            ) : (
                <div key={0} className="w-full p-2 bg-gray-200 h-screen rounded-b-md flex items-center">
                    <TaskEmptyDropArea onDrop={() => onDrop(id, 0)}/>
                </div>
            )}
        </section>
    )
})

TaskBoard.displayName = 'TaskBoard';
export default TaskBoard;   