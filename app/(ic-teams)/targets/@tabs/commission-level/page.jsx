import TargetCard from '@/app/components/card/targetCard'
import AddTargetButton from '@/app/components/button/targetButton'
import { EmptyFolder } from '@/utils/imageUtils'
import Image from 'next/image'
import SearchInput from '@/app/components/input/searchInput'
import SelectInput from '@/app/components/input/selectInput'

async function loadTargets() {
    const response = await fetch(`${process.env.BASE_URL}/api/targets?level=commission`, {
        method: 'GET',
    })
    const result = await response.json();
    if (result?.status == 200) return result?.data;
}

export default async function CommissionLevel() {
    // TODO: make separate component for search.
    const targets = await loadTargets();

    if (!targets || !targets.length) {
        return (
            <div className='w-full min-h-screen flex items-center justify-center text-gray-400
            flex-col space-y-2'>
                <AddTargetButton key={'add-button'}/>
                <Image src={EmptyFolder} height={72} width={72} alt='icon' />
                <p>
                    No available target.
                </p>
            </div>
        )
    }

    return (
        <section className="w-full min-h-screen p-6 text-[12px]">
            <AddTargetButton key={'add-button'} />
            <header className='flex w-full gap-2 items-center text-gray-400'>
                <span className='text-[14px]'>Filter:</span>
                <div className='w-3/12'>
                    <SearchInput key={'filter_search'} placeholder={'Search target'}/>
                </div>
                <div className='w-3/12'>
                    <SelectInput key={'filter_catergory'} placeholder={'Target Catergory'}/>
                </div>
                <div className='w-3/12'>
                    <SelectInput key={'filter_status'} placeholder={"Target Status"} />
                </div>
            </header>
            <main className='min-h-screen w-full my-4 border-gray-400'>
                <div className={`w-full target-container`}>
                    {targets.map((target) => (
                        <TargetCard key={target.uuid} uuid={target.uuid} type={target.type} title={target.title}
                            description={target.description} category={target.category}
                            status={target.status} start_date={target.start_date} end_date={target.end_date}
                            update_at={target.last_update} progress={target.progress} functional_group={target.functional_group}
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