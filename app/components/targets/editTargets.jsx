'use client'
import { useEffect, useState } from "react";
import Modal from "../modal/modal";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import Cookies from "js-cookie";
import InternalTargetForm from "../form/internalForm";
import ExternalTargetForm from "../form/externalForm";
import InternalEditForm from "../form/internalEditForm";
import { openEditForm } from "@/app/redux/features/targetForms";
import formatNumberDate from "@/utils/formatNumberDate";
import decodeHTMLText from "@/utils/decodeHTMLText";
import EditTargetLoading from "../loading/editTargetLoading";
import toast from "react-hot-toast";
import { validateTargetForm } from "@/utils/validateFormInput";
import { updateTarget } from "@/app/redux/features/targets";

export default function EditTargets() {
    const targetId = useAppSelector((state) => state.editingTargetSlice.uuid);
    const [target, setTarget] = useState([]);
    const [targetType, setTargetType] = useState(null);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [noEndDate, setNoEndDate] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const at = Cookies.get('at')

            try {
                const response = await fetch(`/api/targets?uuid=${targetId}`, {
                    method: 'get',
                    headers: { 'at': at }
                })

                const result = await response.json();

                if (result?.status !== 200) throw new Error(result?.message);

                const { data } = result;

                const { uuid, category_uuid, title, description, distribution_groups, start_date, end_date, level_uuid, type } = data;

                const filteredGroup = [];
                distribution_groups.map(group => {
                    filteredGroup.push({ value: group.distribution_group.id, label: group.distribution_group.name })
                })

                setTarget({
                    uuid: uuid,
                    title: decodeHTMLText(title),
                    description: decodeHTMLText(description),
                    category_uuid: category_uuid,
                    distribution: filteredGroup,
                    start_date: formatNumberDate(start_date),
                    end_date: formatNumberDate(end_date),
                    level_uuid: level_uuid,
                    type: type
                });

                setNoEndDate(end_date === '');
                setTargetType(type)

            } catch (error) {
                throw new Error(error);
            } finally {
                setLoading(false);
            }
        }   

        fetchData();
    }, [])


    const onCancel = () => {
        setTarget([])
        setTargetType(null);
        dispatch(openEditForm(false));
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        try {
            setSaving(true);
            await validateTargetForm({ ...target, ['no_end_date']: noEndDate, ['target_type']: 'internal' });

            const response = await fetch(`/api/targets?uuid=${targetId}`, {
                method: 'put',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify(target)
            })

            const result = await response.json();

            if (result?.status !== 200) throw new Error(result?.message);
            const { data } = result;

            dispatch(updateTarget(data));
            toast.success('Target updated.');

            setTarget([]);
            dispatch(openEditForm(false));
        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        } finally {
            setSaving(false);
        }
    }

    // handle distribution selection
    const handleDistributionChange = (ev) => {
        setTarget((prev) => ({
            ...prev,
            distribution: ev
        }))
    }

    // handle category selection
    const handleCategoryChange = (ev) => {
        setTarget((prev) => ({
            ...prev,
            category_uuid: ev.value
        }))
    }

    // handle other input selection
    const handleInputChange = (ev) => {
        const { name, value } = ev.target;
        setTarget((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const openEndedTarget = (ev) => {
        const { checked } = ev.target;
        if (checked) {
            if (target.end_date) target.end_date = '';
        }
        setNoEndDate(!noEndDate);
    }

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
                    className="p-4 rounded-md w-full max-w-5xl bg-white">
                    <header className="w-full py-2">
                        <h1 className="text-[14px] font-semibold text-blue-500">Edit Target</h1>
                    </header>
                    {loading ? (
                        <EditTargetLoading />
                    ) : (
                        targetType == 1 ? (
                            <InternalEditForm target={target} onCancel={onCancel} handleCategoryChange={handleCategoryChange} handleInputChange={handleInputChange}
                                handleDistributionChange={handleDistributionChange} handleSubmit={handleSubmit} saving={saving} openEndedTarget={openEndedTarget}
                            />
                        ) : (
                            <ExternalTargetForm />
                        )
                    )}
                </motion.div>
            </motion.div>
        </Modal>
    )
}