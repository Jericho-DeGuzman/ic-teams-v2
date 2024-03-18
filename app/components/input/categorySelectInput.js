'use client'
import { setCategoriesData } from '@/app/redux/features/selectionData';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { useEffect, useState } from 'react'
import Select from 'react-select'

export default function SelectCategories({ placeholder, label, onchange, disabled }) {
    const selection = useAppSelector((state) => state.selectionDataSlice.data.categories);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSelection = async () => {
            try {
                if (selection.length == 0) {
                    const response = await fetch('/api/categories', {
                        method: 'get'
                    })

                    const result = await response.json();

                    if (result?.status !== 200) {
                        throw new Error(error?.message);
                    }

                    const { data } = result;
                    dispatch(setCategoriesData(data));
                }
            } catch (error) {
                console.log(error)
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
            <Select placeholder={placeholder} isLoading={loading} options={selection} isSearchable={true} onChange={onchange} isDisabled={disabled}/>
        </div>
    )
}