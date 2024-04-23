'use client'
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import {faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

//TODO: make a function that move the target to watchlist when click.
export default function WatchlistButton({visible}) {
    const [watchlisted, setWatchlisted] = useState(false);

    return (
        visible && (
            <div className={`p-[5px] text-gray-400 hover:bg-gray-200 rounded-md flex items-center cursor-pointer duration-200 
            hover:text-blue-500 tooltip`}
            data-tip="Add to watchlist." onClick={() => setWatchlisted(!watchlisted)}>
            <FontAwesomeIcon icon={watchlisted ? faBookmarkSolid : faBookmark } className={`w-4 h-4 ${watchlisted && 'text-blue-500'}`}/>
        </div>
        )
    );
}