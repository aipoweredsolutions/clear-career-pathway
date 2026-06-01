'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Cookie } from 'lucide-react'

export function CookieConsent() {
    const [showCookieConsent, setShowCookieConsent] = useState(false)

    useEffect(() => {
        // Check if the user has already consented
        const hasConsented = localStorage.getItem('cookieConsent')
        if (!hasConsented) {
            setShowCookieConsent(true)
        }
    }, [])

    function acceptCookies() {
        localStorage.setItem('cookieConsent', 'true')
        setShowCookieConsent(false)
    }

    function acceptNecessary() {
        localStorage.setItem('cookieConsent', 'necessary')
        setShowCookieConsent(false)
    }

    function rejectCookies() {
        localStorage.setItem('cookieConsent', 'rejected')
        setShowCookieConsent(false)
    }

    if (!showCookieConsent) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:max-w-md sm:left-6 sm:bottom-6 sm:p-0 animate-in slide-in-from-bottom-5 duration-500 ease-out">
            <div className="bg-white shadow-2xl rounded-2xl border border-neutral-200 p-6 flex flex-col gap-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-indigo-500" />
                <button 
                    onClick={rejectCookies}
                    className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition bg-neutral-50 rounded-full p-1.5 hover:bg-neutral-100"
                    aria-label="Close message"
                >
                    <X className="w-5 h-5" />
                </button>
                <div className="pr-8 space-y-3">
                    <div className="flex items-center gap-2">
                        <Cookie className="w-5 h-5 text-indigo-500" />
                        <h3 className="text-lg font-bold text-neutral-900 font-serif">Cookie Preferences</h3>
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                        We use essential cookies for security and authentication. You can choose to accept all cookies, only necessary ones, or reject all non-essential cookies.
                        Read our <Link href="/cookies" className="text-indigo-600 hover:underline">Cookie Policy</Link> for details.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 mt-1">
                    <button
                        onClick={acceptCookies}
                        className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition shadow-md whitespace-nowrap"
                    >
                        Accept All
                    </button>
                    <button
                        onClick={acceptNecessary}
                        className="w-full sm:w-auto bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-sm font-bold px-6 py-2.5 rounded-xl transition whitespace-nowrap"
                    >
                        Necessary Only
                    </button>
                    <button
                        onClick={rejectCookies}
                        className="w-full sm:w-auto bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 text-sm font-bold px-6 py-2.5 rounded-xl transition whitespace-nowrap"
                    >
                        Reject All
                    </button>
                </div>
                <Link
                    href="/privacy"
                    className="text-xs text-neutral-400 hover:text-neutral-600 text-center transition"
                >
                    Privacy Policy
                </Link>
            </div>
        </div>
    )
}
