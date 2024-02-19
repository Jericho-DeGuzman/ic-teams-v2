export default function CommentCard() {
    return (
        <section className="w-full rounded-md p-2 text-[12px] bg-gray-200 text-black">
            <div className="flex w-full justify-between items-center ">
                <span className="font-semibold">Jericho De Guzman</span>
                <span className="text-[10px] text-gray-400">• Dec 03, 2023</span>
            </div>
            <div className="w-full">
                This is just a sample text.
            </div>
        </section>
    )
}