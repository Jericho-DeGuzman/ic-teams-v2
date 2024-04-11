import { updateTarget, updateTargetStatus } from "@/app/redux/features/targets";
import { useAppDispatch } from "@/app/redux/hooks";
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

export default function UpdateTargetStatusButton({ uuid, status }) {
    const [visible, setVisible] = useState(false);
    const dispatch = useAppDispatch();

    const handleClickOutside = () => {
        setVisible(false);
    };

    const handleUpdateStatus = async (new_status) => {
        setVisible(false)
        const prevStatus = status;

        let name = '';
        let color = '';

        switch(new_status) {
            case 'pending' : name = 'PENDING';  color='#bab6b3';
                break;
            case 'ongoing': name = 'ONGOING'; color = '#3b82f6';
                break;
            case 'completed': name = 'COMPLETED'; color='#22c55e';
                break;
            case 'onhold': name = 'ON HOLD'; color='#edb62b';
                break;
        }

        try {
            dispatch(updateTargetStatus({uuid, status: new_status, name, color}))

            const response = await fetch(`/api/target-statuses?uuid=${uuid}`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(new_status)
            })

            const result = await response.json();
            if(result?.status !== 200) throw new Error(result?.status)

        } catch (error) {
            console.log(error)
            dispatch(updateTargetStatus({uuid, status: prevStatus}))
        }
    }

    

    return (
        <OutsideClickListener onOutsideClick={handleClickOutside}>
            <div className="dropdown dropdown-bottom w-full">
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
                        {status !== 'ongoing' && (
                            <li>
                                <button className="px-2 py-1" onClick={() => handleUpdateStatus('ongoing')}>Mark as On Going</button>
                            </li>
                        )}
                        {status !== 'completed' && (
                            <li>
                                <button className="px-2 py-1" onClick={() => handleUpdateStatus('completed')}>Mark as Completed</button>
                            </li>
                        )}
                        {status !== 'onhold' && (
                            <li>
                                <button className="px-2 py-1" onClick={() => handleUpdateStatus('onhold')}>Mark as On Hold</button>
                            </li>
                        )}
                    </ul>
                )}
            </div>
        </OutsideClickListener>
    );
}
