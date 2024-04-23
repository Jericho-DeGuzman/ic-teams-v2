import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function BannerButton({visible}) {
    const [banner, setBanner] = useState(false);

    return (
        visible && (
            <div className={`p-[5px] text-gray-400 hover:bg-gray-200 rounded-md flex items-center cursor-pointer duration-200 
            hover:text-blue-500 tooltip`}
            data-tip="Mark as banner." onClick={() => setBanner(!banner)}>
            <FontAwesomeIcon icon={faFlag} className={`w-4 h-4 ${banner && 'text-blue-500'}`}/>
        </div>
        )
    );
}