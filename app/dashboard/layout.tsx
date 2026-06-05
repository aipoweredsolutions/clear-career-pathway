import React from 'react'
import Link from 'next/link'
import { 
    LayoutDashboard, 
    FileText, 
    Target, 
    Users, 
    CreditCard, 
    Sparkles, 
    Zap,
    MessageSquare,
    DollarSign,
    Linkedin,
    Map as MapIcon,
    ArrowRight
} from 'lucide-react'

const NAV_ITEMS = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Documents', href: '/dashboard#documents', icon: FileText },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-neutral-50 pt-20">
            {/* Sidebar */}
            <aside className="w-72 border-r border-neutral-200 bg-white hidden lg:flex flex-col sticky top-20 h-[calc(100vh-5rem)]">
                <div className="p-6 flex-1 overflow-y-auto">
                    <div className="space-y-8">
                        {/* Main Nav */}
                        <div>
                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4 px-4">Main Menu</p>
                            <nav className="space-y-1">
                                {NAV_ITEMS.map((item) => (
                                    <Link 
                                        key={item.href} 
                                        href={item.href}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 transition-all group"
                                    >
                                        <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Account Quick Links */}
                        <div>
                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4 px-4">Workspace</p>
                            <nav className="space-y-1">
                                <Link 
                                    href="/account"
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 transition-all group"
                                >
                                    <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    Account & Credits
                                </Link>
                                <Link 
                                    href="/pricing"
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 transition-all group"
                                >
                                    <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    Upgrade Plan
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 w-full overflow-x-hidden">
                {children}
            </main>
        </div>
    )
}
