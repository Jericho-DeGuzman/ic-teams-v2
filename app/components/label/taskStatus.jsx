import { faCalendar, faCheck, faClipboard, faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TaskStatusLabel({status}) {
    let icon;

    switch(status.machine_name) {
        case 'todo': icon = faCalendar;
            break;
        case 'inprogress': icon = faPersonRunning;
            break;
        case 'review': icon = faClipboard;
            break;
        case 'done': icon = faCheck;
            break
    }

    return (
        <div className="flex flex-col">
            <label className="p-1">Status</label>
            <div className="w-full py-2 px-1 rounded-md">
                <div className={`w-6/12 p-[3px] flex items-center justify-center text-white rounded-sm gap-1`} style={{backgroundColor: status?.color}}>
                    <FontAwesomeIcon icon={icon} className="w-3 h-3" />
                    <span className="flex items-center justify-center">
                        {status.name}
                    </span>
                </div>
            </div>
        </div>
    )
}