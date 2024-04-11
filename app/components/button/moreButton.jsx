'use client'
import { setEditingCard } from "@/app/redux/features/editingTarget";
import { openEditForm } from "@/app/redux/features/targetForms";
import { faArrowsRotate, faEllipsis, faPen, faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateTargetStatusButton from "./updateTargetStatus";
import ConfirmationDialog from "../dialog/Confirmation";
import { useState } from "react";
import { useAppDispatch } from "@/app/redux/hooks";

export default function MoreButton({ uuid, ondelete, visible, status }) {
    const [onConfirm, setConfirm] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useAppDispatch()

    const handleDelete = async () => {
        setLoading(true);
        try {
            await ondelete(uuid);
        } catch (error) {
            throw new Error(error?.message);
        } finally {
            setConfirm(false);
            setLoading(false);
        }
    }

    const editTarget = () => {
        dispatch(setEditingCard(uuid))
        dispatch(openEditForm(true));
    }

    const handleCancel = () => {
        setConfirm(false);
    }

    return (
        <>
            {onConfirm && <ConfirmationDialog title={'Delete Target'} description={'Are you sure you want to delete this target?'} cancelName={'Cancel'} confirmName={'Delete'}
                oncancel={handleCancel} onconfirm={handleDelete} loading={isLoading} />}
            {visible && (
                <div className="dropdown dropdown-end">
                    <button className='p-1 flex items-center text-gray-400
                            hover:bg-gray-200 hover:text-blue-400 cursor-pointer rounded-md duration-300' tabIndex="0" role="button">
                        <FontAwesomeIcon icon={faEllipsis} className='w-4 h-4' />
                    </button>
                    <ul tabIndex="0" className="dropdown-content bg-white z-[1] menu p-2 rounded-md w-44 text-[12px] border-[1px] border-gray-200 text-gray-400">
                        <li>
                            <button className="px-2 py-1 hover:bg-gray-200 hover:text-blue-500 flex items-center" onClick={() => setConfirm(true)}>
                                <FontAwesomeIcon icon={faTrash} className="w-3 h-3" />Delete
                            </button>
                        </li>
                        <UpdateTargetStatusButton uuid={uuid} status={status}/>
                        <li>
                            <button className="px-2 py-1 hover:bg-gray-200 hover:text-blue-500 flex items-center" onClick={editTarget}>
                                <FontAwesomeIcon icon={faPen} className="w-3 h-3" />Edit Target
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </>
    )
}