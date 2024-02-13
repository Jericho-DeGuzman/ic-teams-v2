import pathnameUtils from "@/utils/pathnameUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiderbarLink({ icon, name, link, expand, active }) {

    return (
        <Link href={link} className={`flex items-center text-gray-400 cursor-pointer ${expand && 'hover:text-blue-500 hover:bg-gray-200 rounded-md p-2 gap-2'}`}>
            <div className={`flex items-center  ${active && 'text-blue-500'} ${!expand && 'hover:bg-gray-200 hover:text-blue-500 rounded-md hover:duration-300 p-2'}`}>
                <FontAwesomeIcon icon={icon} className="w-5 h-5" />
            </div>
            {expand && (
                <div className={` ${active && 'text-blue-500'} flex items-center`}>
                    {name}
                </div>
            )}
        </Link>
    )
}