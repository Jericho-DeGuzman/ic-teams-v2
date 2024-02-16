'use client'
import { openSidebar } from "@/app/redux/features/sidebar";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { faBell, faColumns, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const expand = useAppSelector((state) => state.sidebarSlice.value);
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    let pagename = '';

    if (pathname.includes('/targets')) pagename = 'Targets';
    if (pathname.includes('/dashboard')) pagename = 'Dashboard'

    return (
        <nav className="w-full text-gray-400 flex py-2 px-4 items-center border-gray-400"
            style={{ borderBottomWidth: '1px'}}>
            <div className="w-3/6 flex justify-start gap-2">
                {!expand && (
                    <span className="flex p-1 items-center rounded-md hover:bg-gray-200 hover:text-blue-500 duration-300 cursor-pointer"
                        onClick={() => dispatch(openSidebar())}> 
                        <FontAwesomeIcon icon={faColumns} className="w-4 h-4" />
                    </span>
                )}
                <span className="p-1 flex items-center font-semibold">
                    {pagename}
                </span>
            </div>
            <div className="w-3/6 flex justify-end gap-3">
                <span className="p-1 flex items-center cursor-pointer hover:bg-gray-200 rounded-md hover:text-blue-500 duration-300">
                    <FontAwesomeIcon icon={faBell} className="h-5 w-5" />
                </span>
                <span className="p-1 flex items-center cursor-pointer hover:bg-gray-200 rounded-md hover:text-blue-500 duration-300">
                    <FontAwesomeIcon icon={faGear} className="h-5 w-5" />
                </span>
            </div>
        </nav>
    )
}