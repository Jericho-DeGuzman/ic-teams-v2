import { DefaultPhoto } from "@/utils/imageUtils";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AvatarSm({ id, username, remove, indicatorVisible }) {
    const [removeVisible, setRemoveVisible] = useState(false);

    return (
        <div className="w-[32px] h-[32px] rounded-full bg-blue-500 flex items-center justify-center tooltip tooltip-bottom cursor-default indicator" data-tip={username}
            onMouseEnter={() => setRemoveVisible(true)} onMouseLeave={() => setRemoveVisible(false)}>
            {indicatorVisible && (
                removeVisible && (
                    <span className="indicator-item badge bg-gray-300 w-4 border-white border-[1px] cursor-pointer hover:bg-gray-400 duration-300"
                        onClick={(ev) => {
                            ev.stopPropagation();
                            remove(id);
                        }}>
                        <FontAwesomeIcon icon={faClose} className="w-2 text-white" />
                    </span>
                )
            )}
            <h1 className="text-bold text-white text-[18px] text-center">{username.slice(0, 1)}</h1>
        </div>
    )
}