'use client'
import CommentCard from "@/app/components/card/commentCard";
import { faChevronDown, faChevronUp, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function CommentPage({ params }) {
    const [showComments, setShowComment] = useState(false);

    return (
        <section className="w-full border-[1px] border-gray-400 text-[12px] mt-2">
            <header className="flex justify-between items-center p-2" onClick={() => setShowComment(!showComments)}>
                <div className="flex w-fullitems-center gap-1 font-semibold text-black">
                    <FontAwesomeIcon icon={faComment} className="w-4 h-4" />
                    <p>Comments</p>
                </div>
                {!showComments ? (
                    <div className="p-1 flex items-center cursor-pointer text-gray-400 hover:bg-gray-200 hover:text-blue-500 
                    rounded-md" onClick={() => setShowComment(true)}>
                        <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4" />
                    </div>
                ) : (
                    <div className="p-1 flex items-center cursor-pointer text-gray-400 hover:bg-gray-200 hover:text-blue-500 
                    rounded-md" onClick={() => setShowComment(false)}>
                        <FontAwesomeIcon icon={faChevronUp} className="h-4 w-4" />
                    </div>
                )}
            </header>
            {showComments && (
                <>
                    <div className="border-y-[1px] p-2 border-gray-400 space-y-2 max-h-[300px] overflow-y-scroll">
                        <CommentCard username={'Jericho De Guzman'} date={'2024-04-11T03:28:48.000000Z'} comment={"the quick brown fox"} />
                    </div>
                    <div className="w-full">
                        <textarea placeholder="Aa" className="w-full p-2 outline-none resize-none bg-white text-black" />
                    </div>
                </>
            )}
        </section>
    )
}