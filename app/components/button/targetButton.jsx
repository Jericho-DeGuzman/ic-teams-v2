import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddTargetButton() {
    return (
        <button className="bg-blue-500 p-2 flex items-center fixed z-[1] rounded-full bottom-8 right-8
        hover:bg-blue-700 duration-300">
            <FontAwesomeIcon icon={faPlus} className="w-6 h-6 text-white" />
        </button>
    )
}