'use client'
import { openOptionForm } from "@/app/redux/features/targetForms";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddTargetButton() {
    const dispatch = useAppDispatch();
    const sample = useAppSelector(state => state.targetFormSlice.option);

    const openOption = () => {
        dispatch(openOptionForm(true));
    }

    return (
        <button className="bg-blue-500 p-2 flex items-center fixed z-[1] rounded-full bottom-12 right-12
        hover:bg-blue-700 duration-300" onClick={openOption}>
            <FontAwesomeIcon icon={faPlus} className="w-6 h-6 text-white" />
        </button>
    )
}