'use client'
import formatDate from "@/utils/formatDate";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";



export default function TaskCommentSection({ uuid }) {
    const [comments, setComments] = useState([]);
    const [newComments, setNewComments] = useState('');
    const [focus, setFocus] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        const at = Cookies.get('at');

        const loadComments = async () => {
            try {
                const response = await fetch(`/api/tasks-comments?uuid=${uuid}`, {
                    method: 'get',
                    headers: { 'at': at }
                })

                const result = await response.json();

                if (result?.status !== 200) throw new Error(result?.message);
                setComments(result?.data.reverse())
            } catch (error) {
               setError(true);
            }
        }

        loadComments();
    }, [uuid])

    const inputChangeHandler = (ev) => {
        const { value } = ev.target;
        setNewComments(value)
    }

    // TODO: integrate IC api and save comment
    const onSendHandler = async () => {
        if (newComments == '') return;
        try {
            const response = await fetch('/api/tasks-comments', {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    task_uuid: uuid,
                    comment: newComments
                })
            })

            const result = await response.json();
            if (result?.status !== 200) throw new Error(result?.status);
            setComments([...comments, result?.data]);
        } catch (error) {
            setError(true);
        } finally {
            setNewComments('')
        }
    }

    return (
        <>
            {!comments.length ? (
                <div className="flex items-center italic text-gray-400 justify-center flex-1">
                    No comments found.
                </div>
            ) : (
                <div className="w-full items-center flex-1 p-2 text-[10px] space-y-2">
                    {comments.map((comment, index) => (
                        <div className="w-full p-2 bg-gray-200 space-y-1 rounded-md" key={index}>
                            <div className="w-full flex justify-between">
                                <span className="font-semibold">{`${comment.created_by_person.first_name} ${comment.created_by_person.middle_name} ${comment.created_by_person.last_name}`}</span>
                                <span className="text-gray-400">{formatDate(comment.created_at)}</span>
                            </div>
                            <p dangerouslySetInnerHTML={{__html: comment.comment}}/>
                        </div>
                    ))}
                </div>
            )}
            <div className="mt-auto p-2">
                <div className="w-full grid grid-cols-12 p-2 rounded-sm shadow-sm border-[1px] border-gray-300">
                    {/* <textarea placeholder="Aa" className="w-full bg-transparent outline-none resize-none p-2 h-8"
                        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} defaultValue={newComments.content} value={newComments.content}
                        onChange={inputChangeHandler} /> */}
                    <div className="col-span-10">
                        <textarea value={newComments} placeholder="Aa" className="w-full p-2 outline-none resize-none bg-white text-black" onChange={inputChangeHandler} />
                    </div>
                    {newComments != '' && (
                        <div className="col-span-2 flex items-center justify-center">
                            <button className="flex items-center justify-center bg-blue-500 rounded-full p-2 hover:bg-blue-600" onClick={onSendHandler}>
                                <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4 text-white" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}