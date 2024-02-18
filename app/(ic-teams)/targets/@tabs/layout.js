'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TargetTabsLayout({ children }) {
    const pathname = usePathname();

    return (
        <section className="w-full min-h-screen">
            <header className="flex text-gray-400" style={{ fontSize: '12px' }}>
                <Link href={'/targets/commission-level'} className={`py-2 px-4 relative top-[1px] 
                    ${pathname.includes('/commission-level') && 'border-x-[1px] border-t-[1px] border-gray-400 bg-white text-blue-500 font-semibold'}`}>
                    Commission Level
                </Link>
                <Link href={'/targets/functional-level'} className={`py-2 px-4 relative top-[1px] 
                    ${pathname.includes('/functional-level') && 'border-x-[1px] border-t-[1px] border-gray-400 bg-white text-blue-500 font-semibold'}`}>
                    Functional Group Level
                </Link>
                <Link href={'/targets/division-level'} className={`py-2 px-4 relative top-[1px]
                    ${pathname.includes('/division-level') && 'border-x-[1px] border-t-[1px] border-gray-400 bg-white text-blue-500 font-semibold'}`}>
                    Division/Distribution Level
                </Link>
                <Link href={'/targets/banner'} className={`py-2 px-4 relative top-[1px] 
                    ${pathname.includes('/banner') && 'border-x-[1px] border-t-[1px] border-gray-400 bg-white text-blue-500 font-semibold'}`}>
                    Banner
                </Link>
            </header>
            <main className="w-full min-h-screen border-gray-400" style={{ borderWidth: '1px' }}>
                {children}
            </main>
        </section>
    )
}