export default function CommissionTargetLayout({ children, title, overview, comments, tabs }) {
    
    return (
        <section className="w-full min-h-screen p-4 space-y-2">
            <header className="w-full">
                {title}
            </header>
            <div className="w-full min-h-screen flex gap-2">
                <aside className="w-3/12 flex flex-col min-h-screen">
                    <div className="w-full">
                        {overview}
                    </div>
                    <div className="w-full mt-auto">
                        {comments}
                    </div>
                </aside>
                <main className="min-h-screen flex-1">
                    {tabs}
                </main>
            </div>
        </section>
    )
}