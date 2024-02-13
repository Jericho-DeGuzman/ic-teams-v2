'use client'
import { setGrabbingCard } from '@/app/redux/features/grabbingCard';
import { useAppDispatch } from '@/app/redux/hooks'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

export default function TaskCard({ uuid, title, due, }) {
    const dispatch = useAppDispatch();
    return (
        <section className={`w-full border-[1px] p-2
            active:animate-pulse active:duration-70 rounded-md border-gray-400 text-[12px] bg-white cursor-grab`}
            style={{ userSelect: 'none' }}
            draggable="true"
            onDragStart={() => dispatch(setGrabbingCard(uuid))} onDragEnd={() => dispatch(setGrabbingCard(null))}>
            <div className=''>
                {title}
            </div>
        </section>
    )
}