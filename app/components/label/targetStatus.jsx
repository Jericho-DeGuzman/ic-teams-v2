import { faCalendar, faCheck, faHand, faRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TargetStatusLabel({ status }) {
    let icon;

    switch (status?.machine_name) {
        case 'pending': icon = faCalendar;
            break;
        case 'ongoing': icon = faRunning;
            break;
        case 'onhold': icon = faHand;
            break
        case 'completed': icon = faCheck;
            break;
        default : icon = faCalendar;
            break;
    }

    return (
        <span className={`px-2 flex items-center text-white gap-1 rounded-sm`} style={{backgroundColor: status?.color || '#bab6b3'}}>
            <FontAwesomeIcon icon={icon} />
            <span>
                {status?.name || 'PENDING'}
            </span>
        </span>
    )
}