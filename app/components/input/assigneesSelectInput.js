'use client'
import { useEffect, useState } from 'react'
import Select from 'react-select'

export default function SelectAssigneees({label, placeholder, onchange, disabled, uuid}) {
    const [loading, setLoading] = useState(true);
    const [selection, setSelection] = useState([]);

    useEffect(() => {
        const loadSelection = async () => {
            try {
                const response = await fetch(`/api/target-members?uuid=${uuid}`, {
                    method: 'get',
                })    

                const result = await response.json();

                setSelection(result?.data);
            } catch(error) {
                throw new Error(error);
            } finally{
                setLoading(false);
            }
        }

        loadSelection();
    }, [])

    return (
        <>
            <label className='text-black'>{label}</label>
            <Select placeholder={placeholder} isLoading={loading} options={selection} isMulti={true} isSearchable={true} onChange={onchange} isDisabled={disabled} />
        </>
    )
}