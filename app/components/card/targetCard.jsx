import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faClockRotateLeft, faEllipsis, faRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RadialProgress from "../progress/radialProgress";
import TargetTypeLabel from "../label/targetType";
import TargetStatusLabel from "../label/targetStatus";
import formatDate from "@/utils/formatDate";
import formatDateTime from "@/utils/formatDateTime";
import Link from "next/link";
import WatchlistButton from "../button/watchlist";

export default function TargetCard({ uuid, title, type, category, description, status, start_date, end_date, update_at, progress,
    functional_group, watchlist }) {
    return (
        <section className='w-full border-[1px] rounded-md text-black
            hover:border-blue-500 hover:scale-[1.03] duration-300 cursor-pointer'>
            <header className='flex p-2 items-center justify-between border-b-[1px]'>
                <div className='flex items-center gap-1'>
                    <WatchlistButton key={'watchlist-button'} visible={watchlist} />
                    <TargetTypeLabel key={type} type={type} />
                </div>
                <button className='p-1 flex items-center text-gray-400
               hover:bg-gray-200 hover:text-blue-400 cursor-pointer rounded-md duration-300'>
                    <FontAwesomeIcon icon={faEllipsis} className='w-4 h-4' />
                </button>
            </header>
            <Link href={`/targets/commission-level/${uuid}`}>
                <main className='p-2 space-y-1'>
                    <span className='line-clamp-1 text-[14px] font-semibold w-full'>
                        {title}
                    </span>
                    <p className='text-gray-400 line-clamp-2 w-full'>
                        {description}
                    </p>
                    <div className='w-full flex gap-2 text-[12px]'>
                        <div className='p-2 border-[1px] rounded-md w-4/12 flex justify-center items-center'>
                            <RadialProgress key={progress} status={status.color} progress={progress} />
                        </div>
                        <div className='flex-1 space-y-1 p-2'>
                            <div className="w-full flex gap-1">
                                <span className="font-semibold">Status:</span>
                                <TargetStatusLabel key={status.uuid} status={status} />
                            </div>
                            <div className='w-full flex gap-1'>
                                <span className='font-semibold'>Category: </span>
                                <span className=''>{category}</span>
                            </div>
                            <div className="w-full flex gap-1">
                                <span className="font-semibold">Functional Group: </span>
                                <span className="">{functional_group}</span>
                            </div>
                            <div className='w-full flex gap-1'>
                                <span className='font-semibold'>Start Date:</span>
                                <span className=''>{formatDate(start_date)}</span>
                            </div>
                            <div className='w-full flex gap-1'>
                                <span className='font-semibold'>End Date:</span>
                                <span className=''>{formatDate(end_date)}</span>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className='w-full px-2 py-1 border-t-[1px] flex items-center gap-1 text-gray-400'>
                    <FontAwesomeIcon icon={faClockRotateLeft} className='w-3 h-3' />
                    <span>Updated at {formatDateTime(update_at)}</span>
                </footer>
            </Link>
        </section>
    );
}