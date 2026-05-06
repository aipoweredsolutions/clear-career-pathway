import { Metadata } from 'next'
import { ContactForm } from './ContactForm'
import { Mail, MessageSquare, Phone, Globe, Sparkles, Shield, Clock } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Contact Support | Clear Career Path',
    description: 'Get in touch with the Clear Career Path support team for help with your resume, account, or general inquiries.',
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white pt-32 pb-24 overflow-hidden relative">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-50/30 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-50/30 blur-[100px] rounded-full translate-y-1/3 -translate-x-1/4 -z-10" />

            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Left Side: Content & Info */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-[11px] font-black uppercase tracking-[0.2em] w-fit border border-primary-100/50">
                                <Sparkles className="w-3.5 h-3.5 fill-primary-600/20" />
                                Support Center
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-neutral-950 tracking-tighter italic leading-[0.9]">
                                Get in <span className="text-primary-600">Touch.</span>
                            </h1>
                            <p className="text-xl text-neutral-500 font-bold leading-relaxed max-w-xl">
                                Have a question about our AI tools or need help with your career documents? Our team of experts is here to help you succeed.
                            </p>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-8 bg-white border border-neutral-100 rounded-[2.5rem] shadow-xl shadow-neutral-200/40 hover:shadow-2xl hover:shadow-primary-900/5 transition-all group">
                                <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-black text-neutral-900 mb-2 uppercase tracking-tight">Email Us</h3>
                                <p className="text-neutral-500 font-bold text-sm mb-4">Expect a response within 24 hours.</p>
                                <a href="mailto:support@clearcareerpath.com" className="text-primary-600 font-black text-sm hover:underline">
                                    support@clearcareerpath.com
                                </a>
                            </div>

                            <div className="p-8 bg-white border border-neutral-100 rounded-[2.5rem] shadow-xl shadow-neutral-200/40 hover:shadow-2xl hover:shadow-blue-900/5 transition-all group">
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-black text-neutral-900 mb-2 uppercase tracking-tight">Live Chat</h3>
                                <p className="text-neutral-500 font-bold text-sm mb-4">Available Mon-Fri, 9am - 6pm EST.</p>
                                <button className="text-blue-600 font-black text-sm hover:underline">
                                    Start a Conversation
                                </button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="pt-8 border-t border-neutral-100 flex flex-wrap gap-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-400">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none">Security</p>
                                    <p className="text-xs font-black text-neutral-900 uppercase">SSL Encrypted</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-400">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none">Speed</p>
                                    <p className="text-xs font-black text-neutral-900 uppercase">Fast Support</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary-600 rounded-[3.5rem] rotate-2 scale-105 opacity-5 -z-10" />
                        <div className="bg-white border border-neutral-100 p-10 md:p-14 rounded-[3.5rem] shadow-2xl shadow-neutral-200/60 relative">
                            <div className="mb-10">
                                <h2 className="text-3xl font-black text-neutral-950 tracking-tight italic mb-4">Send a Message</h2>
                                <p className="text-neutral-500 font-bold leading-relaxed">
                                    Fill out the form below and our team will get back to you as soon as possible.
                                </p>
                            </div>

                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
