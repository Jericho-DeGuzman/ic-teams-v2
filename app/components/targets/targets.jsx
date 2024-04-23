'use client'
import AddTargetButton from "@/app/components/button/targetButton";
import TargetCard from "@/app/components/card/targetCard";
import { removeTarget, setTargetData } from "@/app/redux/features/targets";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { EmptyFolder } from "@/utils/imageUtils";
import Image from "next/image";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import CustomError from "../errors/error";

export default function Targets({ data, role_permissions, level }) {
    const targets = useAppSelector((state) => state.targetDataSlice.targets);
    const dispatch = useAppDispatch();
    const [error, setError] = useState(null)

    useEffect(() => {
        dispatch(setTargetData(data));
    }, [])

    const handleDelete = async (uuid) => {
        try {
            const response = await fetch(`/api/targets?uuid=${uuid}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })

            const result = await response.json();

            if (result?.status !== 200) throw new Error(result?.status);

            dispatch(removeTarget(uuid));

            toast.success('Target deleted');
        } catch (error) {
            setError(error?.status);
        } 
    }

    if (error) return <CustomError status={error} />

    if (!targets.length) {
        return (
            <div className='w-full min-h-screen flex items-center justify-center text-gray-400
            flex-col space-y-2'>
                <AddTargetButton key={'add-button'} visible={role_permissions.includes('targets.create')} />
                <Image src={EmptyFolder} height={72} width={72} alt='icon' />
                <p>
                    No available target.
                </p>
            </div>
        )
    }

    return (
        <main className={`w-full target-container`}>
            {targets.map((target, index) => (
                <TargetCard key={index} uuid={target.uuid} type={target.type} title={target.title} watchlist={role_permissions.includes('watchlist.create')}
                    description={target.description} category={target.category}
                    status={target.status} start_date={target.start_date} end_date={target.end_date}
                    update_at={target.updated_at} progress={target.progress} functional_group={target.distribution_groups} ondelete={handleDelete}
                    permissions={role_permissions} level={level} 
                />
            ))}
        </main>
    )
}