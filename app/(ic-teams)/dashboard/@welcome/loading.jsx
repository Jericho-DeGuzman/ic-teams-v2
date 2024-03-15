export default function WelcomeLoading() {
    return (
        <div className="w-full flex gap-2 items-center">
            <div className="w-[72px] h-[72px] bg-gray-300 animate-pulse duration-300 rounded-full" />
            <div className="w-10/12 space-y-1">
                <div className="w-10/12 h-8 bg-gray-300 animate-pulse duration-300" />
                <div className="h-4 w-6/12 bg-gray-300 animate-pulse duration-300" />
            </div>
        </div>
    )
}