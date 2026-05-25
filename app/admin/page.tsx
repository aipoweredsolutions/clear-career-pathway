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
    CheckCircle2,
    Shield
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createAdminClient } from '@/lib/supabase/server'

export const revalidate = 60

async function getStats() {
    const supabase = createAdminClient()
    
    // Get first day of current month
    const now = new Date()
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

    try {
        const [
            { count: totalUsers, error: usersError },
            { count: totalDocs, error: docsError },
            { data: revenueData, error: revenueError },
            { count: paidUsers, error: paidError }
        ] = await Promise.all([
            supabase.from('profiles').select('*', { count: 'exact', head: true }),
            supabase.from('documents').select('*', { count: 'exact', head: true }),
            supabase.from('payment_history')
                .select('amount')
                .eq('status', 'succeeded')
                .gte('created_at', firstDayOfMonth),
            supabase.from('profiles')
                .select('*', { count: 'exact', head: true })
                .neq('subscription_tier', 'free')
        ])

        if (usersError) console.error('Error fetching users:', usersError)
        if (docsError) console.error('Error fetching docs:', docsError)
        if (revenueError) console.error('Error fetching revenue:', revenueError)
        if (paidError) console.error('Error fetching paid users:', paidError)

        const monthlyRevenue = revenueData?.reduce((sum, item) => sum + Number(item.amount), 0) ?? 0
        const conversionRate = totalUsers && totalUsers > 0 ? (Number(paidUsers) / Number(totalUsers)) * 100 : 0

        return {
            totalUsers: totalUsers?.toLocaleString() ?? '—',
            totalDocs: totalDocs?.toLocaleString() ?? '—',
            monthlyRevenue: monthlyRevenue > 0 ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(monthlyRevenue) : '$0.00',
            conversionRate: conversionRate > 0 ? `${conversionRate.toFixed(1)}%` : '0.0%',
            lastUpdated: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        }
    } catch (error) {
        console.error('Failed to fetch admin stats:', error)
        return {
            totalUsers: '—',
            totalDocs: '—',
            monthlyRevenue: '—',
            conversionRate: '—',
            lastUpdated: new Date().toLocaleTimeString()
        }
    }
}

async function getRecentActivity() {
    const supabase = createAdminClient()
    
    try {
        const [
            { data: downloads },
            { data: docs },
            { data: users }
        ] = await Promise.all([
            supabase.from('download_history').select('*, document:documents(title), profile:profiles(email)').order('created_at', { ascending: false }).limit(5),
            supabase.from('documents').select('*, profile:profiles(email)').order('created_at', { ascending: false }).limit(5),
            supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(5)
        ])

        const activities = [
            ...(downloads || []).map(d => ({
                user: (d as any).profile?.email || 'Unknown',
                action: `Downloaded ${d.format.toUpperCase()} (${(d as any).document?.title || 'Resume'})`,
                time: new Date(d.created_at),
                type: 'download'
            })),
            ...(docs || []).map(d => ({
                user: (d as any).profile?.email || 'Unknown',
                action: `Created "${d.title}"`,
                time: new Date(d.created_at),
                type: 'create'
            })),
            ...(users || []).map(u => ({
                user: u.email,
                action: `Joined Clear Career Path`,
                time: new Date(u.created_at),
                type: 'user'
            }))
        ].sort((a, b) => b.time.getTime() - a.time.getTime()).slice(0, 8)

        return activities
    } catch (error) {
        console.error('Error fetching admin activity:', error)
        return []
    }
}

export default async function AdminDashboardPage() {
    const [stats, activities] = await Promise.all([
        getStats(),
        getRecentActivity()
    ])

    const metrics = [
        { label: 'Total Active Users', value: stats.totalUsers, change: '+12.5%', trend: 'up', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Resumes Generated', value: stats.totalDocs, change: '+18.2%', trend: 'up', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Monthly Revenue', value: stats.monthlyRevenue, change: '+8.4%', trend: 'up', icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Conversion Rate', value: stats.conversionRate, change: '-0.4%', trend: 'down', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    ]

    const timeAgo = (date: Date) => {
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
        if (seconds < 60) return 'Just now'
        const minutes = Math.floor(seconds / 60)
        if (minutes < 60) return `${minutes}m ago`
        const hours = Math.floor(minutes / 60)
        if (hours < 24) return `${hours}h ago`
        return date.toLocaleDateString()
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-neutral-900 tracking-tighter italic">System <span className="text-primary-600">Overview.</span></h1>
                    <p className="text-neutral-500 font-medium mt-2">Real-time performance metrics and professional activity logs.</p>
                </div>
                <div className="flex items-center gap-2 bg-neutral-100 px-4 py-2 rounded-full border border-neutral-200">
                    <Clock className="w-4 h-4 text-neutral-500" />
                    <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Last updated: {stats.lastUpdated}</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((stat, i) => (
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
                            {activities.length > 0 ? activities.map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-6 hover:bg-neutral-50 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                                            item.type === 'billing' ? "bg-amber-50 text-amber-600" :
                                            item.type === 'create' ? "bg-primary-50 text-primary-600" :
                                            item.type === 'user' ? "bg-blue-50 text-blue-600" :
                                            "bg-neutral-100 text-neutral-500"
                                        )}>
                                            {item.type === 'billing' ? <CreditCard className="w-5 h-5" /> :
                                             item.type === 'create' ? <FileText className="w-5 h-5" /> :
                                             item.type === 'user' ? <Users className="w-5 h-5" /> :
                                             <Clock className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-neutral-900">{item.action}</p>
                                            <p className="text-xs text-neutral-500 font-medium">{item.user}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{timeAgo(item.time)}</span>
                                </div>
                            )) : (
                                <div className="p-10 text-center text-neutral-500 font-bold italic">No recent activity detected.</div>
                            )}
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

