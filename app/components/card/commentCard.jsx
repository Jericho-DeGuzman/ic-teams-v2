import formatDate from "@/utils/formatDate";
import formatDateTime from "@/utils/formatDateTime";

export default function CommentCard({username, date, comment}) {
    return (
        <section className="w-full rounded-md p-2 text-[12px] bg-gray-200 text-black">
            <div className="flex w-full justify-between items-center ">
                <span className="font-semibold">{username}</span>
                <span className="text-[10px] text-gray-400">• {formatDate(date)}</span>
            </div>
            <div className="w-full" dangerouslySetInnerHTML={{__html: comment}}/>
        </section>
    )
}