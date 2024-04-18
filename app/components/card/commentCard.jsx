import formatDate from "@/utils/formatDate";
import formatDateTime from "@/utils/formatDateTime";

export default function CommentCard({ username, date, comment }) {
    return (
        <section className="w-full rounded-md p-2 text-[12px] bg-gray-200 text-black space-y-1">
            <div className="font-bold">{username}</div>
            <div className="w-full" dangerouslySetInnerHTML={{ __html: comment }} />
            <div className="text-[10px] text-gray-400 w-full flex justify-end">{formatDateTime(date)}</div>
        </section>
    )
}