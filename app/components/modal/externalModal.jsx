'use client'
import { useEffect, useState } from "react";
import Modal from "./modal";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch } from "@/app/redux/hooks";
import { openExternalForm } from "@/app/redux/features/targetForms";
import ExternalTargetForm from "../form/externalForm";

export default function ExternalTargetModal() {
    const [activeTab, setActiveTab] = useState('new');
    const dispatch = useAppDispatch();

    const onCancel = () => {
        dispatch(openExternalForm(false));
    }

    return (
        <Modal>
            <motion.div className="modal modal-open">
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.75
                    }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        rotate: 0,
                        transition: {
                            ease: 'easeOut',
                            duration: 0.15
                        }
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.75,
                        transition: {
                            ease: "easeIn",
                            duration: 0.15,
                        },
                    }}
                    className="p-4 rounded-md w-full max-w-5xl bg-white">
                    <header className="w-full p-2">
                        <h1 className="text-[14px] font-semibold text-blue-500">Create External Target</h1>
                    </header>
                    <main className="w-full space-y-4">
                        <div className="w-full flex gap-4 items-center">
                            <span className={`p-2 ${activeTab == 'new' && 'border-b-2 text-blue-500 border-blue-500 transition-transform'} 
                                hover:bg-gray-300 hover:text-blue-500 duration-200 cursor-pointer`}
                                onClick={() => setActiveTab('new')}>New</span>
                            <span className={`p-2 ${activeTab == 'templates' && 'border-b-2 text-blue-500 border-blue-500 transition-transform'} 
                                hover:bg-gray-300 hover:text-blue-500 duration-200 cursor-pointer`}
                                onClick={() => setActiveTab('templates')}>Template</span>
                        </div>
                        <div className="w-full">
                            {activeTab == 'new' ? (
                                <AnimatePresence>
                                    <ExternalTargetForm onCancel={onCancel} />
                                </AnimatePresence>
                            ) : (
                                <div className="min-h-96 flex justify-center items-center italic">
                                    Template is not currently available.
                                </div>
                            )}
                        </div>
                    </main>
                </motion.div>
            </motion.div>
        </Modal>
    )
}