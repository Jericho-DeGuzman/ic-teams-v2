'use client'
import React from "react";
import TaskCard from "../card/taskCard";
import TaskDropArea from "./taskDropArea";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { setDoneCardPosition, setForReviewCardPosition, setForReviseCardPosition, setOngoingCardPosition, setPendingCardPosition } from "@/app/redux/features/cardPositions";

export default async function TaskBoard({ id, type, name, tasks }) {
    const dispatch = useAppDispatch();
    let cards = [];
    //TODO: try to make better solution and try to use utils for this.
    switch (type) {
        case 'pending': dispatch(setPendingCardPosition(tasks))
            cards = useAppSelector(state => state.cardPositionSlice.pending);
            break;
        case 'ongoing': dispatch(setOngoingCardPosition(tasks))
            cards = useAppSelector(state => state.cardPositionSlice.ongoing);
            break;
        case 'review': dispatch(setForReviewCardPosition(tasks))
            cards = useAppSelector(state => state.cardPositionSlice.review);
            break;
        case 'done': dispatch(setDoneCardPosition(tasks))
            cards = useAppSelector(state => state.cardPositionSlice.done);
            break;
        case 'revise': dispatch(setForReviseCardPosition(tasks))
            cards = useAppSelector(state => state.cardPositionSlice.revise)
            break;
    }

    return (
        <section className='w-[20%] min-h-screen'>
            <header className={`w-full text-[12px] p-2 rounded-t-md text-center font-semibold text-white
                ${type == 'pending' && 'bg-yellow-400'}
                ${type == 'doing' && 'bg-green-400'}
                ${type == 'review' && 'bg-purple-400'}
                ${type == 'done' && 'bg-green-500'}
                ${type == 'revise' && 'bg-green-400'} 
                flex items-center w-full justify-center gap-1`}>
                <span>{name}</span>
                <span>{`(${tasks.length})`}</span>
            </header>

            <main className='w-full p-2 bg-gray-100 min-h-screen rounded-b-md'>
                <TaskDropArea type={type} index={0} />
                {cards.map((task, index) => (
                    <React.Fragment key={task.uuid}>
                        <TaskCard uuid={task.uuid} title={task.title} />
                        <TaskDropArea type={type} index={index + 1} />
                    </React.Fragment>
                ))}
            </main>
        </section>
    )
}