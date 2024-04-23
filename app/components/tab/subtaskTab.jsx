'use client'
import { faDiagramProject, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import SubtaskCard from "../card/subtaskCard";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import CustomError from "../errors/error";
import toast from "react-hot-toast";
import SubtaskLoading from "../loading/subtaskLoading";

export default function SubtaskTab({ uuid, permissions }) {
    const [subtasks, setSubtasks] = useState([]);
    const [newSubtask, setNewSubtask] = useState({
        task_uuid: uuid,
        title: ''
    });
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const loadSubtasks = async () => {
            const at = Cookies.get('at');
            try {
                const response = await fetch(`/api/sub-tasks?uuid=${uuid}`, {
                    method: 'get',
                    headers: { 'at': at }
                })

                const result = await response.json();

                if (result?.status !== 200) throw new Error(result?.status);
                setSubtasks(result?.data);
            } catch (error) {
                setError(error?.message)
            } finally {
                setLoading(false);
            }
        }

        loadSubtasks();
    }, [])

    // on save new task.
    const onSaveHandler = async () => {
        if (newSubtask.title == '') return;
        setSaving(true);
        try {
            const response = await fetch(`/api/sub-tasks`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSubtask)
            })

            const result = await response.json();

            if (result?.status !== 200) throw new Error(result?.message);

            setSubtasks([...subtasks, result?.data])
            setNewSubtask({
                task_uuid: uuid,
                title: ''
            });
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setSaving(false);
        }

    }

    // on change in input.
    const onChangeHandler = (ev) => {
        const { value } = ev.target;
        setNewSubtask((prev) => ({
            ...prev,
            title: value
        }));
    }

    const onDeleteHandler = async (uuid) => {
        try {
            const response = await fetch(`/api/sub-tasks?uuid=${uuid}`, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' }
            })

            const result = await response.json();
            if (result?.status !== 200) throw new Error(result?.status)
            setSubtasks(subtasks.filter((subtask => subtask.uuid !== uuid)));

        } catch (error) {
            setError(error)
        }
    }

    if (error) return <CustomError status={error} />

    return (
        <section className="w-full border-[1px] border-gray-300 rounded-md">
            <div className="flex items-center p-2 text-gray-400 gap-1 border-b-[1px] border-gray-300">
                <FontAwesomeIcon icon={faDiagramProject} className="h-4 w-4 " />
                Subtasks {subtasks.length}
            </div>
            <div className="w-full overflow-y-scroll" style={{ maxHeight: '154px', minHeight: '154px' }}>
                {loading ? <SubtaskLoading /> :
                    subtasks.length ? (
                        subtasks.map((subtask, index) => (
                            <SubtaskCard key={index} uuid={subtask.uuid} task_uuid={subtask.task.uuid} title={subtask.title} is_done={subtask.is_done} ondelete={onDeleteHandler}
                                deleteVisible={permissions.role_permissions.includes('subtasks.delete')} />
                        ))
                    ) : (
                        <div className="w-full flex items-center justify-center italic text-gray-400" style={{ minHeight: '154px' }}>
                            No subtask available.
                        </div>
                    )}
            </div>
            {permissions.role_permissions.includes('subtasks.create') && (
                <div className="grid grid-cols-12 gap-1 p-2 border-t-[1px] border-gray-300">
                    <div className="col-span-11 flex items-center gap-1">
                        <div className="w-4 h-4 flex items-center justify-center">
                            <FontAwesomeIcon icon={faPlus} className="w-3 h-3 text-gray-400" />
                        </div>
                        <input placeholder="Add subtask" className="bg-transparent outline-none w-full"
                            value={newSubtask.title} onChange={onChangeHandler} />
                    </div>
                    <div className="col-span-1 flex items-cente justify-end">
                        <button className={`bg-blue-500 text-white py-1 px-2 rounded-sm ${newSubtask.title == '' && 'invisible'} duration-300`}
                            onClick={onSaveHandler} disabled={saving}>
                            {saving ? <>Saving..</> : <>Save</>}
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}