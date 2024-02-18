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
        <div className={`${visible ? 'opacity-100 py-12' : 'opacity-0'}
            h-2 bg-gray-300 rounded-md border-2 border-dashed duration-300 border-gray-400`}
            onDrop={(e) => {
                onDrop();
                hideArea();
            }}
            onDragOver={(e) => {
                e.preventDefault();
            }}
            onDragEnter={showArea} onDragLeave={hideArea}>
        </div>
    )
}