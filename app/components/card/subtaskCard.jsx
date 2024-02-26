import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SubtaskCard({ title, is_done }) {
    return (
        <div className="w-full grid grid-cols-12 gap-1 p-2 border-b-[1px] border-gray-300">
            <div className="col-span-10 flex items-center gap-1">
                <input type="checkbox" defaultChecked={is_done}
                    className="checkbox appearance-none rounded-full border-gray-400 checked:border-blue-500 
                    [--chkbg:theme(colors.blue.500)] [--chkfg:white] h-4 w-4" />
                <div className={`${is_done && 'line-through'}`}>
                    {title}
                </div>
            </div>
            <div className="col-span-2 flex justify-end">
                <div className="flex items-center text-gray-400  justify-center p-1 rounded-md
                    cursor-pointer hover:bg-gray-300 hover:text-blue-500 duration-300">
                    <FontAwesomeIcon icon={faTrashAlt} className="h-4 w-4"/>
                </div>
            </div>
        </div>
    )
}