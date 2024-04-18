'use client'
import Modal from "./modal";
import { motion } from "framer-motion";
import Select from 'react-select';
import TargetTaskForm from "../form/taskForm";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/redux/hooks";
import { closeTaskForm } from "@/app/redux/features/taskForm";
import toast from "react-hot-toast";

export default function TargetTaskModal({ uuid, onsubmit, inputchange, onassigneeschange, oncancel, newTask, disabled, fileReqChange, fileItems, fileItemChange }) {
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
                    className="p-4 rounded-md w-full max-w-4xl bg-white">
                    <header className="py-2">
                        <h1 className="font-semibold text-blue-500">Create Task</h1>
                    </header>
                    <main className="w-full space-y-2 text-[12px]">
                        <TargetTaskForm selection={uuid} inputchange={inputchange} assigneesChange={onassigneeschange} 
                            newTask={newTask} oncancel={oncancel} onsubmit={onsubmit} disabled={disabled} fileReqChange={fileReqChange}
                            fileItems={fileItems} fileItemChange={fileItemChange}
                            />
                    </main>
                </motion.div>
            </div>
        </Modal>
    )
}