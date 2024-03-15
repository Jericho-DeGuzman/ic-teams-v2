'use client'
import loadCategories from '@/app/(ic-teams)/lib/ApiCaller/selectionData/categories';
import { setCategoriesData } from '@/app/redux/features/selectionData';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { useEffect, useState } from 'react'
import Select from 'react-select'

export default function SelectCategories({ placeholder, label, onchange }) {
    const selection = useAppSelector((state) => state.selectionDataSlice.data.categories);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSelection = async () => {
            try {
                if (selection.length == 0) {
                    const selectionData = await loadCategories();
                    dispatch(setCategoriesData(selectionData));
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
            <Select placeholder={placeholder} isLoading={loading} options={selection} isSearchable={true} onChange={onchange}/>
        </div>
    )
}