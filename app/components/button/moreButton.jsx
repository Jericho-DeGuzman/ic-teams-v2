'use client'
import { setDeletingTarget } from "@/app/redux/features/deleteTarget";
import { setEditingCard } from "@/app/redux/features/editingTarget";
import { openEditForm } from "@/app/redux/features/targetForms";
import { useAppDispatch } from "@/app/redux/hooks";
import { faArrowsRotate, faEllipsis, faPen, faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MoreButton({ uuid, ondelete, visible }) {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        try {
            dispatch(setDeletingTarget(uuid));
        } catch (error) {
            throw new Error(error?.message);
        } finally {
            ondelete();
        }
    }

    const editTarget = () => {
        dispatch(setEditingCard(uuid))
        dispatch(openEditForm(true));
    }

    return (
        <>
            {visible && (
                <div className="dropdown dropdown-end">
                    <button className='p-1 flex items-center text-gray-400
                    hover:bg-gray-200 hover:text-blue-400 cursor-pointer rounded-md duration-300' tabIndex="0" role="button">
                        <FontAwesomeIcon icon={faEllipsis} className='w-4 h-4' />
                    </button>
                    <ul tabIndex="0" className="dropdown-content bg-white z-[1] menu p-2 rounded-md w-52 text-[12px] border-[1px] border-gray-200 text-gray-400">
                        <li>
                            <button className="px-2 py-1 hover:bg-gray-200 hover:text-blue-500 flex items-center" onClick={handleDelete}>
                                <FontAwesomeIcon icon={faTrash} className="w-3 h-3" />Delete
                            </button>
                        </li>
                        <li>
                            <button className="px-2 py-1 hover:bg-gray-200 hover:text-blue-500 flex items-center" >
                                <FontAwesomeIcon icon={faArrowsRotate} className="w-3 h-3" />Update Status
                            </button>
                        </li>
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