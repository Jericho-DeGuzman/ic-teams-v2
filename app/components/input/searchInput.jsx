import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function SearchInput({placeholder}) {
    return (
        <div className='w-full flex border-[1px] border-gray-300 p-1 rounded-md gap-1 
                    focus-within:border-blue-500 duration-200 focus-within:border-2'>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='p-2 h-3 w-3' />
            <input type='text' className='bg-transparent w-10/12 outline-none border-l-[1px] border-gray-300 p-1 text-black'
                placeholder={placeholder} />
        </div>
    )
}