import Modal from "../modal/modal";
import { motion } from "framer-motion";

export default function ConfirmationDialog({ oncancel, onconfirm, loading }) {
    return (
        <Modal >
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
                    className="p-4 rounded-md w-full max-w-lg bg-white">
                    <h1 className="text-[18px] text-blue-500 font-semibold">Delete Target</h1>
                    <h1 className="w-full text-neutral-800 text-[14px]">Are you sure you want to delete this target? </h1>
                    <div className="w-full flex gap-2 justify-end">
                        <button className="p-2 bg-gray-200 rounded-md hover:bg-gray-300" onClick={oncancel} disabled={loading}>Cancel</button>
                        <button className={`p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-200 ${loading && 'py-2 px-6'}`} onClick={onconfirm} disabled={loading}>
                            {loading ? <span class="loading loading-spinner loading-xs"></span> : <>Delete</>}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </Modal>
    )
}