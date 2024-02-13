import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function WatchlistButton() {
    return (
        <div className="p-[5px] text-gray-400 hover:bg-gray-200 rounded-md flex items-center cursor-pointer duration-200">
            <FontAwesomeIcon icon={faBookmark} className="w-4 h-4" />
        </div>
    );
}