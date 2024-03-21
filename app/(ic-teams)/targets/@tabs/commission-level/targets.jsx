'use client'
import AddTargetButton from "@/app/components/button/targetButton";
import TargetCard from "@/app/components/card/targetCard";
import { setDeletingTarget } from "@/app/redux/features/deleteTarget";
import { removeTarget, setTargetData } from "@/app/redux/features/targets";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { EmptyFolder } from "@/utils/imageUtils";
import Image from "next/image";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

export default function Targets({ data, role_permissions }) {
    const targets = useAppSelector((state) => state.targetDataSlice.targets);
    const deletingTarget = useAppSelector((state) => state.deletingTargetSlice.uuid);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTargetData(data));
    }, [])

    const handleDelete = async () => {
        if (!deletingTarget) return;

        try {
            const response = await fetch(`/api/targets?uuid=${deletingTarget}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })

            const result = await response.json();

            if (result?.status !== 200) throw new Error(result?.message);

            dispatch(removeTarget(deletingTarget));

            toast.success('Target deleted');

        } catch (error) {
            console.log(error)
        } finally {
            dispatch(setDeletingTarget(null));
        }
    }

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
                    update_at={target.last_update} progress={target.progress} functional_group={target.distribution_groups} ondelete={handleDelete} moreVisibility={role_permissions.includes('targets.delete')}
                />
            ))}
        </main>
    )
}