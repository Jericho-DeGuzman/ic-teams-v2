'use client'
import { useKanbanStore } from '@/app/zustand/kanban-store';
import { DefaultPhoto } from '@/utils/imageUtils';
import { faComment, faDiagramProject } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useState } from 'react';

const TaskCard = memo(({ uuid, title, due }) => {
    const setDraggingCard = useKanbanStore((state) => state.setDraggingCard);
    const [visible, setVisible] = useState(false);

    return (
        <Link href={`/targets/t/${uuid}`}>
            <section className={`w-full p-2 active:animate-pulse
            active:cursor-grabbing active:duration-70 rounded-md text-[12px] bg-white cursor-grab text-black`}
                draggable="true"
                onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}
                onDragStart={() => setDraggingCard(uuid)} onDragEnd={() => setDraggingCard(uuid)}>
                <main className='text-[12px] space-y-[8px]'>
                    <p className='w-full' style={{ lineHeight: 1.1 }}>
                        {title}
                    </p>
                    {visible && (
                        <div className='w-full grid grid-cols-2 gap-1 text-gray-400'>
                            <div className='flex items-center gap-1'>
                                <div className='p-[5px] gap-1 flex items-center justify-center tooltip tooltip-bottom cursor-pointer 
                            hover:bg-gray-200 rounded-md duration-100 hover:text-blue-500'
                                    data-tip="subtask">
                                    <FontAwesomeIcon icon={faDiagramProject} className='w-4 h-4' />
                                    <span>20</span>
                                </div>
                                <div className='p-[5px] gap-1 flex items-center justify-center tooltip tooltip-bottom cursor-pointer 
                            hover:bg-gray-200 rounded-md duration-100 hover:text-blue-500'
                                    data-tip="comment">
                                    <FontAwesomeIcon icon={faComment} className='w-4 h-4' />
                                    <span>20</span>
                                </div>
                            </div>
                            <div className='flex items-center justify-end avatar-group -space-x-[8px] rtl:space-x-reverse'>
                                <div className='rounded-full h-6 w-6 flex items-center justify-center border-white border-[1px]'>
                                    <Image src={DefaultPhoto} width={24} height={24} alt='profile' />
                                </div>
                                <div className='rounded-full h-6 w-6 flex items-center justify-center border-white border-[1px]'>
                                    <Image src={DefaultPhoto} width={24} height={24} alt='profile' />
                                </div>
                                <div className='rounded-full h-6 w-6 flex items-center justify-center border-white border-[1px]'>
                                    <Image src={DefaultPhoto} width={24} height={24} alt='profile' />
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </section>
        </Link>
    )
})

TaskCard.displayName = 'TaskCard';
export default TaskCard;