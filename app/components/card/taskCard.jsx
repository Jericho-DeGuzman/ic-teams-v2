'use client'
import { useKanbanStore } from '@/app/zustand/kanban-store';
import { DefaultPhoto } from '@/utils/imageUtils';
import { faComment, faDiagramProject, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useEffect, useState } from 'react';
import ConfirmationDialog from '../dialog/Confirmation';
import { useRouter } from 'next/navigation';

const TaskCard = memo(({ uuid, title, due, ondelete, status }) => {
    const setDraggingCard = useKanbanStore((state) => state.setDraggingCard);
    const [visible, setVisible] = useState(false);
    const [subtaskCount, setSubtaskCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [showDialog, setShowDialog] = useState(false)
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const loadSubtaskCount = async () => {
            const at = Cookies.get('at')

            const response = await fetch(`/api/sub-tasks?uuid=${uuid}`, {
                method: 'get',
                headers: { 'at': at }
            })

            const result = await response.json();

            setSubtaskCount(result?.data?.length)

        }

        loadSubtaskCount();
    }, [visible])


    const handleOpenTask = () => {
        router.push(`/targets/t/${uuid}`);
    }

    return (
        <>
            {showDialog && <ConfirmationDialog title={'Delete Task'} description={'Are you sure you want to delete this task?'} cancelName={'Cancel'} confirmName={'Delete'}
                oncancel={() => setShowDialog(false)} onconfirm={async () => {
                    setLoading(true)
                    await ondelete(uuid, status);
                    setLoading(false);
                    setShowDialog(false);
                }} loading={loading} />}
            <section className={`w-full p-2 active:animate-pulse
            active:cursor-grabbing active:duration-70 rounded-md text-[12px] bg-white cursor-grab text-black`}
                draggable="true"
                onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}
                onDragStart={() => setDraggingCard(uuid)} onDragEnd={() => setDraggingCard(uuid)}>
                <main className='text-[12px] space-y-[8px]' onClick={handleOpenTask}>
                    <p className='w-full py-1' style={{ lineHeight: 1.1 }}>
                        {title}
                    </p>
                    {visible && (
                        <div className='w-full grid grid-cols-2 gap-1 text-gray-400'>
                            <div className='flex items-center gap-1'>
                                <div className='p-[5px] gap-1 flex items-center justify-center tooltip tooltip-bottom cursor-pointer 
                            hover:bg-gray-200 rounded-md duration-100 hover:text-blue-500'
                                    data-tip="subtask">
                                    <FontAwesomeIcon icon={faDiagramProject} className='w-4 h-4' />
                                    <span>{subtaskCount}</span>
                                </div>

                                <div className='p-[5px] gap-1 flex items-center justify-center tooltip tooltip-bottom cursor-pointer 
                            hover:bg-gray-200 rounded-md duration-100 hover:text-blue-500'
                                    data-tip="comment">
                                    <FontAwesomeIcon icon={faComment} className='w-4 h-4' />
                                    <span>{commentCount}</span>
                                </div>
                                <button name="delete" className='p-[5px] gap-1 flex items-center justify-center tooltip tooltip-bottom cursor-pointer 
                            hover:bg-gray-200 rounded-md duration-100 hover:text-blue-500'
                                    data-tip="Delete" onClick={(ev) => { ev.stopPropagation(); setShowDialog(true) }}>
                                    <FontAwesomeIcon icon={faTrash} className='w-4 h-4' />
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </section>
        </>
    )
})

TaskCard.displayName = 'TaskCard';
export default TaskCard;