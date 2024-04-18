'use client'
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ConfirmationDialog from "../dialog/Confirmation";
import toast from "react-hot-toast";

export default function SubtaskCard({ title, is_done, uuid, task_uuid, ondelete, deleteVisible }) {
    const [isDone, setIsDone] = useState(is_done)
    const [mouseEnter, setMouseEnter] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const onChangeHandler = async (ev) => {
        const prevStatus = isDone;
        setIsDone(ev.target.checked ? 1 : 0);

        try {
            const response = await fetch(`/api/sub-tasks?uuid=${uuid}`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    task_uuid: task_uuid,
                    title: title,
                    is_done: ev.target.checked ? 1 : 0
                })
            })

            const result = await response.json();
            if (result.status !== 200) throw new Error(result?.message);

        } catch (error) {
            setIsDone(prevStatus);
        }

    }

    const handleOnDelete = async () => {
        try {
            setDeleting(true);
            await ondelete(uuid);
            toast.success('Subtask Deleted')
        } catch (error) {

        } finally {
            setDeleting(false);
            setShowDialog(false);
        }
    }

    const handleOnCancel = () => {
        setShowDialog(false);
    }

    return (
        <>
            {showDialog && (<ConfirmationDialog title={`Delete Subtask`} description={`are you sure you want to delete <b>${title}</b>?`}
                cancelName={'Cancel'} confirmName={'Delete'} loading={deleting} oncancel={handleOnCancel} onconfirm={handleOnDelete}
            />)}
            <div className="w-full grid grid-cols-12 gap-1 p-2 cursor-pointer hover:bg-gray-200 duration-200" onMouseEnter={() => setMouseEnter(true)} onMouseLeave={() => setMouseEnter(false)}>
                <div className="col-span-10 flex items-center gap-1">
                    <input type="checkbox" defaultChecked={isDone} onChange={onChangeHandler}
                        className="checkbox appearance-none rounded-full border-gray-400 checked:border-blue-500 
                    [--chkbg:theme(colors.blue.500)] [--chkfg:white] h-4 w-4" />
                    <p className={`${isDone == 1 && 'line-through text-gray-400'}`} dangerouslySetInnerHTML={{ __html: title }} />
                </div>
                {deleteVisible && (
                    <div className="col-span-2 flex justify-end">
                        {mouseEnter && (
                            <button className="flex items-center text-gray-400  justify-center p-1 rounded-md
                    cursor-pointer hover:text-blue-500 duration-300" onClick={() => setShowDialog(true)}>
                                <FontAwesomeIcon icon={faTrashAlt} className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}