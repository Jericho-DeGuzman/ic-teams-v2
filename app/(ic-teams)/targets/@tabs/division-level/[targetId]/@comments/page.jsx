'use client'
import CommentCard from "@/app/components/card/commentCard";
import { ICLogo, Wrong } from "@/utils/imageUtils";
import { faChevronDown, faChevronUp, faComment, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";

//TODO: make the comment appear quickly using lazy loading approach.

export default function CommentPage({ params }) {
    const [showComments, setShowComment] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const loadComments = async () => {
            const at = Cookies.get('at');
            try {
                const response = await fetch(`/api/target-comments?uuid=${params.targetId}`, {
                    method: 'get',
                    headers: { 'at': at }
                })

                const result = await response.json();
                if (result?.status !== 200) throw new Error(result.status);
                setComments(result?.data.reverse());
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        loadComments();
    }, [showComments])


    const handleNewComments = (ev) => {
        const { value } = ev.target;
        setNewComment(value);
    }

    const submitNewComment = async (ev) => {
        if (newComment == '') return;

        try {
            const response = await fetch('/api/target-comments', {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    target_uuid: params.targetId,
                    comment: newComment
                })
            })

            const result = await response.json();
            if (result?.status !== 200) throw new Error(result?.status);
            setComments([...comments, result?.data]);
        } catch (error) {
            setError(true);
        } finally {
            setNewComment('')
        }
    }

    return (
        <section className="w-full border-[1px] border-gray-400 text-[12px] mt-2">
            <header className="flex justify-between items-center p-2 cursor-pointer" onClick={() => setShowComment(!showComments)}>
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
            {error ? (
                <div className="w-full h-[300px] flex flex-col items-center justify-center space-y-2">
                    <Image src={Wrong} height={32} width={32} alt="image.png" />
                    <div className="space-y-1">
                        <h2 className="text-[16px] font-semibold">Oops! Something went wrong</h2>
                        <div className="flex gap-1 justify-center items-center">
                            <Image src={ICLogo} height={16} width={16} />
                            <p className="text-[12px] italic">Insurance Commission.</p>
                        </div>
                    </div>
                </div>
            ) : (
                showComments && (
                    <>
                        {loading ? (
                            <div className="w-full h-[300px] space-y-2 p-2 border-y-[1px] border-gray-400">
                                <div className="w-full h-11 bg-gray-200 animate-pulse rounded-md"/>
                                <div className="w-full h-11 bg-gray-200 animate-pulse rounded-md"/>
                                <div className="w-full h-11 bg-gray-200 animate-pulse rounded-md"/>
                            </div>
                        ) : (
                            comments.length > 0 ? (
                                <div className="border-y-[1px] p-2 border-gray-400 space-y-2 max-h-[300px] min-h-[300px] overflow-y-scroll">
                                    {comments.map((comment, index) => (
                                        <CommentCard key={index} username={`${comment.created_by_person.first_name} ${comment.created_by_person.middle_name} ${comment.created_by_person.last_name}`}
                                            comment={comment.comment} date={comment.created_at} />
                                    ))}
                                </div>
                            ) : (
                                <div className="w-full flex items-center justify-center max-h-[300px] min-h-[300px] border-y-[1px] p-2 border-gray-400 italic">
                                    no comments found
                                </div>
                            )
                        )}
                        <div className="w-full grid grid-cols-12 p-2">
                            <div className="col-span-11">
                                <textarea value={newComment} placeholder="Aa" className="w-full p-2 outline-none resize-none bg-white text-black" onChange={handleNewComments} />
                            </div>
                            {newComment != '' && (
                                <div className="col-span-1 flex items-center justify-center">
                                    <button className="flex items-center justify-center bg-blue-500 rounded-full p-2 hover:bg-blue-600" onClick={submitNewComment}>
                                        <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4 text-white" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )
            )}
        </section>
    )
}