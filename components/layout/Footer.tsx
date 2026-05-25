import React from 'react'
import Link from 'next/link'
import { Target, FileText } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-neutral-950 text-neutral-400 py-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 text-white font-bold text-2xl mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(59,130,246,0.4)] group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                            <span>Clear Career Path</span>
                        </div>
                        <p className="max-w-sm text-lg leading-relaxed">
                            Empowering professionals to tell their unique career stories through AI-driven clarity and premium design.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 italic tracking-tight uppercase text-xs opacity-50">Product</h4>
                        <ul className="space-y-4">
                            <li><Link href="/editor/setup" className="hover:text-white transition-colors">Resume Builder</Link></li>
                            <li><Link href="/editor/setup?type=cover_letter" className="hover:text-white transition-colors">Cover Letter Pro</Link></li>
                            <li><Link href="/samples" className="hover:text-white transition-colors">Template Gallery</Link></li>
                            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing &amp; Plans</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 italic tracking-tight uppercase text-xs opacity-50">Services</h4>
                        <ul className="space-y-4">
                            <li><Link href="/resume-examples" className="hover:text-white transition-colors">Resume Examples</Link></li>
                            <li><Link href="/ats-resume-scanner" className="hover:text-white transition-colors">Free ATS Scanner</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">Career Blog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 italic tracking-tight uppercase text-xs opacity-50">Legal</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-center md:text-left w-full">© {new Date().getFullYear()} Clear Career Path. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
