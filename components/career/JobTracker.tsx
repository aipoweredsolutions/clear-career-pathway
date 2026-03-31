import React, { useState, useEffect } from 'react'
import { Plus, Briefcase, Calendar, Link as LinkIcon, Trash2, Search, CheckCircle2, Clock, XCircle, FileText, Loader2, ClipboardList } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { ResumeDocument } from '@/lib/types/resume'
import { 
    fetchApplications, 
    addApplication, 
    deleteApplication, 
    updateApplicationStatus, 
    JobApplication, 
    ApplicationStatus 
} from '@/app/career-hub/actions'

export function JobTracker({ resumes }: { resumes: ResumeDocument[] }) {
    const [applications, setApplications] = useState<JobApplication[]>([])
    const [isAdding, setIsAdding] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all')

    const [newApp, setNewApp] = useState<Partial<JobApplication>>({
        company: '',
        role: '',
        dateApplied: new Date().toISOString().split('T')[0],
        status: 'applied',
        notes: ''
    })

    // Load initial data
    useEffect(() => {
        async function loadApplications() {
            setIsLoading(true)
            
            // Check if we're in guest mode (based on mock-user-id or cookie)
            const isGuest = document.cookie.includes('mock_session=true')
            
            if (isGuest) {
                const saved = localStorage.getItem('ccp_job_applications')
                if (saved) {
                    try {
                        setApplications(JSON.parse(saved))
                    } catch (e) {
                        console.error('Failed to parse applications', e)
                    }
                }
            } else {
                const data = await fetchApplications()
                if (data && data.length > 0) {
                    setApplications(data)
                } else {
                    // Fallback to local storage if DB is empty but local has data (for migration or offline)
                    const saved = localStorage.getItem('ccp_job_applications')
                    if (saved) {
                        setApplications(JSON.parse(saved))
                    }
                }
            }
            setIsLoading(false)
        }
        loadApplications()
    }, [])

    const handleAdd = async () => {
        if (!newApp.company || !newApp.role) {
            toast.error('Please fill in company and role')
            return
        }

        const isGuest = document.cookie.includes('mock_session=true')
        
        const appPayload: Omit<JobApplication, 'id'> = {
            company: newApp.company!,
            role: newApp.role!,
            dateApplied: newApp.dateApplied || new Date().toISOString().split('T')[0],
            status: newApp.status as ApplicationStatus,
            jobUrl: newApp.jobUrl,
            notes: newApp.notes,
            resumeId: newApp.resumeId
        }

        if (isGuest) {
            const guestApp: JobApplication = {
                ...appPayload,
                id: Math.random().toString(36).substr(2, 9)
            }
            const updated = [guestApp, ...applications]
            setApplications(updated)
            localStorage.setItem('ccp_job_applications', JSON.stringify(updated))
            toast.success('Added to local storage (Guest Mode)')
        } else {
            const result = await addApplication(appPayload)
            if (result.success) {
                const newFullApp: JobApplication = { ...appPayload, id: result.id! }
                setApplications([newFullApp, ...applications])
                toast.success('Saved to cloud database!')
            } else {
                toast.error(result.error || 'Failed to sync with cloud')
            }
        }

        setIsAdding(false)
        setNewApp({
            company: '',
            role: '',
            dateApplied: new Date().toISOString().split('T')[0],
            status: 'applied',
            notes: ''
        })
    }

    const handleDelete = async (id: string) => {
        const isGuest = document.cookie.includes('mock_session=true')
        
        if (isGuest) {
            const updated = applications.filter(a => a.id !== id)
            setApplications(updated)
            localStorage.setItem('ccp_job_applications', JSON.stringify(updated))
            toast.success('Removed from local storage')
        } else {
            const result = await deleteApplication(id)
            if (result.success) {
                setApplications(applications.filter(a => a.id !== id))
                toast.success('Deleted from cloud')
            } else {
                toast.error(result.error || 'Failed to delete')
            }
        }
    }

    const handleStatusUpdate = async (id: string, newStatus: ApplicationStatus) => {
        const isGuest = document.cookie.includes('mock_session=true')
        
        if (isGuest) {
            const updated = applications.map(a => a.id === id ? { ...a, status: newStatus } : a)
            setApplications(updated)
            localStorage.setItem('ccp_job_applications', JSON.stringify(updated))
            toast.success(`Status updated to ${newStatus}`)
        } else {
            const result = await updateApplicationStatus(id, newStatus)
            if (result.success) {
                setApplications(applications.map(a => a.id === id ? { ...a, status: newStatus } : a))
                toast.success(`Cloud status updated to ${newStatus}`)
            } else {
                toast.error(result.error || 'Failed to update')
            }
        }
    }

    const filteredApps = applications.filter(app => {
        const matchesSearch = app.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              app.role.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === 'all' || app.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const statusIcons = {
        applied: <Clock className="w-4 h-4 text-blue-500" />,
        interviewing: <Briefcase className="w-4 h-4 text-purple-500" />,
        offer: <CheckCircle2 className="w-4 h-4 text-green-500" />,
        rejected: <XCircle className="w-4 h-4 text-red-500" />,
        wishlist: <Calendar className="w-4 h-4 text-neutral-400" />
    }

    const statusColors = {
        applied: "bg-blue-50 text-blue-700 border-blue-100",
        interviewing: "bg-purple-50 text-purple-700 border-purple-100",
        offer: "bg-green-50 text-green-700 border-green-100",
        rejected: "bg-red-50 text-red-700 border-red-100",
        wishlist: "bg-neutral-50 text-neutral-700 border-neutral-100"
    }

    if (isLoading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center bg-white rounded-3xl border border-neutral-100 shadow-sm">
                <Loader2 className="w-8 h-8 animate-spin text-primary-600 mb-4" />
                <p className="text-xs font-black text-neutral-400 uppercase tracking-widest">Sycing with cloud...</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 max-w-md relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input 
                        type="text" 
                        placeholder="Search applications..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="bg-white border border-neutral-200 rounded-xl px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none transition-all cursor-pointer"
                    >
                        <option value="all">All Statuses</option>
                        <option value="applied">Applied</option>
                        <option value="interviewing">Interviewing</option>
                        <option value="offer">Offer</option>
                        <option value="rejected">Rejected</option>
                        <option value="wishlist">Wishlist</option>
                    </select>
                    <button 
                        onClick={() => setIsAdding(true)}
                        className="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-black uppercase tracking-tight flex items-center gap-2 hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
                    >
                        <Plus className="w-4 h-4" />
                        Add New
                    </button>
                </div>
            </div>

            {isAdding && (
                <div className="bg-white rounded-2xl border-2 border-primary-100 p-6 animate-in slide-in-from-top-4 shadow-xl">
                    <h4 className="text-lg font-black text-neutral-900 mb-4 italic uppercase tracking-tight">New Application</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1.5">Company Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Google"
                                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm font-medium"
                                value={newApp.company}
                                onChange={e => setNewApp({...newApp, company: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1.5">Job Role</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Senior Developer"
                                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm font-medium"
                                value={newApp.role}
                                onChange={e => setNewApp({...newApp, role: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1.5">Initial Status</label>
                            <select 
                                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm font-bold"
                                value={newApp.status}
                                onChange={e => setNewApp({...newApp, status: e.target.value as any})}
                            >
                                <option value="wishlist">Wishlist</option>
                                <option value="applied">Applied</option>
                                <option value="interviewing">Interviewing</option>
                                <option value="offer">Offer</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1.5">Date Applied</label>
                            <input 
                                type="date" 
                                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm font-medium"
                                value={newApp.dateApplied}
                                onChange={e => setNewApp({...newApp, dateApplied: e.target.value})}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1.5">Job URL (Optional)</label>
                            <input 
                                type="url" 
                                placeholder="https://..."
                                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm font-medium"
                                value={newApp.jobUrl}
                                onChange={e => setNewApp({...newApp, jobUrl: e.target.value})}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1.5">Linked Resume</label>
                            <select 
                                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm font-bold"
                                value={newApp.resumeId}
                                onChange={e => setNewApp({...newApp, resumeId: e.target.value})}
                            >
                                <option value="">No resume linked</option>
                                {resumes.map(r => (
                                    <option key={r.id} value={r.id}>{r.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-8">
                        <button 
                            onClick={() => setIsAdding(false)}
                            className="px-6 py-2 text-xs font-black uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleAdd}
                            className="bg-primary-600 text-white px-8 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary-700 shadow-xl shadow-primary-600/20"
                        >
                            Save Tracker Item
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                {filteredApps.length > 0 ? (
                    filteredApps.map((app) => (
                        <div 
                            key={app.id} 
                            className="bg-white border border-neutral-200 rounded-[2rem] p-6 hover:shadow-xl hover:shadow-neutral-200/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group relative overflow-hidden"
                        >
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center shrink-0 group-hover:bg-primary-50 transition-colors">
                                    <Briefcase className="w-7 h-7 text-neutral-300 group-hover:text-primary-600 transition-colors" />
                                </div>
                                <div className="space-y-1">
                                    <h5 className="font-black text-neutral-900 text-lg tracking-tight leading-none">{app.company}</h5>
                                    <p className="text-sm font-bold text-neutral-400">{app.role}</p>
                                    <div className="flex flex-wrap items-center gap-4 mt-3">
                                        <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-black uppercase tracking-widest">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {new Date(app.dateApplied).toLocaleDateString()}
                                        </div>
                                        {app.resumeId && (
                                            <div className="flex items-center gap-1.5 text-[10px] text-primary-600 font-black uppercase tracking-widest">
                                                <FileText className="w-3.5 h-3.5" />
                                                Resume Linked
                                            </div>
                                        )}
                                        {app.jobUrl && (
                                            <a 
                                                href={app.jobUrl} 
                                                target="_blank" 
                                                className="flex items-center gap-1.5 text-[10px] text-neutral-400 hover:text-primary-600 font-black uppercase tracking-widest transition-colors"
                                            >
                                                <LinkIcon className="w-3.5 h-3.5" />
                                                Listing
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 self-end md:self-center">
                                {/* Status Toggle Dropdown or Pills */}
                                <div className="flex bg-neutral-50 p-1.5 rounded-2xl border border-neutral-100 items-center gap-1">
                                    {(['applied', 'interviewing', 'offer', 'rejected'] as ApplicationStatus[]).map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => handleStatusUpdate(app.id, status)}
                                            className={cn(
                                                "w-8 h-8 rounded-xl flex items-center justify-center transition-all",
                                                app.status === status 
                                                    ? statusColors[status] + " shadow-sm" 
                                                    : "text-neutral-300 hover:text-neutral-500 hover:bg-white"
                                            )}
                                            title={status.charAt(0).toUpperCase() + status.slice(1)}
                                        >
                                            {statusIcons[status]}
                                        </button>
                                    ))}
                                </div>

                                <div className="h-10 w-px bg-neutral-100 hidden md:block" />

                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => handleDelete(app.id)}
                                        className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-400 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-neutral-100 shadow-sm">
                        <div className="w-20 h-20 bg-neutral-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 group cursor-pointer hover:bg-primary-50 transition-colors" onClick={() => setIsAdding(true)}>
                            <ClipboardList className="w-10 h-10 text-neutral-200 group-hover:text-primary-600 transition-colors" />
                        </div>
                        <h4 className="text-2xl font-black text-neutral-900 mb-2 italic tracking-tight">Your search is silent.</h4>
                        <p className="text-neutral-500 max-w-sm mx-auto text-sm font-bold leading-relaxed mb-6">
                            Start tracking your high-performance job search by adding your first application above.
                        </p>
                        <button 
                            onClick={() => setIsAdding(true)}
                            className="bg-white border-2 border-neutral-200 text-neutral-900 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:border-primary-600 hover:text-primary-600 transition-all"
                        >
                            First Application
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
