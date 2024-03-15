'use client'
import { useState } from 'react'
import Select from 'react-select'
import { motion } from 'framer-motion'
import SelectDistributionGroup from '../input/distributionSelectInput'
import SelectCategories from '../input/categorySelectInput'

const initialState = {
    title: '',
    level: 1,
    type: 0,
    category_id: null,
    description: '',
    distribution_groups: [],
    start_date: null,
    end_date: null,
}

export default function InternalTargetForm({ onCancel }) {
    const [noEndDate, setNoEndDate] = useState(false)
    const [newTarget, setNewTarget] = useState(initialState)

    const handleSubmit = (ev) => {
        ev.preventDefault();
        console.log(newTarget.distribution_groups)
    }

    const handleDistributionChange = (ev) => {
        setNewTarget((prev) => ({
            ...prev,
            distribution_groups: ev
        }))
    }

    const handleCategoryChange = (ev) => {
            
    }
    

    return (
        <motion.section
            className="w-full text-[12px] space-y-2">
            <div className="w-full grid grid-cols-2 gap-2">
                <SelectCategories placeholder={'Selection Category'} label={'Categories'} onchange={handleCategoryChange}/>
                <div className="flex flex-col space-y-1">
                    <label className='text-black'>Title</label>
                    <input type='text' name='title' className='p-[9px] rounded-md bg-transparent border-[1px] border-gray-300
                    outline-none focus:border-blue-500 focus:border-2 duration-100'
                        placeholder='Add title' />
                </div>
            </div>
            <div className='w-full space-y-1'>
                <label className='text-black'>Description</label>
                <textarea name='description' className='w-full min-h-32 max-h-32 resize-none bg-transparent border-[1px] border-gray-300
                    rounded-md focus:border-2 focus:border-blue-500 duration-100 outline-none p-2'
                    placeholder='Add description' />
            </div>
            <SelectDistributionGroup name='distribution_group_id' placeholder={'Select Division/Distribution Group'} label={'Division/Distribution Group'} onchange={handleDistributionChange} />
            <div className='w-full grid grid-cols-2 gap-2'>
                <div className="flex flex-col space-y-1">
                    <label className='text-black'>Start Date</label>
                    <input name='start_date' type='date' className='bg-transparent rounded-md p-2 border-[1px] border-gray-300 outline-none
                        focus:border-blue-500 focus:border-2 duration-100'/>
                </div>
                <div className="flex flex-col space-y-1">
                    <label className='text-black flex gap-2 items-center justify-between'>
                        <span>End Date</span>
                        <span className='flex items-center gap-1'>
                            <input type='checkbox' className='h-4 w-4' onChange={(e) => setNoEndDate(!noEndDate)} />
                            <span className='italic text-gray-400'>Open-ended target</span>
                        </span>
                    </label>
                    <input type='date' name='end_date' className='bg-transparent rounded-md p-2 border-[1px] border-gray-300 outline-none
                        focus:border-blue-500 focus:border-2 duration-100' disabled={noEndDate} />
                </div>
            </div>
            <div className='w-full flex justify-end gap-2'>
                <button className='p-2 bg-gray-300 rounded-md text-white hover:bg-gray-400 duration-100'
                    onClick={onCancel}>
                    CANCEL
                </button>
                <form onSubmit={handleSubmit}>
                    <button className='p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-100'
                        type='submit'>
                        CREATE
                    </button>
                </form>
            </div>
        </motion.section>
    )
}