import React from 'react'
import Link from 'next/link'
import { Sparkles, FileText } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-neutral-950 text-neutral-400 py-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 text-white font-bold text-2xl mb-6">
                            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <span>Clear Career Path</span>
                        </div>
                        <p className="max-w-sm text-lg leading-relaxed">
                            Empowering professionals to tell their unique career stories through AI-driven clarity and premium design.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Product</h4>
                        <ul className="space-y-4">
                            <li><Link href="/#templates" className="hover:text-white transition-colors">Templates</Link></li>
                            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">Blog & Resources</Link></li>
                            <li><Link href="/samples" className="hover:text-white transition-colors">Career Samples</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Legal</h4>
                        <ul className="space-y-4">
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm">© {new Date().getFullYear()} Clear Career Path. All rights reserved.</p>
                    <div className="flex gap-8 text-sm">
                        <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                        <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
                        <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
