'use client'

import { faFlag, faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import WatchlistButton from "../button/watchlist";

export default function TargetTitleHeader({title, uuid}) {
    const [mouseEnter, setMouseEnter] = useState(false);

    return (
        <div className="w-full flex items-center gap-2 justify-between text-black" onMouseEnter={() => setMouseEnter(true)}
            onMouseLeave={() => setMouseEnter(false)}>
            <div className="flex items-center gap-2">
                <h3 className="text-[24px] font-semibold" dangerouslySetInnerHTML={{__html: title}}/>
                {mouseEnter && (
                    <div className="flex gap-1">
                        <WatchlistButton />
                        <div className="p-[5px] text-gray-400 hover:bg-gray-200 rounded-md flex items-center cursor-pointer duration-200 tooltip"
                            data-tip="make a banner">
                            <FontAwesomeIcon icon={faFlag} className="w-4 h-4" />
                        </div>
                        <div className="p-[5px] text-gray-400 hover:bg-gray-200 rounded-md flex items-center cursor-pointer duration-200 tooltip
                            hover:text-blue-500"
                            data-tip="edit">
                            <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
                        </div>
                        <div className="p-[5px] text-gray-400 hover:bg-gray-200 rounded-md flex items-center cursor-pointer duration-200 tooltip
                            hover:text-blue-500"
                            data-tip="delete">
                            <FontAwesomeIcon icon={faTrashAlt} className="w-4 h-4" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}