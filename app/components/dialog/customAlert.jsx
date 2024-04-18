import Image from "next/image";
import Modal from "../modal/modal";
import { motion } from "framer-motion";
import { ICLogo, Wrong } from "@/utils/imageUtils";

export default function CustomAlertDialog({ error, onconfirm }) {
    let message = '';

    switch (error) {
        case '422': message = 'You are not authorized to perform this action.'
            break;
    }

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
                    className="p-4 rounded-md w-full max-w-lg bg-white">
                    <div className="w-full flex flex-col items-center justify-center space-y-2">
                        <Image src={Wrong} height={72} width={72} alt="wrong.png" />
                        <div >
                            <h1 className="text-[16px] font-semibold">Oops! {message}</h1>
                        </div>
                        <div className="flex gap-1 justify-center items-center">
                            <Image src={ICLogo} height={24} width={24} />
                            <p className="text-[12px] italic">Insurance Commission.</p>
                        </div>
                        <div className="w-full flex justify-end">
                            <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-200" onClick={onconfirm}>
                                close</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Modal>
    )
}