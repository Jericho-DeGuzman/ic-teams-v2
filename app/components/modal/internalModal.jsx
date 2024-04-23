'use client'
import { useEffect, useState } from "react";
import Modal from "./modal";
import { AnimatePresence, motion } from "framer-motion";
import InternalTargetForm from "../form/internalForm";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { openInternalForm } from "@/app/redux/features/targetForms";
import { validateTargetForm } from "@/utils/validateFormInput";
import toast from "react-hot-toast";
import { addNewTarget, setTargetData } from "@/app/redux/features/targets";
import { parseAndGetValue } from "@/utils/parseValue";

const initialState = {
    title: '',
    category_uuid: null,
    level_uuid: '31297577-a59a-4fd8-9cf5-c8fcec0f0999',
    type: 1,
    description: '',
    distribution: [],
    start_date: '',
    end_date: '',
}


export default function InternalTargetModal() {
    const [noEndDate, setNoEndDate] = useState(false);
    const [newTarget, setNewTarget] = useState(initialState);
    const [saving, setSaving] = useState(false);
    const targets = useAppSelector((state) => state.targetDataSlice.targets);

    const [activeTab, setActiveTab] = useState('new');
    const dispatch = useAppDispatch();

    const onCancel = () => {
        dispatch(openInternalForm(false));
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        try {
            setSaving(true);
            await validateTargetForm({ ...newTarget, ['no_end_date']: noEndDate, ['target_type']: 'internal' });

            const response = await fetch('/api/targets', {
                method: 'POST',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTarget)
            })

            const result = await response.json();

            if (result?.status !== 200) throw new Error(result?.message);
            const { data } = result;
            
            if (targets.length < 12) dispatch(addNewTarget(data));
            toast.success('Target Successfully created.');

            setNewTarget(initialState);
            dispatch(openInternalForm(false));
        } catch (error) {
            console.log(error);
            toast.error(parseAndGetValue(error?.message));
        } finally {
            setSaving(false);
        }

    }

    // handle distribution selection
    const handleDistributionChange = (ev) => {
        setNewTarget((prev) => ({
            ...prev,
            distribution: ev
        }))
    }

    // handle category selection
    const handleCategoryChange = (ev) => {
        setNewTarget((prev) => ({
            ...prev,
            category_uuid: ev.value
        }))
    }

    // handle other input selection
    const handleInputChange = (ev) => {
        const { name, value } = ev.target;
        setNewTarget((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const openEndedTarget = (ev) => {
        const { checked } = ev.target;
        if (checked) {
            if (newTarget.end_date) newTarget.end_date = '';
        }
        setNoEndDate(!noEndDate);
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
                        <h1 className="text-[14px] font-semibold text-blue-500">Create Internal Target</h1>
                    </header>
                    <main className="w-full space-y-4">
                        <div className="w-full flex gap-4 items-center">
                            <button className={`p-2 ${activeTab == 'new' && 'border-b-2 text-blue-500 border-blue-500 transition-transform'} 
                                hover:bg-gray-300 hover:text-blue-500 duration-200 cursor-pointer`}
                                onClick={() => setActiveTab('new')} disabled={saving}>New</button>
                            <button className={`p-2 ${activeTab == 'templates' && 'border-b-2 text-blue-500 border-blue-500 transition-transform'} 
                                hover:bg-gray-300 hover:text-blue-500 duration-200 cursor-pointer`}
                                onClick={() => setActiveTab('templates')} disabled={saving}>Template</button>
                        </div>
                        <div className="w-full">
                            {activeTab == 'new' ? (
                                <AnimatePresence>
                                    <InternalTargetForm onCancel={onCancel} target={newTarget} handleCategoryChange={handleCategoryChange} openEndedTarget={openEndedTarget}
                                        handleInputChange={handleInputChange} handleDistributionChange={handleDistributionChange} handleSubmit={handleSubmit} saving={saving} />
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