import TargetSummmaryCard from "@/app/components/card/targetSummaryCard";
import { faCalendar, faCheck, faCheckCircle, faHand, faPersonRunning } from "@fortawesome/free-solid-svg-icons";


const defaultValue = [
    {
        id: 0,
        title: 'Pending',
        icon: faCalendar,
        type: 'pending'
    }, 
    {
        id: 1, 
        title: 'Ongoing',
        icon: faPersonRunning,
        type: 'ongoing'
    },
    {
        id: 2,
        title: 'Completed',
        icon: faCheckCircle,
        type: 'completed'
    },
    {
        id: 3,
        title: 'Onhold',
        icon: faHand,
        type: 'onhold'
    }
]

export default function TargetSummaryPage() {
    return (
        <div className="w-full grid grid-cols-4 gap-2">
            {defaultValue.map((card) => (
                <TargetSummmaryCard key={card.id} icon={card.icon} title={card.title} type={card.type} />
            ))}
        </div>
    )
}