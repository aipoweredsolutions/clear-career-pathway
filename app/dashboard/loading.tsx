export default function DashboardLoading() {
    return (
        <div className="min-h-screen bg-neutral-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header skeleton */}
                <div className="flex items-center justify-between mb-12 animate-pulse">
                    <div>
                        <div className="h-8 w-64 bg-neutral-200 rounded-xl mb-3" />
                        <div className="h-5 w-48 bg-neutral-100 rounded-lg" />
                    </div>
                    <div className="h-12 w-40 bg-primary-100 rounded-xl" />
                </div>

                {/* Cards grid skeleton */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
                            <div className="aspect-[210/297] bg-neutral-100 rounded-xl mb-4" />
                            <div className="h-5 w-3/4 bg-neutral-100 rounded-lg mb-2" />
                            <div className="h-4 w-1/2 bg-neutral-50 rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
