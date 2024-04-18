'use client'
import { setFileRequirements } from '@/app/redux/features/selectionData';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react'
import Select from 'react-select'

export default function SelectFileRequirements({ placeholder, label, onchange, disabled, defaultValue }) {
    const selection = useAppSelector((state) => state.selectionDataSlice.data.fileRequirements);
    const [fileSelection, setFileSelection] = useState([]);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSelection = async () => {
            const at = Cookies.get('at');
            try {
                if (selection.length == 0) {
                    const response = await fetch('/api/file-requirements', {
                        method: 'get',
                        headers: {'at' : at}
                    })

                    const result = await response.json();

                    if (result?.status !== 200) {
                        throw new Error(error?.message);
                    }

                    const { data } = result;
                    dispatch(setFileRequirements(data));
                }
            } catch (error) {
                console.log(error)
                throw new Error(error?.message);
            } finally {
                setLoading(false);
            }
        }

        loadSelection();

        if(selection) {
            const items = [];

            selection.map((item) => {
                items.push({value: item.uuid, label: item.title});
            })

            setFileSelection(items);
        }

    }, [selection, dispatch])

    return (
        <div className='w-full'>
            <label className='text-black'>{label}</label>
            <Select placeholder={placeholder} isLoading={loading} options={fileSelection} isSearchable={true} onChange={onchange} 
                isDisabled={disabled}/>
        </div>
    )
}