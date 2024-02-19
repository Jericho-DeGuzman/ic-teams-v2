'use client'
import { useEffect, useState } from "react";
import Modal from "./modal";
import { motion } from "framer-motion";
import InternalTargetForm from "../form/internalForm";
import { useAppDispatch } from "@/app/redux/hooks";
import { openInternalForm } from "@/app/redux/features/targetForms";

export default function InternalTargetModal() {
    const [activeTab, setActiveTab] = useState('new');
    const dispatch = useAppDispatch();

    const onCancel = () => {
        dispatch(openInternalForm(false));
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
                    className="modal-box w-full max-w-5xl bg-white">
                    <header className="w-full p-2">
                        <h1 className="text-[14px] font-semibold text-blue-500">Create Internal Target</h1>
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
                                <InternalTargetForm onCancel={onCancel} />
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