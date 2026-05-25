import React from 'react'
import { Package, Search, Star, Edit, Eye, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'

const TEMPLATES = [
    { name: 'ATS Professional', id: 'ats-professional', category: 'ATS / Essential', status: 'Active', usage: 12450 },
    { name: 'Minimalist Mono', id: 'ats-minimal-mono', category: 'ATS / Essential', status: 'Active', usage: 8200 },
    { name: 'ATS Classic', id: 'ats-classic', category: 'ATS / Essential', status: 'Active', usage: 5400 },
    { name: 'ATS Executive', id: 'ats-executive', category: 'ATS / Essential', status: 'Active', usage: 3100 },
    { name: 'ATS Modern', id: 'ats-modern', category: 'Modern / Clean', status: 'Active', usage: 9600 },
    { name: 'ATS Timeline', id: 'ats-timeline', category: 'Modern / Clean', status: 'Active', usage: 4200 },
]

export default function AdminTemplatesPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-neutral-900 tracking-tighter italic">Template <span className="text-primary-600">Forge.</span></h1>
                    <p className="text-neutral-500 font-medium mt-2">Oversee the elite library of high-performance resume designs.</p>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TEMPLATES.map((tpl, i) => (
                    <div key={i} className="bg-white rounded-[2rem] border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-neutral-200/50 transition-all group">
                        <div className="h-48 bg-neutral-100 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Package className="w-12 h-12 text-neutral-200 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500" />
                            
                            <div className="absolute top-4 right-4">
                                <span className="bg-white/90 backdrop-blur-md border border-neutral-200 text-neutral-900 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                                    {tpl.status}
                                </span>
                            </div>
                        </div>
                        
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-1">{tpl.category}</p>
                                    <h3 className="text-xl font-black text-neutral-900 tracking-tight">{tpl.name}</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Total Usage</p>
                                    <p className="text-lg font-black text-neutral-900">{tpl.usage.toLocaleString()}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 pt-6 border-t border-neutral-100">
                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-950 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 transition-all">
                                    <Edit className="w-4 h-4" />
                                    Configure
                                </button>
                                <button className="p-2.5 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-all text-neutral-600">
                                    <Eye className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
