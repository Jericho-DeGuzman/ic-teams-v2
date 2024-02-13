'use client'
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select'
import TargetCard from '@/app/components/card/targetCard'
import style from './target.module.css'


async function loadTargets() {
    const response = await fetch('http://localhost:3000/api/targets?level=commission', {
        method: 'GET',
    })

    const result = await response.json();
    return result?.data;
}

export default async function CommissionLevel() {
    // TODO: make separate component for search.
    const targets = await loadTargets();

    return (
        <section className="w-full min-h-screen p-6 text-[12px]">
            <button className="bg-blue-500 p-2 flex items-center fixed z-[1] rounded-full bottom-8 right-8
                hover:bg-blue-700 duration-300">
                <FontAwesomeIcon icon={faPlus} className="w-6 h-6 text-white" />
            </button>
            <header className='flex w-full gap-2 items-center text-gray-400'>
                <span className='text-[14px]'>Filter:</span>
                <div className='w-3/12 flex border-[1px] border-gray-300 p-1 rounded-md gap-1 
                    focus-within:border-blue-500 duration-200 focus-within:border-2'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='p-2 h-3 w-3' />
                    <input type='text' className='w-10/12 outline-none border-l-[1px] border-gray-300 p-1 text-black'
                        placeholder='Search' />
                </div>
                <Select placeholder={'Target Category'} className='w-3/12' />
                <Select placeholder={'Target Status'} className='w-3/12' />
            </header>
            <main className='min-h-screen w-full my-4 border-gray-400'>
                <div className={`w-full target-container`}>
                    {targets.map((target) => (
                        <TargetCard key={target.uuid} uuid={target.uuid} type={target.type} title={target.title}
                            description={target.description} category={target.category}
                            status={target.status} start_date={target.start_date} end_date={target.end_date}
                            update_at={target.last_update} progress={target.progress}
                        />
                    ))}
                </div>
            </main>
            <hr className='border-[1px] my-2' />
            <footer className='w-full flex justify-center'>
                <div className='join grid grid-cols-2 w-4/12 text-gray-400'>
                    <button className='join-item p-2 border-[1px] rounded-l-md 
                    border-gray-400 hover:bg-blue-500 hover:border-blue-500 duration-300
                        hover:text-white'>
                        Previous page</button>
                    <button className='join-item p-2 border-[1px] rounded-r-md 
                    border-gray-400 hover:bg-blue-500 hover:border-blue-500 duration-300
                        hover:text-white'>
                        Next page</button>
                </div>
            </footer>
        </section>
    )
}