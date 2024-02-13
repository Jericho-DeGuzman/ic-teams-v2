'use client'
import { ICLogo } from "@/utils/imageUtils"
import { faBank, faChartSimple, faListUl, faUsers, faBookmark, faCheckCircle, faColumns } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useState } from "react"
import SiderbarLink from "./sidebarLink"
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks"
import { closeSidebar } from "@/app/redux/features/sidebar"
import pathnameUtils from "@/utils/pathnameUtils"
import { usePathname } from "next/navigation"

export default function Siderbar() {
    // to expand sidebar.
    const expand = useAppSelector((state) => state.sidebarSlice.value);
    const dispatch = useAppDispatch();
    // to show expand button.
    const [onHeaderMouseEnter, setHeaderMouseEnter] = useState(false);
    const pathname = pathnameUtils(usePathname());

    // siderbar links.  
    const sidebarLinks = [
        { id: 1, name: 'Dashboard', link: '/dashboard', icon: faChartSimple },
        { id: 2, name: 'Daily Task', link: '/daily-task', icon: faCheckCircle },
        { id: 3, name: 'Targets', link: '/targets', icon: faListUl },
        { id: 4, name: 'Watchlist', link: '/watchlist', icon: faBookmark },
        { id: 5, name: 'Companies', link: '/companies', icon: faBank },
        { id: 6, name: 'Distribution Groups', link: '/distribution-group', icon: faUsers },
    ]

    return (
        <div className="w-full min-h-screen border-gray-400" style={{ borderRightWidth: '1px', borderBottomWidth: '1px' }}>
            <header className={`px-4 py-2 flex gap-2 items-center ${!expand && 'justify-center'} justify-between`}
                onMouseEnter={() => setHeaderMouseEnter(true)} onMouseLeave={() => setHeaderMouseEnter(false)}>
                <span className="flex items-center">
                    <Image src={ICLogo} height={32} width={32} alt="logo" />
                </span>
                {expand && (
                    <>
                        <span className="font-bold text-blue-500 flex items-center p-1" style={{ fontSize: '18px' }}>
                            IC TEAMS
                        </span>
                        <span className={`p-1 flex opacity-0 ${onHeaderMouseEnter && 'opacity-100'} duration-300 text-gray-400
                            hover:text-blue-500 hover:bg-gray-200 border-md rounded-md cursor-pointer`}>
                            <FontAwesomeIcon icon={faColumns} className="h-4 w-4" onClick={() => dispatch(closeSidebar())} />
                        </span>
                    </>
                )}
            </header>
            <div className="space-y-1 px-4 py-2">
                {sidebarLinks.map((link) => (
                    <SiderbarLink key={link.name} link={link.link} icon={link.icon}
                        name={link.name} expand={expand}
                        active={link.link == pathname} />
                ))}
            </div>
        </div>
    )
}