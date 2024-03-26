'use client'
import { useRouter, useSearchParams } from "next/navigation"

export default function PaginationButton() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const page = searchParams.get('page') ?? '1';

    return (
        <div className='join grid grid-cols-2 w-4/12 text-gray-400'>
            <button className='join-item p-2 border-[1px] rounded-l-md 
                    border-gray-400 hover:bg-blue-500 hover:border-blue-500 duration-300
                        hover:text-white' onClick={() => {
                        if (page <= 1) {
                            return router.push(`?page=1`);
                        }
                        router.push(`?page=${Number(page) - 1}`)
                }}>
                Previous page</button>
            <button className='join-item p-2 border-[1px] rounded-r-md 
                    border-gray-400 hover:bg-blue-500 hover:border-blue-500 duration-300
                        hover:text-white' onClick={() => router.push(`?page=${Number(page) + 1}`)}>Next page</button>
        </div>
    )
}