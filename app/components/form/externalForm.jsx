'use client'
import { useState } from 'react'
import Select from 'react-select'
import { motion } from 'framer-motion'

export default function ExternalTargetForm({ onCancel }) {
    const [noEndDate, setNoEndDate] = useState(false);
    const [tiedToCompany, setTiedToCompany] = useState(false);

    return (
        <motion.section
            className="w-full text-[12px] space-y-2">
            <div className="w-full grid grid-cols-2 gap-2">
                <div className="flex flex-col  space-y-1">
                    <label className='text-black'>Catergory</label>
                    <Select placeholder="Select Target Category" />
                </div>
                <div className="flex flex-col space-y-1">
                    <label className='text-black'>Title</label>
                    <input type='text' className='p-[9px] rounded-md bg-transparent border-[1px] border-gray-300
                    outline-none focus:border-blue-500 focus:border-2 duration-100'
                        placeholder='Target Title' />
                </div>
            </div>
            <div className='w-full space-y-1'>
                <label className='text-black'>Description</label>
                <textarea className='w-full min-h-32 max-h-32 resize-none bg-transparent border-[1px] border-gray-300
                    rounded-md focus:border-2 focus:border-blue-500 duration-100 outline-none p-2'
                    placeholder='Target Description' />
            </div>
            <div className='w-full grid grid-cols-2 gap-2'>
                <div className='flex flex-col space-y-1'>
                    <label className='text-black'>Division/Distribution Group</label>
                    <Select placeholder='Select Division/Distribution Group' />
                </div>
                <div className="flex flex-col space-y-1">
                    <label className='text-black flex gap-2 items-center justify-between'>
                        <span>Company</span>
                        <span className='flex items-center gap-1'>
                            <input type='checkbox' className='h-4 w-4' onChange={(e) => setTiedToCompany(!tiedToCompany)} />
                            <span className='italic text-gray-400'>Not tied to specific company</span>
                        </span>
                    </label>
                    <Select placeholder='Select Company' isDisabled={tiedToCompany}/>
                </div>
            </div>
            <div className='w-full grid grid-cols-2 gap-2'>
                <div className="flex flex-col space-y-1">
                    <label className='text-black'>Start Date</label>
                    <input type='date' className='bg-transparent rounded-md p-2 border-[1px] border-gray-300 outline-none
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
                    <input type='date' className='bg-transparent rounded-md p-2 border-[1px] border-gray-300 outline-none
                        focus:border-blue-500 focus:border-2 duration-100' disabled={noEndDate} />
                </div>
            </div>
            <div className='w-full flex justify-end gap-2'>
                <button className='p-2 bg-gray-300 rounded-md text-white hover:bg-gray-400 duration-100'
                    onClick={onCancel}>
                    CANCEL
                </button>
                <button className='p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-100'>
                    CREATE
                </button>
            </div>
        </motion.section>
    )
}