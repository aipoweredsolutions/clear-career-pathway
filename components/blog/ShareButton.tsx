"use client"

import React, { useState } from 'react'
import { Share2, Check, Copy } from 'lucide-react'

interface ShareButtonProps {
    title: string
    url: string
}

export function ShareButton({ title, url }: ShareButtonProps) {
    const [status, setStatus] = useState<'idle' | 'copied' | 'shared'>('idle')

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text: `Check out this article: ${title}`,
                    url
                })
                setStatus('shared')
                setTimeout(() => setStatus('idle'), 2000)
            } catch (err) {
                // User cancelled or error
                console.error('Share failed:', err)
                copyToClipboard()
            }
        } else {
            copyToClipboard()
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url)
        setStatus('copied')
        setTimeout(() => setStatus('idle'), 2000)
    }

    return (
        <button 
            onClick={handleShare}
            className="group flex items-center gap-3 p-3 px-6 rounded-2xl bg-neutral-50 text-neutral-600 hover:bg-neutral-100 hover:text-black transition-all border border-neutral-100"
            title="Share this article"
        >
            {status === 'copied' ? (
                <>
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-bold text-emerald-600">Copied Link!</span>
                </>
            ) : status === 'shared' ? (
                <>
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-bold text-emerald-600">Shared!</span>
                </>
            ) : (
                <>
                    <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-bold">Share Article</span>
                </>
            )}
        </button>
    )
}
