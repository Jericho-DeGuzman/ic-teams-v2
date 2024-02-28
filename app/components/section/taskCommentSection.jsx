'use client'
import { useState } from "react";

const commentInitialState = {
    author: '',
    content: '',
}

export default function TaskCommentSection() {
    const [comments, setComments] = useState([]);
    const [newComments, setNewComments] = useState(commentInitialState);
    const [focus, setFocus] = useState(false);

    const inputChangeHandler = (ev) => {
        const { value } = ev.target;
        setNewComments((prev) => ({
            ...prev,
            content: value,
        }))
    }

    // TODO: integrate IC api and save comment
    const onSendHandler = () => {
        if (newComments.content == '') return;
        setComments([...comments, newComments])
        setNewComments(commentInitialState);
    }

    return (
        <>
            {!comments.length ? (
                <div className="flex items-center italic text-gray-400 justify-center flex-1">
                    No comments found.
                </div>
            ) : (
                <div className="w-full items-center flex-1 p-2 text-[10px]">
                    {comments.map((comment, index) => (
                        <div className="w-full p-2 bg-gray-200 space-y-1 rounded-md" key={index}>
                            <div className="w-full flex justify-between">
                                <span className="font-semibold">Jericho M. De Guzman</span>
                                <span className="text-gray-400">Feb 27 2024</span>
                            </div>
                            <p>
                                {comment.content}
                            </p>
                        </div>
                    ))}
                </div>
            )}
            <div className="mt-auto p-2">
                <div className="w-full rounded-sm shadow-sm border-[1px] border-gray-300">
                    <textarea placeholder="Aa" className="w-full bg-transparent outline-none resize-none p-2 h-8"
                        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} defaultValue={newComments.content} value={newComments.content}
                        onChange={inputChangeHandler} />
                    {newComments.content != '' && (
                        <div className="w-full flex justify-end p-2">
                            <button className="p-1 bg-blue-500 text-white rounded-md"
                                onClick={onSendHandler}>Send</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}