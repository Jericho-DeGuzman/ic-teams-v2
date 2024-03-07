
import { faArrowsRotate, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TargetSummmaryCard({ icon, title, type }) {
    return (
        <div className="col-span-1 bg-white rounded-md shadow-md hover:scale-[1.02] duration-200 hover:border-[1px] border-blue-500 cursor-pointer">
            <div className="flex items-center justify-between px-4 py-2">
                <div className="">
                    <h1 className={`font-bold text-[28px]
                    ${type == 'ongoing' && 'text-green-400'} 
                    ${type == 'pending' && 'text-yellow-400'}
                    ${type == 'onhold' && 'text-zinc-400'}
                    ${type == 'completed' && 'text-green-500'}`}>150</h1>
                    <span className="text-[12px] text-gray-400">{title}</span>
                </div>
                <FontAwesomeIcon icon={icon} className={`h-[32px] w-[32px]
                    ${type == 'ongoing' && 'text-green-400'} 
                    ${type == 'pending' && 'text-yellow-400'}
                    ${type == 'onhold' && 'text-zinc-400'}
                    ${type == 'completed' && 'text-green-500'}`} />
            </div>
            <hr />
            <div className="w-full flex items-center gap-1 px-4 py-1 text-gray-400">
                <FontAwesomeIcon icon={faArrowsRotate} className="h-[12px] w-[12px]" />
                <p className="text-[12px]">Update now</p>
            </div>
        </div>
    )
}