export default function TargetTypeLabel({ type }) {
    return (
        <span className={`text-white rounded-sm px-2 ${type == 1 ? 'bg-blue-500' : 'bg-orange-500'}`}>
            {type == 1 ? (
                <>INTERNAL</>
            ) : (
                <>EXTERNAL</>
            )}
        </span>
    )
}