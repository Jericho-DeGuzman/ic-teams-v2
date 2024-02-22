import Modal from "./modal";
import { motion } from "framer-motion";
import Select from 'react-select';
import TargetTaskForm from "../form/taskForm";

export default function TargetTaskModal() {
    return (
        <Modal>
            <div className="modal modal-open">
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
                    className="modal-box w-full max-w-2xl bg-white">
                    <header className="py-2">
                        <h1 className="font-semibold text-blue-500">Create Task</h1>
                    </header>
                    <main className="w-full space-y-2 text-[12px]">
                        <TargetTaskForm />
                    </main>
                </motion.div>
            </div>
        </Modal>
    )
}