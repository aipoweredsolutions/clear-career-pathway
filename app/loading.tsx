export default function HomeLoading() {
    return (
        <div className="min-h-screen font-sans relative">
            {/* Hero skeleton */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-neutral-950 pt-32 pb-40">
                <div className="relative max-w-7xl mx-auto px-6 lg:px-12 z-10 w-full mt-8">
                    <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-center">
                        <div className="lg:col-span-7 flex flex-col gap-8 animate-pulse">
                            <div className="h-8 w-64 bg-white/5 rounded-full" />
                            <div className="space-y-4">
                                <div className="h-16 w-3/4 bg-white/5 rounded-2xl" />
                                <div className="h-16 w-1/2 bg-white/5 rounded-2xl" />
                            </div>
                            <div className="h-6 w-full max-w-xl bg-white/5 rounded-xl" />
                            <div className="h-6 w-3/4 max-w-xl bg-white/5 rounded-xl" />
                            <div className="flex gap-5 mt-4">
                                <div className="h-16 w-48 bg-primary-600/30 rounded-2xl" />
                                <div className="h-16 w-40 bg-white/5 rounded-2xl" />
                            </div>
                        </div>
                        <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
                            <div className="w-full max-w-[420px] aspect-[21/29.7] bg-white/5 rounded-2xl animate-pulse" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Content skeleton */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
                    <div className="text-center mb-20">
                        <div className="h-10 w-96 bg-neutral-100 rounded-xl mx-auto mb-6" />
                        <div className="h-6 w-80 bg-neutral-50 rounded-lg mx-auto" />
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="p-10 rounded-3xl bg-neutral-50 h-72" />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
