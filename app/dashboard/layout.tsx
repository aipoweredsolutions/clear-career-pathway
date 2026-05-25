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
    { label: 'Job Tracker', href: '/tracker', icon: Target },
]

const CAREER_TOOLS = [
    { label: 'Interview Prep', href: '/career-tools/interview', icon: MessageSquare, color: 'text-blue-600' },
    { label: 'Salary Negotiator', href: '/career-tools/salary', icon: DollarSign, color: 'text-emerald-600' },
    { label: 'LinkedIn Pro', href: '/career-tools/linkedin', icon: Linkedin, color: 'text-sky-600' },
    { label: 'Career Roadmap', href: '/career-tools/roadmap', icon: MapIcon, color: 'text-indigo-600' },
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

                        {/* Career Tools */}
                        <div>
                            <div className="flex items-center justify-between mb-4 px-4">
                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Career Hub</p>
                                <Sparkles className="w-3 h-3 text-primary-500 animate-pulse" />
                            </div>
                            <nav className="space-y-1">
                                {CAREER_TOOLS.map((tool) => (
                                    <Link 
                                        key={tool.href} 
                                        href={tool.href}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 transition-all group"
                                    >
                                        <tool.icon className={`w-5 h-5 ${tool.color} group-hover:scale-110 transition-transform`} />
                                        {tool.label}
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

                {/* Sidebar Footer */}
                <div className="p-6 border-t border-neutral-100">
                    <Link 
                        href="/career-tools"
                        className="flex flex-col gap-3 p-4 rounded-2xl bg-neutral-900 text-white hover:bg-neutral-800 transition-all group shadow-xl shadow-neutral-200"
                    >
                        <div className="flex items-center justify-between">
                            <Sparkles className="w-5 h-5 text-primary-400" />
                            <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest">Full Access</p>
                            <p className="text-sm font-bold mt-1">Open Career Intelligence Hub</p>
                        </div>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 w-full overflow-x-hidden">
                {children}
            </main>
        </div>
    )
}
