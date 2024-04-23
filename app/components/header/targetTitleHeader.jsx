'use client'

import { faFlag, faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import WatchlistButton from "../button/watchlist";
import BannerButton from "../button/bannerButton";

export default function TargetTitleHeader({ title, uuid, permissions }) {
    const [mouseEnter, setMouseEnter] = useState(false);

    return (
        <div className="w-full flex items-center gap-2 justify-between text-black" onMouseEnter={() => setMouseEnter(true)}
            onMouseLeave={() => setMouseEnter(false)}>
            <div className="flex items-center gap-2">
                <h3 className="text-[24px] font-semibold" dangerouslySetInnerHTML={{ __html: title }} />
                {mouseEnter && (
                    <div className="flex gap-1">
                        <WatchlistButton visible={permissions.role_permissions.includes('watchlist.create')} />
                        <BannerButton visible={permissions.role_permissions.includes('target.banner.create')}/>
                        {permissions.role_permissions.includes('targets.update') && (
                            <div className="p-[5px] text-gray-400 hover:bg-gray-200 rounded-md flex items-center cursor-pointer duration-200 tooltip
                            hover:text-blue-500"
                                data-tip="edit">
                                <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
                            </div>
                        )}
                        {permissions.role_permissions.includes('targets.delete') && (
                            <div className="p-[5px] text-gray-400 hover:bg-gray-200 rounded-md flex items-center cursor-pointer duration-200 tooltip
                            hover:text-blue-500"
                                data-tip="delete">
                                <FontAwesomeIcon icon={faTrashAlt} className="w-4 h-4" />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}