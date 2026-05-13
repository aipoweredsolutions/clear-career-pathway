'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
    LayoutDashboard, 
    Users, 
    FileText, 
    Settings, 
    Shield, 
    BarChart3, 
    Target,
    LogOut,
    ArrowLeft,
    Package
} from 'lucide-react'
import { cn } from '@/lib/utils'

const ADMIN_LINKS = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Blog Management', href: '/admin/blog', icon: FileText },
    { name: 'Templates', href: '/admin/templates', icon: Package },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'System Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-72 bg-neutral-950 text-white flex flex-col shrink-0">
            {/* Logo area */}
            <div className="p-8 border-b border-white/5">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                        <Target className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-black tracking-tighter leading-none">Admin Portal</span>
                        <span className="text-[9px] font-black text-primary-500 uppercase tracking-[0.2em] mt-1">Clear Career Path</span>
                    </div>
                </Link>
            </div>

            {/* Nav links */}
            <nav className="flex-1 p-6 space-y-2">
                <p className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] mb-4 px-2">Main Controls</p>
                {ADMIN_LINKS.map((link) => {
                    const active = pathname === link.href
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group",
                                active 
                                    ? "bg-primary-600 text-white shadow-lg shadow-primary-900/20" 
                                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <link.icon className={cn("w-5 h-5", active ? "text-white" : "text-neutral-500 group-hover:text-primary-400")} />
                            {link.name}
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom area */}
            <div className="p-6 border-t border-white/5 space-y-2">
                <Link 
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
                >
                    <ArrowLeft className="w-5 h-5 text-neutral-500" />
                    Back to App
                </Link>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-danger-500 hover:bg-danger-500/10 transition-all">
                    <LogOut className="w-5 h-5" />
                    Exit Portal
                </button>
            </div>
        </aside>
    )
}
