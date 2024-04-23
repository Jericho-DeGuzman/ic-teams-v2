import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RadialProgress from "../progress/radialProgress";
import TargetTypeLabel from "../label/targetType";
import TargetStatusLabel from "../label/targetStatus";
import formatDate from "@/utils/formatDate";
import formatDateTime from "@/utils/formatDateTime";
import Link from "next/link";
import WatchlistButton from "../button/watchlist";
import MoreButton from "../button/moreButton";
import { memo } from "react";
import BannerButton from "../button/bannerButton";

const TargetCard = memo(({ uuid, title, type, category, description, status, start_date, end_date, update_at, progress,
    functional_group, watchlist, ondelete, permissions, level }) => {
        
    const functional = [];

    functional_group.map((group) => {
        if (functional.indexOf(group.parent?.short_name) == -1) functional.push(group.parent?.short_name);
    })

    return (
        <section className='w-full border-[1px] rounded-md text-black
            hover:border-blue-500 hover:scale-[1.03] duration-300 cursor-pointer'>
            <header className='flex p-2 items-center justify-between border-b-[1px]'>
                <div className='flex items-center gap-1'>
                    <WatchlistButton key={'watchlist-button'} visible={watchlist} />
                    <BannerButton key={'banner-button'} visible={permissions.includes('target.banner.create')}/>
                    <TargetTypeLabel key={type} type={type} />
                </div>
                <MoreButton uuid={uuid} ondelete={ondelete} permissions={permissions} status={status?.machine_name} />
            </header>
            <Link href={`/targets/${level}/${uuid}`}>
                <main className='p-2 space-y-1'>    
                    <span className='line-clamp-1 text-[14px] font-semibold w-full' dangerouslySetInnerHTML={{ __html: title }} />
                    <p className='text-gray-400 line-clamp-2 w-full' dangerouslySetInnerHTML={{ __html: description }} />
                    <div className='w-full flex gap-2 text-[12px]'>
                        <div className='p-2 border-[1px] rounded-md w-4/12 flex justify-center items-center'>
                            <RadialProgress key={progress} status={status?.color || '#bab6b3'} progress={Math.floor(progress)} />
                        </div>
                        <div className='flex-1 space-y-1 p-2'>
                            <div className="w-full flex gap-1">
                                <span className="font-semibold">Status:</span>
                                <TargetStatusLabel key={status?.uuid || ''} status={status} />
                            </div>
                            <div className='w-full flex gap-1'>
                                <span className='font-semibold'>Category: </span>
                                <span className=''>{category?.name}</span>
                            </div>
                            <div className="w-full flex gap-1">
                                <span className="font-semibold">Functional Group: </span>
                                <div className="flex gap-1">
                                    {functional.map((group, index) => (
                                        <span key={index} className="">{group}</span>
                                    ))}
                                </div>
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
})

TargetCard.displayName = 'TargetCard';
export default TargetCard;