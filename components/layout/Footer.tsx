import React from 'react'
import Link from 'next/link'
import { FileText } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-neutral-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="bg-primary-600 p-1.5 rounded-lg">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold font-serif tracking-tight">
                                Clear Career Path
                            </span>
                        </Link>
                        <p className="text-neutral-400 max-w-sm">
                            Empowering professionals to build their future with clarity,
                            one ATS-optimized resume at a time. Designed with recruiters in mind.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold mb-6 uppercase tracking-wider text-sm text-neutral-500">Product</h4>
                        <ul className="space-y-4 text-neutral-400">
                            <li><Link href="/#templates" className="hover:text-white transition-colors">Templates</Link></li>
                            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="/dashboard" className="hover:text-white transition-colors">Resume Builder</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold mb-6 uppercase tracking-wider text-sm text-neutral-500">Legal</h4>
                        <ul className="space-y-4 text-neutral-400">
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
                    <p>© 2026 Clear Career Path. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <span>Built for ATS Compliance</span>
                        <div className="flex gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-green-500 font-bold uppercase tracking-tighter text-[10px]">System Operational</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
