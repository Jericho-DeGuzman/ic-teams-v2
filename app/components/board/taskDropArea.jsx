'use client'
import { moveCard } from "@/app/redux/features/cardPositions";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks"
import { useState } from "react"

//TODO: make a function that can drag card to another kanban board.

export default function TaskDropArea({type, index}) {
    const [visible, setVisible] = useState(false)
    const draggingCard = useAppSelector((state) => state.grabbingCardSlice.value); // current dragging task that holds the task uuid.
    const dispatch = useAppDispatch();
    const cards = useAppSelector(state => state.cardPositionSlice.tasks);

    const showArea = () => {
        setVisible(true);
    }

    const hideArea = () => {
        setVisible(false);
    }

    const onDropCard = (e) => {
        dispatch(moveCard({taskId: draggingCard, status: type}));
        hideArea();
    }

    const onDragOver = (e) => {
        e.preventDefault();
    }

    return (
        <div className={`${visible ? 'opacity-100 py-12' : 'opacity-0'}
            h-2 bg-gray-300 rounded-md border-2 border-dashed duration-300 border-gray-400`}
            onDrop={onDropCard} onDragOver={onDragOver}
            onDragEnter={showArea} onDragLeave={hideArea}>
        </div>
    )
}