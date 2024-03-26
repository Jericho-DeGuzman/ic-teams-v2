'use client'
import { setDistributionGroupsData } from '@/app/redux/features/selectionData';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { useEffect, useState } from 'react'
import Select from 'react-select'

export default function SelectDistributionGroup({ placeholder, label, name, onchange, disabled, defaultValue }) {
    const selection = useAppSelector((state) => state.selectionDataSlice.data.distributionGroups);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSelection = async () => {
            try {
                if (selection.length == 0) {
                    const response = await fetch('/api/distribution-groups', {
                        method: 'get'
                    })

                    const result = await response.json();

                    if (result?.status !== 200) {
                        throw new Error(result?.message);
                    }

                    const { data } = result;
                    dispatch(setDistributionGroupsData(data));
                }
            } catch (error) {
                throw new Error(error?.message);
            } finally {
                setLoading(false);
            }
        }

        loadSelection();
    }, [selection, dispatch])

    return (
        <div className='w-full space-y-1'>
            <label className='text-black'>{label}</label>
            <Select name={name} placeholder={placeholder} isLoading={loading} options={selection} isDisabled={disabled}
                isSearchable={true} onChange={onchange} isMulti={true} value={defaultValue} />
        </div>
    )
}