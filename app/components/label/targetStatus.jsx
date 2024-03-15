import { faCalendar, faCheck, faHand, faRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TargetStatusLabel({ status }) {
    const { machine_name, color, name } = status;

    let icon;

    switch (machine_name) {
        case 'pending': icon = faCalendar;
            break;
        case 'ongoing': icon = faRunning;
            break;
        case 'onhold': icon = faHand;
            break
        case 'completed': icon = faCheck;
    }

    return (
        <span className={`px-2 flex items-center text-white gap-1 rounded-sm`} style={{backgroundColor: color}}>
            <FontAwesomeIcon icon={icon} />
            <span>
                {name}
            </span>
        </span>
    )
}