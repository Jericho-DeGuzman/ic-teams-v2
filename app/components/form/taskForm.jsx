'use client'
import { closeTaskForm } from '@/app/redux/features/taskForm';
import { useAppDispatch } from '@/app/redux/hooks'
import Select from 'react-select'

export default function TargetTaskForm() {
    const dispatch = useAppDispatch();

    return (
        <>
            <div className="flex flex-col">
                <label className="text-black">Title</label>
                <input type="text" placeholder="Add title"
                    className="w-full bg-transparent outline-none border-[1px] border-gray-400 rounded-md p-2 
                                    focus:border-[2px] focus:border-blue-500 duration-100"/>
            </div>
            <div className="flex flex-col">
                <label className="text-black">Description</label>
                <textarea placeholder="Add description"
                    className="w-full h-44 bg-transparent rounded-md border-[1px] border-gray-400 resize-none
                                focus:border-[2px] focus:border-blue-500 outline-none p-2"/>
            </div>
            <div className="w-full grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                    <label className="text-black">Due Date</label>
                    <input type="date"
                        className="w-full bg-transparent border-[1px] border-gray-400 focus:border-[2px] focus:border-blue-500
                                        p-2 rounded-md outline-none"/>
                </div>
                <div className="flex flex-col">
                    <label className="text-black">Member</label>
                    <Select placeholder="Assign member" />
                </div>
            </div>
            <div className='w-full flex gap-2 justify-end'>
                <button className='p-2 rounded-md text-white bg-gray-300 hover:bg-gray-400 duration-100'
                    onClick={() => dispatch(closeTaskForm())}>Cancel</button>
                <button className='p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 duration-100'>Create</button>
            </div>
        </>
    )
}