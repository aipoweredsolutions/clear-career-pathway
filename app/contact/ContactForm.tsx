'use client'

import React, { useState } from 'react'
import { Send, Loader2, CheckCircle2 } from 'lucide-react'
import { submitContactForm } from './actions'
import { toast } from 'sonner'

export function ContactForm() {
    const [isPending, setIsPending] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsPending(true)

        const formData = new FormData(e.currentTarget)
        const result = await submitContactForm(formData)

        if (result.success) {
            setIsSuccess(true)
            toast.success('Message sent successfully!')
        } else {
            toast.error(result.error || 'Failed to send message')
            setIsPending(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="py-12 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-8 shadow-inner shadow-emerald-100">
                    <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black text-neutral-900 mb-4 tracking-tight italic">Message Received!</h3>
                <p className="text-neutral-500 font-bold max-w-xs leading-relaxed mb-10">
                    Thank you for reaching out. We&apos;ve received your message and will get back to you shortly.
                </p>
                <button 
                    onClick={() => setIsSuccess(false)}
                    className="h-14 px-10 bg-neutral-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-900/20"
                >
                    Send Another Message
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        placeholder="John Doe"
                        className="w-full h-14 bg-neutral-50 border border-neutral-100 rounded-2xl px-6 font-bold text-neutral-950 placeholder:text-neutral-300 outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        placeholder="john@example.com"
                        className="w-full h-14 bg-neutral-50 border border-neutral-100 rounded-2xl px-6 font-bold text-neutral-950 placeholder:text-neutral-300 outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="subject" className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Subject</label>
                <select 
                    id="subject" 
                    name="subject" 
                    required
                    className="w-full h-14 bg-neutral-50 border border-neutral-100 rounded-2xl px-6 font-bold text-neutral-950 outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all appearance-none cursor-pointer"
                >
                    <option value="general">General Inquiry</option>
                    <option value="billing">Billing & Subscription</option>
                    <option value="technical">Technical Issue</option>
                    <option value="feature">Feature Request</option>
                    <option value="partnership">Partnership</option>
                </select>
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Your Message</label>
                <textarea 
                    id="message" 
                    name="message" 
                    required 
                    rows={6}
                    placeholder="Tell us how we can help..."
                    className="w-full bg-neutral-50 border border-neutral-100 rounded-3xl p-6 font-bold text-neutral-950 placeholder:text-neutral-300 outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all resize-none"
                />
            </div>

            <button 
                type="submit" 
                disabled={isPending}
                className="w-full h-16 bg-primary-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary-600/30 hover:bg-primary-700 hover:shadow-primary-600/40 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isPending ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        <Send className="w-4 h-4" />
                        Send Message
                    </>
                )}
            </button>
        </form>
    )
}
