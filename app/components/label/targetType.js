export default function TargetTypeLabel({type}) {
    return (
        <span className={`text-white rounded-sm px-2 ${type == 'internal' ? 'bg-blue-500' : 'bg-orange-500'}`}>
            {type == 'internal' ? (
                <>INTERNAL</>
            ) : (
                <>EXTERNAL</>
            )}
        </span>
    )
}