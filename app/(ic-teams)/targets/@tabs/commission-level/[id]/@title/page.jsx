'use client'
import WatchlistButton from "@/app/components/button/watchlist";
import { faPen, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { baseUrl } from "@/app/constant/url";

export default function TitlePage({ params }) {
    const [mouseEnter, setMouseEnter] = useState(false);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const loadTitle = async () => {
            const response = await fetch(`${baseUrl}/api/targets?id=${params.id}`, {
                method: 'get'
            })

            const result = await response.json();
            const { status } = result;

            if (status == 200) {
                const { data } = result;
                const { title } = data;
                setTitle(title);
            }
        }

        loadTitle();
    })

    return (
        <div className="w-full flex items-center gap-2 justify-between text-black" onMouseEnter={() => setMouseEnter(true)}
            onMouseLeave={() => setMouseEnter(false)}>
            <div className="flex items-center gap-2">
                <h3 className="text-[24px] font-semibold">{title}</h3>
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