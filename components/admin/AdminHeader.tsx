'use client'

import React from 'react'
import { Bell, Search, User, ChevronDown } from 'lucide-react'

export function AdminHeader() {
    return (
        <header className="h-20 bg-white border-b border-neutral-200 px-8 flex items-center justify-between sticky top-0 z-30">
            {/* Search Bar */}
            <div className="relative w-96 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search users, records, or logs..."
                    className="w-full pl-11 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
                <button className="relative p-2 text-neutral-400 hover:text-neutral-900 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary-600 rounded-full border-2 border-white" />
                </button>

                <div className="h-8 w-px bg-neutral-200" />

                <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-all">
                    <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-white text-xs font-black">
                        AD
                    </div>
                    <div className="flex flex-col items-start pr-1">
                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-tighter leading-none">Super Admin</span>
                        <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-neutral-900">Developer</span>
                            <ChevronDown className="w-3 h-3 text-neutral-500" />
                        </div>
                    </div>
                </button>
            </div>
        </header>
    )
}
