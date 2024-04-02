import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

const OutsideClickListener = ({ children, onOutsideClick }) => {
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                onOutsideClick();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onOutsideClick]);

    return <div ref={wrapperRef}>{children}</div>;
};

export default function UpdateTargetStatusButton() {
    const [visible, setVisible] = useState(false);

    const handleClickOutside = () => {
        setVisible(false);
    };

    return (
        <OutsideClickListener onOutsideClick={handleClickOutside}>
            <div className="dropdown dropdown-right w-full">
                <li>
                    <button
                        onClick={() => setVisible(!visible)}
                        className='px-2 py-1 flex items-center text-gray-400
                            hover:bg-gray-200 hover:text-blue-400 cursor-pointer rounded-md duration-300'
                    >
                        <FontAwesomeIcon icon={faArrowsRotate} className="w-3 h-3" />Update Status
                    </button>
                </li>
                {visible && (
                    <ul className="dropdown-content bg-white z-[1] menu p-2 rounded-md w-44 text-[12px] border-[1px] border-gray-200 text-gray-400">
                        <li>
                            <button className="px-2 py-1">On Going</button>
                        </li>
                        <li>
                            <button className="px-2 py-1">Completed</button>
                        </li>
                        <li>
                            <button className="px-2 py-1">On Hold</button>
                        </li>
                    </ul>
                )}
            </div>
        </OutsideClickListener>
    );
}
