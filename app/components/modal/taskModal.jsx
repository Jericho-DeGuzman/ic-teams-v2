'use client'
import Modal from "./modal";
import { motion } from "framer-motion";
import Select from 'react-select';
import TargetTaskForm from "../form/taskForm";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/redux/hooks";
import { closeTaskForm } from "@/app/redux/features/taskForm";
import toast from "react-hot-toast";

// const initialState = {
//     target_uuid: '',
//     title: '',
//     description: '',
//     due_date: '',
//     assigned_members: []
// }

export default function TargetTaskModal({ uuid, onsubmit, inputchange, onassigneeschange, oncancel, newTask }) {
    // const [newTask, setNewTask] = useState(initialState);
    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     setNewTask((prev) => ({
    //         ...prev,
    //         target_uuid: uuid
    //     }))
    // },[])

    // const inputChangeHandler = (ev) => {
    //     const { name, value } = ev.target;

    //     setNewTask((prev) => ({
    //         ...prev,
    //         [name]: value
    //     }))
    // }

    // const onCancelHandler = () => {
    //     dispatch(closeTaskForm());
    //     setNewTask(initialState)
    // }

    // const onSubmitHandler = async (ev) => {
    //     ev.preventDefault();

    //     try {
    //         const response = await fetch('/api/tasks', {
    //             method: 'post',
    //             body: JSON.stringify(newTask)
    //         })

    //         const result = await response.json();

    //         if(response !== 200) throw new Error(result?.message);



    //     } catch (error) {
    //         toast.error(error?.message);
    //     }
    // }

    // const onAssigneesHandler = async (ev) => {
    //     setNewTask((prev) => ({
    //         ...prev,
    //         assigned_members: ev
    //     }))
    // }

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
                        <TargetTaskForm selection={uuid} inputchange={inputchange} assigneesChange={onassigneeschange} newTask={newTask} oncancel={oncancel} onsubmit={onsubmit}/>
                    </main>
                </motion.div>
            </div>
        </Modal>
    )
}