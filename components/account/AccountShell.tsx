'use client'

import React, { useState, useTransition, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
    User, Mail, Lock, CreditCard, BarChart2, Download,
    CheckCircle2, AlertCircle, ChevronRight, LogOut,
    FileText, Sparkles, Star, ArrowUpRight, Clock,
    Shield, Zap, Loader2, Eye, EyeOff, Trash2,
    Users, Copy, Link as LinkIcon
} from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { updateProfile, updateEmail, updatePassword, deleteAccount } from '@/app/account/actions'
import { supabase } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

// ─── Types ───────────────────────────────────────────────────────────────────

interface AccountUser {
    id: string
    email: string
    fullName: string
    createdAt: string
    downloadCredits: number
    referralCode: string
}

interface Subscription {
    status: string
    current_period_end: string | null
    paddle_subscription_id: string | null
    tier: {
        name: string
        display_name: string
        price_monthly: number | null
        ai_improvements_per_month: number | null
        max_documents: number | null
        max_exports_per_month: number | null
    } | null
}

interface Usage {
    aiCount: number
    exportCount: number
    bonusAICredits: number
}

interface ReferralStats {
    count: number
    totalBonusCredits: number
}

interface DownloadRecord {
    id: string
    format: string
    created_at: string
    document: { title: string } | null
}

interface PaymentRecord {
    id: string
    amount: number
    currency: string
    status: string
    created_at: string
    paddle_transaction_id: string | null
}

interface AccountShellProps {
    user: AccountUser
    subscription: Subscription | null
    usage: Usage
    referrals: ReferralStats
    documentCount: number
    downloadHistory: DownloadRecord[]
    paymentHistory: PaymentRecord[]
    managementUrls?: { cancelUrl: string; updateUrl: string } | null
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

type Tab = 'overview' | 'profile' | 'security' | 'billing' | 'history' | 'referral'

// ─── Helper: Stat Badge ───────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, sub, color }: {
    icon: React.ElementType
    label: string
    value: string | number
    sub?: string
    color: string
}) {
    return (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 flex items-center gap-4">
            <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center shrink-0', color)}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <div className="text-2xl font-black text-neutral-900">{value}</div>
                <div className="text-sm font-semibold text-neutral-500">{label}</div>
                {sub && <div className="text-xs text-neutral-400 mt-0.5">{sub}</div>}
            </div>
        </div>
    )
}

// ─── Helper: Section Heading ──────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="text-sm font-black text-neutral-400 uppercase tracking-[0.12em] mb-4">
            {children}
        </h3>
    )
}

// ─── Helper: Feedback Banner ──────────────────────────────────────────────────

function Feedback({ state }: { state: { error?: string; success?: boolean; message?: string } | null }) {
    if (!state) return null
    if (state.error) {
        return (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm font-medium animate-in slide-in-from-top-1 duration-200">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{state.error}</span>
            </div>
        )
    }
    return (
        <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl p-4 text-sm font-medium animate-in slide-in-from-top-1 duration-200">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{state.message ?? 'Saved successfully.'}</span>
        </div>
    )
}

// ─── Helper: Password Input ───────────────────────────────────────────────────

function PasswordInput({ label, id, placeholder, required, value, onChange }: {
    label: string
    id: string
    placeholder?: string
    required?: boolean
    value: string
    onChange: (v: string) => void
}) {
    const [visible, setVisible] = useState(false)
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-semibold text-neutral-700 mb-1.5">{label}</label>
            <div className="relative">
                <input
                    id={id}
                    name={id}
                    type={visible ? 'text' : 'password'}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    required={required}
                    autoComplete={id === 'currentPassword' ? 'current-password' : 'new-password'}
                    className="w-full border border-neutral-200 rounded-xl px-4 py-3 pr-11 text-sm text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition placeholder:text-neutral-400"
                />
                <button
                    type="button"
                    onClick={() => setVisible(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition"
                    aria-label={visible ? 'Hide password' : 'Show password'}
                >
                    {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>
        </div>
    )
}

// ─── Helper: Text Input ───────────────────────────────────────────────────────

function FormInput({ label, id, type = 'text', defaultValue, placeholder, required }: {
    label: string; id: string; type?: string; defaultValue?: string; placeholder?: string; required?: boolean
}) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-semibold text-neutral-700 mb-1.5">{label}</label>
            <input
                id={id}
                name={id}
                type={type}
                defaultValue={defaultValue}
                placeholder={placeholder}
                required={required}
                className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition placeholder:text-neutral-400"
            />
        </div>
    )
}

// ─── Helper: Password Strength Indicator ─────────────────────────────────────

function PasswordStrength({ password }: { password: string }) {
    if (!password) return null

    const checks = [
        { label: 'At least 8 characters', ok: password.length >= 8 },
        { label: 'Uppercase letter', ok: /[A-Z]/.test(password) },
        { label: 'Number', ok: /[0-9]/.test(password) },
    ]
    const score = checks.filter(c => c.ok).length

    const colors = ['bg-red-400', 'bg-amber-400', 'bg-emerald-500']
    const labels = ['Weak', 'Fair', 'Strong']

    return (
        <div className="space-y-2">
            <div className="flex gap-1.5">
                {[0, 1, 2].map(i => (
                    <div
                        key={i}
                        className={cn(
                            'h-1.5 flex-1 rounded-full transition-all duration-300',
                            i < score ? colors[score - 1] : 'bg-neutral-100'
                        )}
                    />
                ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
                {checks.map(c => (
                    <span key={c.label} className={cn('text-xs flex items-center gap-1', c.ok ? 'text-emerald-600' : 'text-neutral-400')}>
                        <span className={cn('w-1.5 h-1.5 rounded-full inline-block', c.ok ? 'bg-emerald-500' : 'bg-neutral-300')} />
                        {c.label}
                    </span>
                ))}
            </div>
        </div>
    )
}

// ─── Tier Badge ───────────────────────────────────────────────────────────────

function TierBadge({ name }: { name: string }) {
    const lower = name.toLowerCase()
    if (lower.includes('power') || lower.includes('premium')) {
        return (
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-black px-3 py-1 rounded-full shadow">
                <Star className="w-3 h-3" /> Power User
            </span>
        )
    }
    if (lower.includes('starter') || lower.includes('single') || lower.includes('bundle')) {
        return (
            <span className="inline-flex items-center gap-1.5 bg-primary-600 text-white text-xs font-black px-3 py-1 rounded-full shadow">
                <Zap className="w-3 h-3" /> Starter
            </span>
        )
    }
    return (
        <span className="inline-flex items-center gap-1.5 bg-neutral-200 text-neutral-600 text-xs font-black px-3 py-1 rounded-full">
            Free
        </span>
    )
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function UsageBar({ current, limit, label }: { current: number; limit: number | null; label: string }) {
    const pct = limit === null ? 0 : Math.min(100, (current / limit) * 100)
    const isUnlimited = limit === null
    const isCritical = !isUnlimited && pct >= 80

    return (
        <div>
            <div className="flex justify-between text-xs font-semibold text-neutral-500 mb-1.5">
                <span>{label}</span>
                <span className={cn(isCritical ? 'text-red-500' : 'text-neutral-700')}>
                    {isUnlimited ? `${current} / ∞` : `${current} / ${limit}`}
                </span>
            </div>
            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div
                    className={cn(
                        'h-full rounded-full transition-all duration-700',
                        isUnlimited ? 'bg-emerald-400 w-full' :
                            isCritical ? 'bg-red-500' : 'bg-primary-500'
                    )}
                    style={{ width: isUnlimited ? '100%' : `${pct}%` }}
                />
            </div>
            {isUnlimited && <p className="text-[10px] text-emerald-600 font-bold mt-1">Unlimited</p>}
        </div>
    )
}

// ─── Tabs Navigation ──────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'referral', label: 'Refer a Friend', icon: Users },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'history', label: 'Download History', icon: Download },
]

// ─── Delete Account Confirm Dialog ────────────────────────────────────────────

function DeleteAccountDialog({ onClose, onConfirmed }: { onClose: () => void; onConfirmed: () => void }) {
    const [confirmText, setConfirmText] = useState('')
    const [isPending, startTransition] = useTransition()
    const [state, setState] = useState<{ error?: string } | null>(null)

    function handleDelete() {
        startTransition(async () => {
            const res = await deleteAccount()
            if (res?.error) {
                setState({ error: res.error })
            } else {
                onConfirmed()
            }
        })
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Trash2 className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-xl font-black text-neutral-900 text-center mb-2">Delete Your Account</h3>
                <p className="text-sm text-neutral-500 text-center mb-6">
                    This will permanently remove your profile and all associated data. This action <strong className="text-neutral-700">cannot be undone</strong>.
                </p>
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                        Type <span className="font-mono bg-neutral-100 px-1.5 py-0.5 rounded text-red-600">DELETE</span> to confirm
                    </label>
                    <input
                        type="text"
                        value={confirmText}
                        onChange={e => setConfirmText(e.target.value)}
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="DELETE"
                    />
                </div>
                {state?.error && <Feedback state={state} />}
                <div className="flex gap-3 mt-5">
                    <button onClick={onClose} className="flex-1 border border-neutral-200 text-neutral-700 text-sm font-bold py-3 rounded-xl hover:bg-neutral-50 transition">
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={confirmText !== 'DELETE' || isPending}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-3 rounded-xl transition disabled:opacity-50 inline-flex items-center justify-center gap-2"
                    >
                        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function AccountShell({ user, subscription, usage, referrals, documentCount, downloadHistory, paymentHistory, managementUrls }: AccountShellProps) {
    const { signOut } = useAuth()
    const [copied, setCopied] = useState(false)
    
    const referralLink = typeof window !== 'undefined' 
        ? `${window.location.origin}/?ref=${user.referralCode}`
        : `${process.env.NEXT_PUBLIC_APP_URL || ''}/?ref=${user.referralCode}`

    const handleCopyLink = () => {
        navigator.clipboard.writeText(referralLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }
    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
    const initialTab = (searchParams?.get('tab') as Tab) || 'overview'
    
    const [activeTab, setActiveTab] = useState<Tab>(
        TABS.some(t => t.id === initialTab) ? initialTab : 'overview'
    )
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    // ── Per-form pending state ─────────────────────────────────────────────
    const [profilePending, startProfileTransition] = useTransition()
    const [emailPending, startEmailTransition] = useTransition()
    const [passwordPending, startPasswordTransition] = useTransition()

    // ── Per-form feedback state ────────────────────────────────────────────
    const [profileState, setProfileState] = useState<any>(null)
    const [emailState, setEmailState] = useState<any>(null)
    const [passwordState, setPasswordState] = useState<any>(null)

    // ── Password form controlled state (for strength meter + match UX) ────
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const passwordFormRef = useRef<HTMLFormElement>(null)

    // ── Auto-clear success feedback after 5 seconds ────────────────────────
    useEffect(() => {
        if (profileState?.success) {
            const t = setTimeout(() => setProfileState(null), 5000)
            return () => clearTimeout(t)
        }
    }, [profileState])

    useEffect(() => {
        if (emailState?.success) {
            const t = setTimeout(() => setEmailState(null), 8000)
            return () => clearTimeout(t)
        }
    }, [emailState])

    // ── Client-side password match indicator ──────────────────────────────
    const passwordsMatch = confirmPassword.length === 0 || newPassword === confirmPassword

    const tier = subscription?.tier ?? null
    const tierName = tier?.name ?? 'free'
    const tierDisplay = tier?.display_name ?? 'Free Starter'
    const isFreeTier = tierName === 'free'
    const isPaid = !isFreeTier

    const aiLimit = tier?.ai_improvements_per_month ?? 5
    const docLimit = tier?.max_documents ?? 1

    const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    const periodEnd = subscription?.current_period_end
        ? new Date(subscription.current_period_end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : null

    // ── Handlers ──────────────────────────────────────────────────────────

    function handleProfileUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        startProfileTransition(async () => {
            const res = await updateProfile(fd)
            setProfileState(res)
        })
    }

    function handleEmailUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        startEmailTransition(async () => {
            const res = await updateEmail(fd)
            setEmailState(res)
        })
    }

    async function handlePasswordUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        // Client-side validation before server round-trip
        if (newPassword !== confirmPassword) {
            setPasswordState({ error: 'Passwords do not match.' })
            return
        }
        if (newPassword.length < 8) {
            setPasswordState({ error: 'Password must be at least 8 characters.' })
            return
        }

        // Re-authenticate with current password via Supabase client
        if (currentPassword) {
            const { error: reAuthError } = await supabase.auth.signInWithPassword({
                email: user.email,
                password: currentPassword,
            })
            if (reAuthError) {
                setPasswordState({ error: 'Current password is incorrect. Please try again.' })
                return
            }
        }

        const fd = new FormData()
        fd.set('password', newPassword)
        fd.set('confirmPassword', confirmPassword)

        startPasswordTransition(async () => {
            const res = await updatePassword(fd)
            setPasswordState(res)
            if (res?.success) {
                // Reset all password fields on success
                setCurrentPassword('')
                setNewPassword('')
                setConfirmPassword('')
                passwordFormRef.current?.reset()
            }
        })
    }

    // ── Tab Content ───────────────────────────────────────────────────────

    const tabContent: Record<Tab, React.ReactNode> = {

        // ── REFERRAL ────────────────────────────────────────────────────────
        referral: (
            <div className="space-y-6 max-w-2xl">
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-primary-500 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-4">
                            <Sparkles className="w-3 h-3" /> Referral Program
                        </div>
                        <h3 className="text-3xl font-black mb-2 tracking-tight">Give 5, Get 5.</h3>
                        <p className="text-neutral-300 font-medium mb-8 max-w-md">
                            Share Clear Career Path with your friends. They get 5 free AI credits when they sign up, and you get 5 too!
                        </p>

                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-neutral-400">Your unique referral link</label>
                            <div className="flex gap-2 p-1.5 bg-white/10 border border-white/10 rounded-2xl backdrop-blur-md">
                                <div className="flex-1 px-4 py-2.5 text-sm font-medium text-white/90 truncate">
                                    {referralLink}
                                </div>
                                <button
                                    onClick={handleCopyLink}
                                    className={cn(
                                        "flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg",
                                        copied ? "bg-emerald-500 text-white" : "bg-white text-neutral-900 hover:bg-neutral-100"
                                    )}
                                >
                                    {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Abstract background blobs */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-primary-500/20 rounded-full blur-[80px]" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-sm font-black text-neutral-900">{referrals.count}</div>
                                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Friends Referred</div>
                            </div>
                        </div>
                        <p className="text-xs text-neutral-500 leading-relaxed">
                            Every friend who joins using your link increases this count and earns you credits.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-sm font-black text-neutral-900">{referrals.totalBonusCredits}</div>
                                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Bonus Credits Earned</div>
                            </div>
                        </div>
                        <p className="text-xs text-neutral-500 leading-relaxed">
                            These credits are added to your monthly allowance and never expire.
                        </p>
                    </div>
                </div>

                <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6">
                    <h4 className="text-sm font-black text-neutral-900 mb-4 uppercase tracking-widest">How it works</h4>
                    <div className="space-y-4">
                        {[
                            { step: '01', title: 'Share your link', desc: 'Send your referral link to friends or post it on social media.' },
                            { step: '02', title: 'Friend signs up', desc: 'They get 5 free AI credits instantly upon account creation.' },
                            { step: '03', title: 'You get rewarded', desc: 'You receive 5 bonus AI credits for every successful referral.' },
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-4">
                                <span className="text-xl font-black text-neutral-200 tabular-nums">{item.step}</span>
                                <div>
                                    <div className="text-sm font-bold text-neutral-900">{item.title}</div>
                                    <div className="text-xs text-neutral-500">{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),

        // ── OVERVIEW ────────────────────────────────────────────────────────
        overview: (
            <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon={FileText} label="Documents" value={documentCount} sub={docLimit === null ? 'unlimited' : `of ${docLimit} allowed`} color="bg-primary-50 text-primary-600" />
                    <StatCard icon={Sparkles} label="AI Credits" value={(aiLimit || 0) + usage.bonusAICredits} sub={`${usage.aiCount} used this month`} color="bg-indigo-50 text-indigo-600" />
                    <StatCard icon={Download} label="Exports (this month)" value={usage.exportCount} sub={tier?.max_exports_per_month === null ? 'unlimited' : `of ${tier?.max_exports_per_month ?? 1} allowed`} color="bg-emerald-50 text-emerald-600" />
                    <StatCard icon={Users} label="Friends Referred" value={referrals.count} sub={`${referrals.totalBonusCredits} credits earned`} color="bg-rose-50 text-rose-600" />
                </div>

                {/* Plan & Usage Card */}
                <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
                    <div className={cn(
                        'px-6 py-5 flex items-center justify-between',
                        isPaid ? 'bg-gradient-to-r from-primary-600 to-indigo-700' : 'bg-neutral-100'
                    )}>
                        <div>
                            <div className={cn('text-xs font-black uppercase tracking-widest mb-1', isPaid ? 'text-primary-200' : 'text-neutral-400')}>
                                Current Plan
                            </div>
                            <div className={cn('text-2xl font-black', isPaid ? 'text-white' : 'text-neutral-800')}>
                                {tierDisplay}
                            </div>
                            {isPaid && periodEnd && (
                                <div className="text-primary-200 text-xs mt-1">
                                    Renews / Access until {periodEnd}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <TierBadge name={tierName} />
                            {isFreeTier && (
                                <Link href="/pricing" className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 hover:text-primary-700 transition">
                                    Upgrade <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        <SectionHeading>Monthly Usage</SectionHeading>
                        <UsageBar current={usage.aiCount} limit={aiLimit} label="AI Improvements" />
                        <UsageBar current={usage.exportCount} limit={tier?.max_exports_per_month ?? 1} label="Exports" />
                        <UsageBar current={documentCount} limit={docLimit} label="Documents" />
                    </div>
                </div>

                {/* Quick Links */}
                <div className="grid sm:grid-cols-3 gap-4">
                    {[
                        { label: 'Go to Dashboard', href: '/dashboard', icon: FileText, desc: 'Manage your resumes' },
                        { label: 'View Pricing', href: '/pricing', icon: Star, desc: 'Upgrade your plan' },
                    ].map(item => (
                        <Link key={item.href} href={item.href}
                            className="group bg-white rounded-2xl border border-neutral-200 p-5 hover:border-primary-300 hover:shadow-md transition-all flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 group-hover:bg-primary-100 transition">
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-bold text-neutral-900 text-sm group-hover:text-primary-600 transition">{item.label}</div>
                                <div className="text-xs text-neutral-400">{item.desc}</div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-neutral-300 ml-auto group-hover:text-primary-400 transition" />
                        </Link>
                    ))}
                </div>
            </div>
        ),

        // ── PROFILE ─────────────────────────────────────────────────────────
        profile: (
            <div className="space-y-6 max-w-lg">
                {/* Avatar */}
                <div className="flex items-center gap-5 p-6 bg-white rounded-2xl border border-neutral-200">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shrink-0 shadow-lg shadow-primary-200">
                        {(user.fullName || user.email).charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div className="font-bold text-neutral-900">{user.fullName || 'Your Name'}</div>
                        <div className="text-sm text-neutral-400">{user.email}</div>
                        <div className="text-xs text-neutral-400 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Member since {memberSince}
                        </div>
                    </div>
                </div>

                {/* Update Name */}
                <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                    <SectionHeading>Display Name</SectionHeading>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <FormInput label="Full Name" id="fullName" defaultValue={user.fullName} placeholder="Your full name" required />
                        <Feedback state={profileState} />
                        <button
                            type="submit"
                            disabled={profilePending}
                            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition disabled:opacity-60"
                        >
                            {profilePending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        ),

        // ── SECURITY ─────────────────────────────────────────────────────────
        security: (
            <div className="space-y-6 max-w-lg">
                {/* Change Email */}
                <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                    <SectionHeading>Change Email Address</SectionHeading>
                    <form onSubmit={handleEmailUpdate} className="space-y-4">
                        <div className="bg-neutral-50 rounded-xl px-4 py-3 text-sm text-neutral-500 border border-neutral-100 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                            Current: <span className="font-semibold text-neutral-700">{user.email}</span>
                        </div>
                        <FormInput label="New Email Address" id="email" type="email" placeholder="new@example.com" required />
                        <p className="text-xs text-neutral-400 -mt-1">
                            A verification link will be sent to your new address. Your email won&apos;t change until confirmed.
                        </p>
                        <Feedback state={emailState} />
                        <button
                            type="submit"
                            disabled={emailPending}
                            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition disabled:opacity-60"
                        >
                            {emailPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                            Send Verification Email
                        </button>
                    </form>
                </div>

                {/* Change Password */}
                <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                    <SectionHeading>Change Password</SectionHeading>
                    <form ref={passwordFormRef} onSubmit={handlePasswordUpdate} className="space-y-4">
                        <PasswordInput
                            label="Current Password"
                            id="currentPassword"
                            placeholder="Enter your current password"
                            required
                            value={currentPassword}
                            onChange={setCurrentPassword}
                        />
                        <PasswordInput
                            label="New Password"
                            id="password"
                            placeholder="Minimum 8 characters"
                            required
                            value={newPassword}
                            onChange={setNewPassword}
                        />
                        {newPassword.length > 0 && (
                            <PasswordStrength password={newPassword} />
                        )}
                        <div>
                            <PasswordInput
                                label="Confirm New Password"
                                id="confirmPassword"
                                placeholder="Re-enter new password"
                                required
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                            />
                            {confirmPassword.length > 0 && !passwordsMatch && (
                                <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                                    <AlertCircle className="w-3.5 h-3.5" /> Passwords don&apos;t match yet
                                </p>
                            )}
                            {confirmPassword.length > 0 && passwordsMatch && (
                                <p className="text-xs text-emerald-600 mt-1.5 flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Passwords match
                                </p>
                            )}
                        </div>
                        <Feedback state={passwordState} />
                        <button
                            type="submit"
                            disabled={passwordPending || !passwordsMatch || newPassword.length < 8}
                            className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition disabled:opacity-60"
                        >
                            {passwordPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                            Update Password
                        </button>
                    </form>
                </div>

                {/* Danger Zone */}
                <div className="bg-white rounded-2xl border border-red-100 p-6">
                    <SectionHeading>Danger Zone</SectionHeading>
                    <div className="space-y-3">
                        <button
                            onClick={() => signOut()}
                            className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 text-sm font-bold px-5 py-3 rounded-xl transition"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                        <button
                            onClick={() => setShowDeleteDialog(true)}
                            className="w-full flex items-center justify-center gap-2 border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 text-sm font-bold px-5 py-3 rounded-xl transition"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete My Account
                        </button>
                        <p className="text-xs text-neutral-400 text-center">
                            Deleting your account will permanently remove all your resumes and data.
                        </p>
                    </div>
                </div>
            </div>
        ),

        // ── BILLING ──────────────────────────────────────────────────────────
        billing: (
            <div className="space-y-6 max-w-lg">
                {/* Current Plan */}
                <div className={cn(
                    'rounded-2xl p-6',
                    isPaid
                        ? 'bg-gradient-to-r from-primary-600 to-indigo-700 text-white'
                        : 'bg-white border border-neutral-200'
                )}>
                    <SectionHeading>
                        <span className={isPaid ? 'text-primary-200' : ''}>Current Plan</span>
                    </SectionHeading>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className={cn('text-2xl font-black', isPaid ? 'text-white' : 'text-neutral-900')}>
                                {tierDisplay}
                            </div>
                            {tier?.price_monthly && (
                                <div className={cn('text-sm mt-1', isPaid ? 'text-primary-200' : 'text-neutral-400')}>
                                    ${tier.price_monthly}/month
                                </div>
                            )}
                            {subscription?.status && (
                                <span className={cn(
                                    'inline-flex items-center gap-1 text-xs font-bold mt-2 px-2 py-0.5 rounded-full',
                                    subscription.status === 'active'
                                        ? isPaid ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'
                                        : 'bg-red-100 text-red-700'
                                )}>
                                    <span className={cn('w-1.5 h-1.5 rounded-full inline-block', subscription.status === 'active' ? 'bg-emerald-400' : 'bg-red-400')} />
                                    {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                                </span>
                            )}
                        </div>
                        <TierBadge name={tierName} />
                    </div>
                    {periodEnd && (
                        <div className={cn('text-xs mt-4', isPaid ? 'text-primary-200' : 'text-neutral-400')}>
                            Access until {periodEnd}
                        </div>
                    )}
                </div>

                {/* Credits */}
                <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                    <SectionHeading>Pay-Per-Download Credits</SectionHeading>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                                <CreditCard className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                                <div className="text-3xl font-black text-neutral-900">{user.downloadCredits}</div>
                                <div className="text-sm text-neutral-400">Credits remaining</div>
                            </div>
                        </div>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition"
                        >
                            Buy More <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Upgrade CTA or Manage Sub */}
                {isFreeTier ? (
                    <div className="bg-neutral-950 rounded-2xl p-6 text-white text-center">
                        <Sparkles className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                        <h4 className="text-lg font-black mb-2">Unlock the Full Platform</h4>
                        <p className="text-neutral-400 text-sm mb-5">Unlimited exports, AI features, and premium templates.</p>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-3 rounded-xl transition w-full justify-center"
                        >
                            View Plans <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                        <SectionHeading>Manage Subscription</SectionHeading>
                        <p className="text-sm text-neutral-500 mb-4">
                            Update your payment method or cancel your subscription securely through Paddle.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {managementUrls?.updateUrl && (
                                <a
                                    href={managementUrls.updateUrl}
                                    target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition"
                                >
                                    <CreditCard className="w-4 h-4" /> Update Payment
                                </a>
                            )}
                            {managementUrls?.cancelUrl && (
                                <a
                                    href={managementUrls.cancelUrl}
                                    target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 text-sm font-bold px-4 py-2.5 rounded-xl transition"
                                >
                                    Cancel Subscription
                                </a>
                            )}
                            {!managementUrls && (
                                <a
                                    href="mailto:support@clearcareerpathway.com?subject=Subscription%20Management"
                                    className="inline-flex items-center gap-2 border border-neutral-200 text-neutral-700 hover:border-neutral-400 hover:text-neutral-900 text-sm font-bold px-4 py-2.5 rounded-xl transition"
                                >
                                    <Mail className="w-4 h-4" /> Contact Support
                                </a>
                            )}
                        </div>
                    </div>
                )}

                {/* Billing History Table */}
                <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
                    <div className="p-6 border-b border-neutral-100">
                        <SectionHeading>Billing History</SectionHeading>
                    </div>
                    {paymentHistory.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-neutral-50 text-neutral-500 font-bold uppercase tracking-widest text-[10px]">
                                    <tr>
                                        <th className="px-6 py-3">Date</th>
                                        <th className="px-6 py-3">Transaction</th>
                                        <th className="px-6 py-3">Amount</th>
                                        <th className="px-6 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100">
                                    {paymentHistory.map((item) => (
                                        <tr key={item.id} className="hover:bg-neutral-50/50 transition">
                                            <td className="px-6 py-4 text-neutral-600 font-medium">
                                                {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-4 font-mono text-[10px] text-neutral-400">
                                                {item.paddle_transaction_id || 'ID N/A'}
                                            </td>
                                            <td className="px-6 py-4 text-neutral-900 font-bold uppercase tracking-tight">
                                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: item.currency }).format(item.amount)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    'px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest',
                                                    item.status === 'succeeded' ? 'bg-emerald-100 text-emerald-700' :
                                                    item.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-neutral-100 text-neutral-500'
                                                )}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <Clock className="w-10 h-10 text-neutral-200 mx-auto mb-3" />
                            <p className="text-neutral-400 font-medium">No billing history found.</p>
                        </div>
                    )}
                </div>
            </div>
        ),

        // ── DOWNLOAD HISTORY ─────────────────────────────────────────────────
        history: (
            <div>
                {downloadHistory.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-neutral-200 p-16 text-center">
                        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Download className="w-8 h-8 text-neutral-300" />
                        </div>
                        <h4 className="font-bold text-neutral-700 mb-2">No downloads yet</h4>
                        <p className="text-sm text-neutral-400">Your exported files will appear here.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-neutral-50 border-b border-neutral-200">
                                    <th className="px-5 py-3.5 text-left text-xs font-black text-neutral-400 uppercase tracking-widest">Document</th>
                                    <th className="px-5 py-3.5 text-left text-xs font-black text-neutral-400 uppercase tracking-widest">Format</th>
                                    <th className="px-5 py-3.5 text-left text-xs font-black text-neutral-400 uppercase tracking-widest">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {downloadHistory.map(record => (
                                    <tr key={record.id} className="hover:bg-neutral-50 transition">
                                        <td className="px-5 py-4 font-medium text-neutral-800">
                                            {record.document?.title || 'Deleted document'}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={cn(
                                                'inline-flex items-center gap-1 uppercase text-xs font-bold px-2.5 py-1 rounded-full',
                                                record.format === 'pdf'
                                                    ? 'bg-red-50 text-red-600'
                                                    : record.format === 'docx'
                                                    ? 'bg-blue-50 text-blue-600'
                                                    : 'bg-neutral-100 text-neutral-500'
                                            )}>
                                                {record.format}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-neutral-400">
                                            {new Date(record.created_at).toLocaleDateString('en-US', {
                                                month: 'short', day: 'numeric', year: 'numeric'
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        ),
    }

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <>
            {showDeleteDialog && (
                <DeleteAccountDialog
                    onClose={() => setShowDeleteDialog(false)}
                    onConfirmed={() => {
                        setShowDeleteDialog(false)
                        signOut()
                    }}
                />
            )}

            <div className="min-h-screen bg-neutral-50 pt-20">
                {/* Page Header */}
                <div className="border-b border-neutral-200 bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary-200">
                                    {(user.fullName || user.email).charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black text-neutral-900 tracking-tight">
                                        {user.fullName || 'My Account'}
                                    </h1>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm text-neutral-400">{user.email}</span>
                                        <span className="text-neutral-200">·</span>
                                        <TierBadge name={tierName} />
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => signOut()}
                                className="hidden sm:flex items-center gap-2 text-sm font-semibold text-neutral-400 hover:text-red-500 transition"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>

                        {/* Tabs */}
                        <nav className="flex gap-1 mt-6 overflow-x-auto pb-1">
                            {TABS.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap',
                                        activeTab === tab.id
                                            ? 'bg-primary-600 text-white shadow-sm shadow-primary-200'
                                            : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700'
                                    )}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {tabContent[activeTab]}
                </div>
            </div>
        </>
    )
}
