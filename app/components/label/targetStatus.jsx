import { faCalendar, faCheck, faHand, faRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TargetStatusLabel({ status }) {
    let icon;

    switch (status) {
        case 'pending': icon = faCalendar;
            break;
        case 'ongoing': icon = faRunning;
            break;
        case 'onhold': icon = faHand;
            break
        case 'completed': icon = faCheck;

    }

    return (
        <span className={`${status == 'ongoing' && 'bg-green-400'} 
                ${status == 'pending' && 'bg-yellow-400'}
                ${status == 'onhold' && 'bg-zinc-400'}
                ${status == 'completed' && 'bg-green-500'}
                px-2 flex items-center text-white gap-1 rounded-sm`}>
            <FontAwesomeIcon icon={icon} />
            <span>
                {status.toUpperCase()}
            </span>
        </span>
    )
}