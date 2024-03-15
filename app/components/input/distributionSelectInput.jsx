'use client'
import loadDistributionGroup from '@/app/(ic-teams)/lib/ApiCaller/selectionData/distributionGroup';
import { setDistributionGroupsData } from '@/app/redux/features/selectionData';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { useEffect, useState } from 'react'
import Select from 'react-select'

export default function SelectDistributionGroup({ placeholder, label, name, onchange }) {
    const selection = useAppSelector((state) => state.selectionDataSlice.data.distributionGroups);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSelection = async () => {
            try {
                if (selection.length == 0) {
                    const selectionData = await loadDistributionGroup();
                    dispatch(setDistributionGroupsData(selectionData));
                }
            } catch (error) { 
                console.log(error)
            } finally {
                setLoading(false);
            }
        }

        loadSelection();
    }, [])

    return (
        <div className='w-full space-y-1'>
            <label className='text-black'>{label}</label>
            <Select name={name} placeholder={placeholder} isLoading={loading} options={selection} 
                isSearchable={true} onChange={onchange} isMulti={true}/>
        </div>
    )
}