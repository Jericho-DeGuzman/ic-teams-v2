'use client'
import TargetStatusLabel from "@/app/components/label/targetStatus";
import Modal from "@/app/components/modal/modal";
import { DefaultPhoto, ICLogo } from "@/utils/imageUtils";
import { faCalendar, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import AttachmentTab from "@/app/components/tab/attachmentTab";
import SubtaskTab from "@/app/components/tab/subtaskTab";
import TaskCommentSection from "@/app/components/section/taskCommentSection";
import Cookies from "js-cookie";
import decodeHTMLText from "@/utils/decodeHTMLText";
import formatNumberDate from "@/utils/formatNumberDate";
import ViewTaskLoading from "@/app/components/loading/viedTaskLoading";
import { validateTaskForm } from "@/utils/validateFormInput";
import toast from "react-hot-toast";
import TaskStatusLabel from "@/app/components/label/taskStatus";
import AssigneesAvatar from "@/app/components/avatar/assigneesAvatar";

export default function TaskModalLayout({ params }) {
    const router = useRouter();
    const [visibleTab, setVisibleTab] = useState('subtask')
    const uuid = params.taskId;
    const [loading, setLoading] = useState(true);
    const [task, setTask] = useState([]);
    const [currentTask, setCurrentTask] = useState([]);
    const [hasChanges, setHasChanges] = useState(false);
    const [saving, setSaving] = useState(false);
    const [permissions, setPermission] = useState([]);

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
                setCurrentTask(result?.data);

                const permission = await fetch('/api/permissions', {
                    method: 'get',
                    headers: { 'at': at }
                })

                const result_permission = await permission.json();
                if (result_permission?.status !== 200) throw new Error(result_permission?.message);

                setPermission(result_permission?.data);
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

        setHasChanges(value !== currentTask[name])
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setSaving(true);
        try {
            await validateTaskForm(task)

            const response = await fetch(`/api/tasks?uuid=${uuid}`, {
                method: 'put',
                header: { 'Content-Type': 'application/json' },
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
                                    {permissions.role_permissions.includes('tasks.update') ? (
                                        <input name="title" type="text" value={decodeHTMLText(task.title)} onChange={handleInputChange}
                                            disabled={!permissions.role_permissions.includes('tasks.update')}
                                            className="w-full outline-none bg-transparent text-[24px] font-bold" />
                                    ) : (
                                        <div name="title" type="text" dangerouslySetInnerHTML={{ __html: task.title }}
                                            className="w-full outline-none bg-transparent text-[24px] font-bold" />
                                    )}
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="cols-span-1">
                                            <TaskStatusLabel status={task.status} />
                                        </div>

                                        <div className="cols-span-1">
                                            <div className="flex flex-col">
                                                <label className="p-1">Assigned to</label>
                                                <AssigneesAvatar uuid={uuid} target_uuid={task.target.uuid} permissions={permissions} />
                                            </div>
                                        </div>

                                        <div className="cols-span-1">
                                            <div className="flex flex-col">
                                                <label className="p-1">Due Date</label>
                                                <div className="w-full p-1 flex items-center hover:bg-gray-200 duration-200 rounded-md">
                                                    {permissions.role_permissions.includes('tasks.update') ? (
                                                        <input name="due_date" type="date" className="py-1 bg-transparent outline-none cursor-pointer"
                                                            disabled={!permissions.role_permissions.includes('tasks.update')}
                                                            value={formatNumberDate(task.due_date)} onChange={handleInputChange} />
                                                    ) : (
                                                        <div name="due_date" type="date" className="py-1 bg-transparent outline-none cursor-pointer"
                                                            dangerouslySetInnerHTML={{ __html: task.due_date }} />
                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {permissions.role_permissions.includes('tasks.update') ? (
                                        <textarea value={decodeHTMLText(task.description)} name="description" onChange={handleInputChange}
                                            disabled={!permissions.role_permissions.includes('tasks.update')}
                                            className="bg-transparent outline-none w-full resize-none rounded-md border-[1px] border-gray-300 p-2" />
                                    ) : (
                                        <div dangerouslySetInnerHTML={{__html: task.description}} name="description"
                                            className="bg-transparent outline-none w-full resize-none rounded-md border-[1px] border-gray-300 p-2" />
                                    )}
                                </div>
                                <div className="w-full space-y-4">
                                    <div className="w-full flex gap-2 text-gray-400 border-gray-300 font-semibold text-[14px]">
                                        <button className={`p-2 ${visibleTab == 'subtask' && 'text-blue-500 border-blue-500 border-b-[1px] transition-[border] duration-200'} cursor-pointer`}
                                            onClick={() => setVisibleTab('subtask')}>Subtask</button>
                                        <button className={`p-2 ${visibleTab == 'attachment' && 'text-blue-500 border-blue-500 border-b-[1px] transition-[border] duration-200'} cursor-pointer`}
                                            onClick={() => setVisibleTab('attachment')}>Attachment</button>
                                    </div>
                                    {visibleTab == 'subtask' && <SubtaskTab key={'subtask'} uuid={uuid} permissions={permissions} />}
                                    {visibleTab == 'attachment' && <AttachmentTab key={'attachment'} fileRequirement={task?.file_requirements} taskId={uuid} />}
                                </div>
                            </main>

                            <aside className="col-span-2 p-2 border-l-[1px] border-gray-300 flex flex-col">
                                <TaskCommentSection uuid={params.taskId} />
                            </aside>
                        </section>
                    )}
                    {hasChanges && (
                        permissions.role_permissions.includes('tasks.update') && (
                            <form onSubmit={handleSubmit} className="w-full flex justify-end py-2 px-4">
                                <button className={`p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-100 ${saving && 'px-6 py-2 flex items-center justify-center'}`}
                                    type='submit' disabled={saving}>
                                    {saving ? <span class="loading loading-spinner loading-xs"></span> : <>SAVE</>}
                                </button>
                            </form>
                        )
                    )}
                </motion.div>
            </motion.div>
        </Modal>
    )
}