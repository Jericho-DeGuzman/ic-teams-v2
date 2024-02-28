'use client'
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function SubtaskCard({ title, is_done }) {
    const [isDone, setIsDone] = useState(is_done)
    const [mouseEnter, setMouseEnter] = useState(false);

    const onChangeHandler = (ev) => {
        setIsDone(!isDone)
    }

    return (
        <div className="w-full grid grid-cols-12 gap-1 p-2 cursor-pointer hover:bg-gray-200 duration-200" onMouseEnter={() => setMouseEnter(true)} onMouseLeave={() => setMouseEnter(false)}>
            <div className="col-span-10 flex items-center gap-1">
                <input type="checkbox" defaultChecked={isDone} onChange={onChangeHandler}
                    className="checkbox appearance-none rounded-full border-gray-400 checked:border-blue-500 
                    [--chkbg:theme(colors.blue.500)] [--chkfg:white] h-4 w-4" />
                <div className={`${isDone && 'line-through text-gray-400'}`}>
                    {title}
                </div>
            </div>
            <div className="col-span-2 flex justify-end">
                {mouseEnter && (
                    <div className="flex items-center text-gray-400  justify-center p-1 rounded-md
                    cursor-pointer hover:text-blue-500 duration-300">
                        <FontAwesomeIcon icon={faTrashAlt} className="h-4 w-4" />
                    </div>
                )}
            </div>
        </div>
    )
}