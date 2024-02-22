'use client'
import { useState } from "react"

//TODO: make a function that can drag card to another kanban board.

export default function TaskEmptyDropArea({ onDrop }) {
    const [visible, setVisible] = useState(false);

    const showArea = () => {
        setVisible(true);
    }

    const hideArea = () => {
        setVisible(false);
    }

    return (
        <div className={`flex w-full items-center justify-center text-[12px]
            h-full relative ${visible && 'bg-gray-300 rounded-md border-2 border-dashed border-gray-400'} duration-100 italic space-y-2`}
            onDrop={(e) => {
                onDrop();
                hideArea();
            }}
            onDragOver={(e) => {
                e.preventDefault();
            }}
            onDragEnter={showArea} onDragLeave={hideArea}>
            {visible ? (
                <>
                    Drop here.
                </>
            ) : (
                <>
                    No task available.
                </>)}
        </div>
    )
}