'use client'
import TargetStatusLabel from "@/app/components/label/targetStatus";
import Modal from "@/app/components/modal/modal";
import { DefaultPhoto, ICLogo } from "@/utils/imageUtils";
import { faCalendar, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AttachmentTab from "@/app/components/tab/attachmentTab";
import SubtaskTab from "@/app/components/tab/subtaskTab";
import TaskCommentSection from "@/app/components/section/taskCommentSection";
import Cookies from "js-cookie";
import decodeHTMLText from "@/utils/decodeHTMLText";
import formatNumberDate from "@/utils/formatNumberDate";
import ViewTaskLoading from "@/app/components/loading/viedTaskLoading";
import { validateTaskForm } from "@/utils/validateFormInput";
import toast from "react-hot-toast";

//TODO: Create a client side component for modal.
//TODO: Re-create the ui for status, assigne to and due date.

export default function TaskModalLayout({ params }) {
    const router = useRouter();
    const [visibleTab, setVisibleTab] = useState('subtask')
    const uuid = params.taskId;
    const [loading, setLoading] = useState(true);
    const [task, setTask] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchTask = async () => {
            const at = Cookies.get('at');
            try {
                const response = await fetch(`/api/tasks?uuid=${uuid}`, {
                    method: 'get',
                    headers: { 'at': at }
                })

                const result = await response.json();
                if (result?.status !== 200) throw new Error(result?.message);

                setTask(result?.data);
            } catch (error) {
                throw new Error(error)
            } finally {
                setLoading(false);
            }
        }

        fetchTask();
    }, [params])

    const handleInputChange = async (ev) => {
        const { name, value } = ev.target;

        setTask((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setSaving(true);
        try {
            await validateTaskForm(task)

            const response = await fetch(`/api/tasks?uuid=${uuid}`, {
                method: 'put',
                header: {'Content-Type': 'application/json'},
                body: JSON.stringify(task)
            })
            
            const result = await response.json();

            if (result?.status !== 200) throw new Error(result?.message);

            toast.success('Successfully saved')
        } catch (error) {
            toast.error(error?.message)
        } finally {
            setSaving(false)
        }
    }

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

                    {loading ? (
                        <ViewTaskLoading />
                    ) : (
                        <section className="w-full grid grid-cols-6 text-black text-[12px] border-b-[1px]">
                            <main className="col-span-4 p-4 space-y-1">
                                <div className="space-y-2">
                                    <input name="title" type="text" value={decodeHTMLText(task.title)} onChange={handleInputChange}
                                        className="w-full outline-none bg-transparent text-[24px] font-bold" />
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="cols-span-1">
                                            <div className="flex flex-col">
                                                <label className="p-1">Status</label>
                                                <div className="w-full p-1 rounded-md">
                                                    <div className="bg-yellow-400 w-6/12 p-[3px] flex items-center justify-center text-white rounded-sm gap-1">
                                                        <FontAwesomeIcon icon={faCalendar} className="w-3 h-3" />
                                                        <span className="flex items-center justify-center">
                                                            {task.status.name}
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
                                                    <input name="due_date" type="date" className="py-1 bg-transparent outline-none cursor-pointer"
                                                        value={formatNumberDate(task.due_date)} onChange={handleInputChange} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <textarea value={decodeHTMLText(task.description)} name="description" onChange={handleInputChange}
                                        className="bg-transparent outline-none w-full resize-none rounded-md border-[1px] border-gray-300 p-2" />
                                </div>
                                <div className="w-full space-y-4">
                                    <div className="w-full flex gap-2 text-gray-400 border-gray-300 font-semibold text-[14px]">
                                        <button className={`p-2 ${visibleTab == 'subtask' && 'text-blue-500 border-blue-500 border-b-[1px] transition-[border] duration-200'} cursor-pointer`}
                                            onClick={() => setVisibleTab('subtask')}>Subtask</button>
                                        <button className={`p-2 ${visibleTab == 'attachment' && 'text-blue-500 border-blue-500 border-b-[1px] transition-[border] duration-200'} cursor-pointer`}
                                            onClick={() => setVisibleTab('attachment')}>Attachment</button>
                                    </div>
                                    {visibleTab == 'subtask' && <SubtaskTab key={'subtask'} uuid={uuid} />}
                                    {visibleTab == 'attachment' && <AttachmentTab key={'attachment'} />}
                                </div>
                            </main>

                            <aside className="col-span-2 p-2 border-l-[1px] border-gray-300 flex flex-col">
                                <TaskCommentSection />
                            </aside>
                        </section>
                    )}
                    {!loading && (
                        <form onSubmit={handleSubmit} className="w-full flex justify-end py-2 px-4">
                            <button className={`p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-100 ${saving && 'px-6 py-2 flex items-center justify-center'}`}
                                type='submit' disabled={saving}>
                                {saving ? <span class="loading loading-spinner loading-xs"></span> : <>SAVE</>}
                            </button>
                        </form>
                    )}
                </motion.div>
            </motion.div>
        </Modal>
    )
}