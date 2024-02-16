'use client'
import { useKanbanStore } from '@/app/zustand/kanban-store';
import { useState } from 'react';

export default function TaskCard({ uuid, title, due }) {
    const setDraggingCard = useKanbanStore((state) => state.setDraggingCard);
    const [visible, setVisible] = useState(false);

    return (
        <section className={`w-full p-2 active:animate-pulse
            active:cursor-grabbing active:duration-70 rounded-md text-[12px] bg-white cursor-grab`}
            draggable = "true"
            onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}
            onDragStart={() => setDraggingCard(uuid)} onDragEnd={() => setDraggingCard(uuid)}>
            <main className='text-[12px]'>
                <p className='w-full' style={{ lineHeight: 1.1 }}>
                    {title} 
                </p>
                {visible && (
                    <p className={`w-full font-semibold text-gray-400 mt-1`}>
                        Due on 01/03/23
                    </p>
                )}
            </main>
        </section>
    )
}