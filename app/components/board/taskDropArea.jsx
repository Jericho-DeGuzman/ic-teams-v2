'use client'
import { useState } from "react"

//TODO: make a function that can drag card to another kanban board.

export default function TaskDropArea({ onDrop }) {
    const [visible, setVisible] = useState(false);

    const showArea = () => {
        setVisible(true);
    }

    const hideArea = () => {
        setVisible(false);
    }

    return (
        <div className={`${visible ? 'opacity-100 py-12 last:flex-1' : 'opacity-0'} flex items-center justify-center text-[12px] italic
            h-1 last:h-96 flex-1 bg-gray-300 rounded-md border-2 border-dashed duration-300 border-gray-400`}
            onDrop={(e) => {
                onDrop();
                hideArea();
            }}
            onDragOver={(e) => {
                e.preventDefault();
            }}
            onDragEnter={showArea} onDragLeave={hideArea}>
            Drop here
        </div>
    )
}