'use client'
import TargetStatusLabel from "@/app/components/label/targetStatus";
import Modal from "@/app/components/modal/modal";
import { DefaultPhoto, ICLogo } from "@/utils/imageUtils";
import { faCalendar, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SubtaskTab from "../tab/SubtaskTab";
import AttachmentTab from "../tab/attachmentTab";
import TaskCommentSection from "../section/taskCommentSection";

//TODO: Create a client side component for modal.
//TODO: Re-create the ui for status, assigne to and due date.

export default function EditTaskModal() {
    const router = useRouter();
    const [visibleTab, setVisibleTab] = useState('subtask')

    return (
        <Modal>
            <motion.div className="modal modal-open">
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.75
                    }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        rotate: 0,
                        transition: {
                            ease: 'easeOut',
                            duration: 0.15
                        }
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.75,
                        transition: {
                            ease: "easeIn",
                            duration: 0.15,
                        },
                    }}
                    className="bg-white rounded-md w-full max-w-5xl">

                    <header className="w-full px-4 py-2 flex items-center justify-between border-b-[1px] border-gray-300 text-[12px]">
                        <div className="flex items-center justify-center text-black p-1 gap-2">
                            <Image src={ICLogo} height={24} width={24} alt="logo" />
                        </div>
                        <button onClick={() => router.back()}
                            className="flex p-1 items-center justify-center rounded-full hover:bg-gray-200 hover:text-blue-500 duration-200 tooltip" data-tip="Close">
                            <FontAwesomeIcon icon={faClose} className="w-5 h-5" />
                        </button>
                    </header>

                    <section className="w-full grid grid-cols-4 text-black text-[12px]">
                        <main className="col-span-3 p-4 space-y-2">
                            <div className="space-y-4">
                                <input type="text" value={'Documentation'}
                                    className="w-full outline-none bg-transparent text-[24px] font-bold" />
                                <div className="grid grid-cols-3 gap-2">

                                    <div className="cols-span-1">
                                        <div className="flex flex-col">
                                            <label className="p-1">Status</label>
                                            <div className="w-full p-1 rounded-md">
                                                <div className="bg-yellow-400 w-6/12 p-[3px] flex items-center justify-center text-white rounded-sm gap-1">
                                                    <FontAwesomeIcon icon={faCalendar} className="w-3 h-3" />
                                                    <span className="flex items-center justify-center">
                                                        To-Do
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="cols-span-1">
                                        <div className="flex flex-col">
                                            <label className="p-1">Assigned to</label>
                                            <div className='flex gap-1 p-1 rounded-md items-center hover:bg-gray-200 duration-300'>
                                                <div className='rounded-full h-7 w-7 flex items-center justify-center border-white border-[1px] cursor-pointer'>
                                                    <Image src={DefaultPhoto} width={36} height={36} alt='profile' />
                                                </div>
                                                <div className='rounded-full h-7 w-7 flex items-center justify-center border-white border-[1px] cursor-pointer
                                                tooltip tooltip-bottom' data-tip="Jericho De Guzman">
                                                    <Image src={DefaultPhoto} width={36} height={36} alt='profile' />
                                                </div>
                                                <div className='rounded-full h-7 w-7 flex items-center justify-center border-white border-[1px] cursor-pointer
                                                tooltip tooltip-bottom'>
                                                    <Image src={DefaultPhoto} width={36} height={36} alt='profile' />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="cols-span-1">
                                        <div className="flex flex-col">
                                            <label className="p-1">Due Date</label>
                                            <div className="w-full p-1 flex items-center">
                                                <input type="date" className="py-1 bg-transparent outline-none cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <textarea value={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                                    className="bg-transparent outline-none w-full resize-none rounded-md border-[1px] border-gray-300 p-2" />
                            </div>
                            <div className="w-full space-y-4">
                                <div className="w-full flex gap-2 text-gray-400 border-gray-300 font-semibold text-[14px]">
                                    <button className={`p-2 ${visibleTab == 'subtask' && 'text-blue-500 border-blue-500 border-b-[1px] transition-[border] duration-200'} cursor-pointer`}
                                        onClick={() => setVisibleTab('subtask')}>Subtask</button>
                                    <button className={`p-2 ${visibleTab == 'attachment' && 'text-blue-500 border-blue-500 border-b-[1px] transition-[border] duration-200'} cursor-pointer`}
                                        onClick={() => setVisibleTab('attachment')}>Attachment</button>
                                </div>
                                {visibleTab == 'subtask' && <SubtaskTab key={'subtask'} />}
                                {visibleTab == 'attachment' && <AttachmentTab key={'attachment'} />}
                            </div>
                        </main>

                        <aside className="col-span-1 p-2 border-l-[1px] border-gray-300 flex flex-col">
                            <TaskCommentSection />
                        </aside>
                    </section>
                </motion.div>
            </motion.div>
        </Modal>
    )
}