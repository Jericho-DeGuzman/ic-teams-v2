export default function LinearProgress({ status, progress }) {
    return (
        <div role="progressbar" className="linearProgress" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{ "--value": progress, "--fg": status }} />
    )
}