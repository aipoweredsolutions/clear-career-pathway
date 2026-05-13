import React from 'react'
import { 
    Search, 
    Filter, 
    MoreHorizontal, 
    UserPlus, 
    Mail, 
    Calendar,
    BadgeCheck,
    CreditCard,
    ArrowUpRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminUsersPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-neutral-900 tracking-tighter italic">User <span className="text-primary-600">Database.</span></h1>
                    <p className="text-neutral-500 font-medium mt-2">Manage professional profiles, subscriptions, and security credentials.</p>
                </div>
                <button className="btn-premium btn-premium-primary inline-flex items-center gap-2 group">
                    <UserPlus className="w-4 h-4" />
                    Provision User
                </button>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[1.5rem] border border-neutral-200 shadow-sm">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Filter by name, email, or ID..."
                        className="w-full pl-11 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 border border-neutral-200 rounded-xl text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-all">
                        <Filter className="w-4 h-4" />
                        Segment
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 border border-neutral-200 rounded-xl text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-all">
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[2.5rem] border border-neutral-200 shadow-sm overflow-hidden">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-neutral-50/80 border-b border-neutral-100">
                            <th className="px-8 py-5 text-left text-[10px] font-black text-neutral-400 uppercase tracking-widest">Professional Identity</th>
                            <th className="px-8 py-5 text-left text-[10px] font-black text-neutral-400 uppercase tracking-widest">Access Tier</th>
                            <th className="px-8 py-5 text-left text-[10px] font-black text-neutral-400 uppercase tracking-widest">Account Status</th>
                            <th className="px-8 py-5 text-left text-[10px] font-black text-neutral-400 uppercase tracking-widest">Activity</th>
                            <th className="px-8 py-5 text-right text-[10px] font-black text-neutral-400 uppercase tracking-widest">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {[
                            { name: 'Alexander Sterling', email: 'alex@sterling.com', tier: 'Enterprise', status: 'Active', joined: 'Jan 12, 2024', color: 'bg-indigo-500' },
                            { name: 'Sarah Jenkins', email: 'sarah@j.design', tier: 'Pro Monthly', status: 'Active', joined: 'Feb 05, 2024', color: 'bg-emerald-500' },
                            { name: 'Michael Ross', email: 'mike@rosslaw.org', tier: 'Free', status: 'Inactive', joined: 'Mar 15, 2024', color: 'bg-slate-400' },
                            { name: 'David Chen', email: 'd.chen@tech.co', tier: 'Pro Annual', status: 'Past Due', joined: 'Mar 28, 2024', color: 'bg-rose-500' },
                            { name: 'Elena Vance', email: 'elena@vance.io', tier: 'Enterprise', status: 'Active', joined: 'Apr 02, 2024', color: 'bg-indigo-500' },
                        ].map((user, i) => (
                            <tr key={i} className="hover:bg-neutral-50/50 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-black shadow-lg", user.color)}>
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-neutral-900 tracking-tight">{user.name}</p>
                                            <p className="text-xs text-neutral-500 font-medium">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2">
                                        <BadgeCheck className={cn("w-4 h-4", user.tier.includes('Pro') || user.tier === 'Enterprise' ? "text-primary-500" : "text-neutral-300")} />
                                        <span className="text-sm font-bold text-neutral-700">{user.tier}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={cn(
                                        "text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest",
                                        user.status === 'Active' ? "bg-emerald-50 text-emerald-600" :
                                        user.status === 'Past Due' ? "bg-rose-50 text-rose-600" : "bg-neutral-100 text-neutral-500"
                                    )}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-600">
                                            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                                            {user.joined}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                                        <MoreHorizontal className="w-5 h-5 text-neutral-400" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="px-8 py-6 bg-neutral-50/50 border-t border-neutral-100 flex items-center justify-between">
                    <p className="text-xs font-bold text-neutral-500">Showing 5 of 12,842 professionals</p>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 border border-neutral-200 rounded-lg text-xs font-bold text-neutral-400 cursor-not-allowed">Previous</button>
                        <button className="px-4 py-2 border border-neutral-200 rounded-lg text-xs font-bold text-primary-600 hover:bg-white transition-all">Next Page</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
