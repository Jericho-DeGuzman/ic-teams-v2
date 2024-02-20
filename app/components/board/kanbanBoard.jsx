'use client'

import { useEffect, useState } from "react"
import TaskBoard from "./taskBoard";
import { useKanbanStore } from "@/app/zustand/kanban-store";
import Image from "next/image";
import { EmptyFolder } from "@/utils/imageUtils";
import { moveCardTask } from "@/utils/moveCardTaks";

// list on kanban board.
const boards = [
    { id: 'todo', title: 'To Do' },
    { id: 'inprogress', title: 'In Progress' },
    { id: 'review', title: 'For Review' },
    { id: 'done', title: 'Done' },
]

export default function KanbanBoard({ tasks }) {
    const draggingCard = useKanbanStore((state) => state.draggingCard) // active dragging card.
    const [cards, setCards] = useState(tasks);

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
    
    return (
        <main className='min-h-screen w-full flex gap-2' >
            {boards.map((board) => (
                <TaskBoard key={board.id} id={board.id} title={board.title} onDrop={onDrop}
                    cards={cards[board.id]} />))}
        </main>
    )
}