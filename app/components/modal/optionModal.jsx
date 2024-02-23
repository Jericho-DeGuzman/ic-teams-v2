'use client'
import { motion } from "framer-motion";
import Modal from "./modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { openExternalForm, openInternalForm, openOptionForm } from "@/app/redux/features/targetForms";
import { useAppDispatch } from "@/app/redux/hooks";

export default function OptionModal({ onclose }) {
    const dispatch = useAppDispatch();

    const setInternalForm = () => {
        dispatch(openInternalForm(true));
        dispatch(openOptionForm(false));
    }

    const setExternalForm = () => {
        dispatch(openExternalForm(true));
        dispatch(openOptionForm(false));
    }

    return (
        <Modal>
            <motion.div className={`modal modal-open`}>
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
                            duration: 0.01,
                        },
                    }}
                    className="p-4 rounded-md bg-white w-4/12 max-w-sm space-y-2">
                    <header className="text-[14px] font-semibold flex justify-between w-full items-center">
                        <div className="text-blue-500">Create Target</div>
                        <div className="w-4 h-4 p-3 flex items-center justify-center rounded-full
                            hover:bg-gray-300 duration-300 cursor-pointer"
                            onClick={onclose}>
                            <FontAwesomeIcon icon={faClose} className="w-4 h-4" />
                        </div>
                    </header>
                    <main className="w-full text-[14px] space-y-2">
                        <button className="w-full flex items-center justify-center rounded-md p-2
                        hover:bg-gray-300 hover:text-blue-500 duration-300" style={{borderWidth: '1px'}}
                            onClick={setInternalForm}>
                            Internal Target
                        </button>
                        <button className="w-full flex items-center justify-center rounded-md p-2
                        hover:bg-gray-300 hover:text-blue-500 duration-300" style={{borderWidth: '1px'}}
                            onClick={setExternalForm}>
                            External Target
                        </button>
                    </main>
                </motion.div>
            </motion.div>
        </Modal>
    )
}