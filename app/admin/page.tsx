import React from 'react'
import { 
    Users, 
    FileText, 
    CreditCard, 
    TrendingUp, 
    ArrowUpRight, 
    ArrowDownRight,
    Activity,
    Clock,
    CheckCircle2
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminDashboardPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-neutral-900 tracking-tighter italic">System <span className="text-primary-600">Overview.</span></h1>
                <p className="text-neutral-500 font-medium mt-2">Real-time performance metrics and professional activity logs.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Active Users', value: '12,842', change: '+12.5%', trend: 'up', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Resumes Generated', value: '45,219', change: '+18.2%', trend: 'up', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Monthly Revenue', value: '$24,500', change: '+8.4%', trend: 'up', icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Conversion Rate', value: '3.2%', change: '-0.4%', trend: 'down', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2rem] border border-neutral-200 shadow-sm hover:shadow-xl hover:shadow-neutral-200/50 transition-all group">
                        <div className="flex items-center justify-between mb-6">
                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3", stat.bg)}>
                                <stat.icon className={cn("w-7 h-7", stat.color)} />
                            </div>
                            <div className={cn(
                                "flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider",
                                stat.trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                            )}>
                                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat.change}
                            </div>
                        </div>
                        <p className="text-xs font-black text-neutral-400 uppercase tracking-[0.15em] mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-black text-neutral-900 tracking-tighter">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Content Split */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-black text-neutral-900 tracking-tight flex items-center gap-2 italic uppercase">
                            <Activity className="w-5 h-5 text-primary-500" />
                            Recent Intelligence
                        </h2>
                        <button className="text-xs font-black text-primary-600 uppercase tracking-widest hover:underline">View Full Log</button>
                    </div>
                    
                    <div className="bg-white rounded-[2.5rem] border border-neutral-200 shadow-sm overflow-hidden">
                        <div className="divide-y divide-neutral-100">
                            {[
                                { user: 'alex.sterling@example.com', action: 'Created "Executive Pro" Resume', time: '2 mins ago', type: 'create' },
                                { user: 'sarah.j@company.com', action: 'Upgraded to Premium Pro', time: '14 mins ago', type: 'billing' },
                                { user: 'mike.ross@law.org', action: 'Downloaded PDF (Sterling Template)', time: '45 mins ago', type: 'download' },
                                { user: 'j.harrison@tech.co', action: 'Scanned Resume (Score: 92%)', time: '1 hour ago', type: 'scan' },
                                { user: 'elena.v@design.it', action: 'Modified Summary with AI Helper', time: '3 hours ago', type: 'ai' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-6 hover:bg-neutral-50 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-neutral-900">{item.action}</p>
                                            <p className="text-xs text-neutral-500 font-medium">{item.user}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* System Status */}
                <div className="space-y-6">
                    <h2 className="text-xl font-black text-neutral-900 tracking-tight flex items-center gap-2 italic uppercase">
                        <Shield className="w-5 h-5 text-emerald-500" />
                        Infrastructure
                    </h2>
                    
                    <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-200 shadow-sm space-y-6">
                        {[
                            { service: 'Authentication Engine', status: 'Operational', color: 'text-emerald-600' },
                            { service: 'PDF Rendering Node', status: 'Operational', color: 'text-emerald-600' },
                            { service: 'AI Generation Pipeline', status: '98% Accuracy', color: 'text-indigo-600' },
                            { service: 'Database Cluster', status: 'Healthy', color: 'text-emerald-600' },
                            { service: 'Vercel Deployment', status: 'Stable', color: 'text-emerald-600' },
                        ].map((s, i) => (
                            <div key={i} className="flex items-center justify-between group">
                                <span className="text-sm font-bold text-neutral-600">{s.service}</span>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className={cn("w-4 h-4", s.color)} />
                                    <span className={cn("text-[10px] font-black uppercase tracking-widest", s.color)}>{s.status}</span>
                                </div>
                            </div>
                        ))}
                        
                        <div className="pt-6 border-t border-neutral-100">
                            <div className="bg-neutral-950 p-6 rounded-2xl">
                                <p className="text-[10px] font-black text-primary-500 uppercase tracking-widest mb-1">Current Build</p>
                                <p className="text-sm font-black text-white italic tracking-tighter">v0.8.42-stable-release</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
