'use client'
import WatchlistButton from "@/app/components/button/watchlist";
import { faPen, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function TitlePage({ params }) {
    const [mouseEnter, setMouseEnter] = useState(false);

    return (
        <div className="w-full flex items-center gap-2 justify-between" onMouseEnter={() => setMouseEnter(true)}
            onMouseLeave={() => setMouseEnter(false)}>  
            <div className="flex items-center gap-2">
                <h3 className="text-[24px] font-semibold">IC Teams</h3>
                {mouseEnter && (
                    <div className="flex gap-1">
                        <WatchlistButton />
                        <div className="p-[5px] text-gray-400 hover:bg-gray-200 rounded-md flex items-center cursor-pointer duration-200">
                            <FontAwesomeIcon icon={faFlag} className="w-4 h-4" />
                        </div>
                        <div className="p-[5px] text-gray-400 hover:bg-gray-200 rounded-md flex items-center cursor-pointer duration-200">
                            <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
                        </div>
                        <div className="p-[5px] text-gray-400 hover:bg-gray-200 rounded-md flex items-center cursor-pointer duration-200">
                            <FontAwesomeIcon icon={faTrashAlt} className="w-4 h-4" />
                        </div>
                    </div>
                )}
            </div>
            <button className="p-2 bg-blue-500 rounded-md text-white font-semibold flex items-center gap-1 hover:bg-blue-600 duration-200">
                    <FontAwesomeIcon icon={faPlus} className="h-4 w-4"/>
                Add Task
            </button>
        </div>
    )
}