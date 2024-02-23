'use client'
import ExternalTargetModal from "@/app/components/modal/externalModal";
import InternalTargetModal from "@/app/components/modal/internalModal";
import OptionModal from "@/app/components/modal/optionModal";
import { openOptionForm } from "@/app/redux/features/targetForms";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TargetTabsLayout({ children, modal }) {
    const pathname = usePathname();
    const optionModal = useAppSelector(state => state.targetFormSlice.option); // hold the value if option for external and internal form is open.
    const internalModal = useAppSelector(state => state.targetFormSlice.internal); // hold the value if external modal is open.
    const externalModal = useAppSelector(state => state.targetFormSlice.external);

    const dispatch = useAppDispatch();

    const onClose = () => {
        dispatch(openOptionForm(false))
    }

    return (
        <section className="w-full min-h-screen">
            <AnimatePresence>
                {optionModal && <OptionModal onclose={onClose} />}
            </AnimatePresence>
            <AnimatePresence>ßß
                {internalModal && <InternalTargetModal />}
            </AnimatePresence>
            <AnimatePresence>
                {externalModal && <ExternalTargetModal />}
            </AnimatePresence>
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
                {modal}
                {children}
            </main>
        </section>
    )
}