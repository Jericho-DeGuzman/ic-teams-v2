'use client'
import { useKanbanStore } from '@/app/zustand/kanban-store';
import { memo, useState } from 'react';

const TaskCard = memo(({ uuid, title, due }) => {
    const setDraggingCard = useKanbanStore((state) => state.setDraggingCard);
    const [visible, setVisible] = useState(false);

    return (
        <section className={`w-full p-2 active:animate-pulse
            active:cursor-grabbing active:duration-70 rounded-md text-[12px] bg-white cursor-grab text-black`}
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
})

TaskCard.displayName = 'TaskCard';
export default TaskCard;