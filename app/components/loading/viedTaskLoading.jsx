export default function ViewTaskLoading() {
    return (
        <div className="w-full grid grid-cols-6 p-4 gap-2">
            <div className="col-span-4 space-y-2">
                <div className="w-6/12 h-10 bg-gray-200 animate-pulse duration-300" />
                <div className="w-full grid grid-cols-3 gap-2">
                    <div className="col-span-1 space-y-1">
                        <div className="w-6/12 h-4 bg-gray-200 animate-pulse duration-300"/>
                        <div className="w-full h-8 bg-gray-200 animate-pulse duration-300"/>
                    </div>
                    <div className="col-span-1 space-y-1">
                        <div className="w-6/12 h-4 bg-gray-200 animate-pulse duration-300"/>
                        <div className="w-full h-8 bg-gray-200 animate-pulse duration-300"/>
                    </div>
                    <div className="col-span-1 space-y-1">
                        <div className="w-6/12 h-4 bg-gray-200 animate-pulse duration-300"/>
                        <div className="w-full h-8 bg-gray-200 animate-pulse duration-300"/>
                    </div>
                </div>
                <div className="w-full bg-gray-200 animate-pulse duration-300 h-24"/>
                <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1 h-8 bg-gray-200 duration-300 animate-pulse" />
                    <div className="col-span-1 h-8 bg-gray-200 duration-300 animate-pulse" />
                </div>
                <div className="w-full bg-gray-200 animate-pulse duration-300 h-8"/>
                <div className="w-full bg-gray-200 animate-pulse duration-300 h-24"/>
                <div className="w-full bg-gray-200 animate-pulse duration-300 h-8"/>
            </div>
            <div className="col-span-2">
                <div className="h-full flex flex-1 bg-gray-200 animate-pulse duration-300" />
            </div>
        </div>
    )
}