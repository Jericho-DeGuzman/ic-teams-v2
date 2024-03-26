'use client'
import Select from 'react-select'
import SelectAssigneees from '../input/assigneesSelectInput';

export default function TargetTaskForm({ selection, inputchange, newTask, oncancel, onsubmit, assigneesChange, disabled }) {
    const { title, description, date } = newTask;

    return (
        <form onSubmit={onsubmit} className='text-black'>
            <div className="flex flex-col">
                <label className="text-black">Title</label>
                <input name='title' type="text" placeholder="Add title"
                    className="w-full bg-transparent outline-none border-[1px] border-gray-400 rounded-md p-2 
                                    focus:border-[2px] focus:border-blue-500 duration-100" value={title} onChange={inputchange} disabled={disabled} />
            </div>
            <div className="flex flex-col">
                <label className="text-black">Description</label>
                <textarea name="description" placeholder="Add description"
                    className="w-full h-44 bg-transparent rounded-md border-[1px] border-gray-400 resize-none
                                focus:border-[2px] focus:border-blue-500 outline-none p-2" value={description} onChange={inputchange} disabled={disabled} />
            </div>
            <div className="w-full grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                    <label className="text-black">Due Date</label>
                    <input name='due_date' type="date"
                        className="w-full bg-transparent border-[1px] border-gray-400 focus:border-[2px] focus:border-blue-500
                                        p-2 rounded-md outline-none" value={date} onChange={inputchange} disabled={disabled} />
                </div>
                <div className="flex flex-col">
                    <SelectAssigneees uuid={selection} onchange={assigneesChange} label={'Assign Member'} placeholder={'Assign Member'} disabled={disabled} />
                </div>
            </div>
            <div className='w-full flex gap-2 justify-end mt-2'>
                <button className='p-2 rounded-md text-white bg-gray-300 hover:bg-gray-400 duration-100'
                    onClick={oncancel}>Cancel</button>
                <button className={`p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-100 ${disabled && 'px-4 py-2 flex items-center justify-center'}`}
                    type='submit' disabled={disabled}>
                    {disabled ? <span class="loading loading-spinner loading-xs"></span> : <>CREATE</>}
                </button>
            </div>
        </form>
    )
}