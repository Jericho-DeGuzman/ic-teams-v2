export default function TaskLoading() {
    return (
        <div className="w-full min-h-screen gap-2 p-2">
            <div className="w-full space-y-3 min-h-screen">
                <div className="h-8 rounded-t-md w-full animate-pulse bg-gray-300" />
                <div className="h-10 rounded-md w-full animate-pulse bg-gray-300" />
                <div className="h-10 rounded-md w-full animate-pulse bg-gray-300" />
                <div className="h-10 rounded-md w-full animate-pulse bg-gray-300" />
                <div className="h-10 rounded-md w-full animate-pulse bg-gray-300" />
            </div>
        </div>
    )
}