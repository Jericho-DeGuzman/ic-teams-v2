'use client'
import { useState } from "react"

export default function CommentInput(value, onchange, onsend) {
    const [focus, setFocus] = useState(false)

    return (
        <div className="mt-auto p-2">
            <div className="w-full rounded-sm shadow-sm border-[1px] border-gray-300">
                <textarea placeholder="Aa" className="w-full bg-transparent outline-none resize-none p-2 h-8" 
                    onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} 
                    />
                {focus && (
                    <div className="w-full flex justify-end p-2">
                        <button className="p-1 bg-blue-500 text-white rounded-md"
                            onClick={onsend}>Send</button>
                    </div>
                )}
            </div>
        </div>
    )
}