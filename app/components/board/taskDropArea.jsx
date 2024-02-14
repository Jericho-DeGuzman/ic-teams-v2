'use client'
import { useState } from "react"

export default function TaskDropArea() {
    const [visible, setVisible] = useState(false)

    const showArea = () => {
        setVisible(true);
    }

    const hideArea = () => {
        setVisible(false);
    }

    return (
        <div className={`${visible ? 'opacity-100 py-12' : 'opacity-0'}
            h-2 bg-gray-300 rounded-md border-2 border-dashed duration-300 border-gray-400`}
            onDragEnter={showArea} onDragLeave={hideArea}>
        </div>
    )
}