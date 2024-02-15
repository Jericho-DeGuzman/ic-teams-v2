'use client'
import { setGrabbingCard } from '@/app/redux/features/grabbingCard';
import { useAppDispatch } from '@/app/redux/hooks'
import { useState } from 'react'

export default function TaskCard({ uuid, title, due, }) {
    const dispatch = useAppDispatch();
    const [visible, setVisible] = useState(false);

    return (
        <section className={`w-full border-[1px] p-2 active:animate-pulse
            active:cursor-grabbing active:duration-70 rounded-md border-gray-400 text-[12px] bg-white cursor-grab`}
            style={{ userSelect: 'none' }} draggable="true"
            onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}
            onDragStart={() => dispatch(setGrabbingCard(uuid))} onDragEnd={() => dispatch(setGrabbingCard(null))}>
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