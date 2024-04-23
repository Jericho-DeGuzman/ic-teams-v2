export default function RadialProgress({ status, progress }) {
    let color;

    switch (status) {
        case 'pending': color = '#facc15';
            break;
        case 'ongoing': color = '#4ade80';
            break;
        case 'onhold': color = '#a1a1aa';
            break;
        case 'completed': color = '#22c55e'
            break;
    }

    return (
        <div role="progressbar" className="radialProgress" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{ "--value": progress, "--fg": status }} />
    )
}