'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { Button } from '@/components/ui/Button'
import {
    Menu, X, User, ChevronDown, LayoutDashboard, LogOut,
    FileText, CreditCard, Target, ArrowRight,
    Shield, Briefcase, GraduationCap, Palette, Stethoscope,
    LayoutGrid, Zap, Search, PenTool, Rocket, ScanSearch
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Template Mega-Menu Data ──────────────────────────────────────────────────

const TEMPLATE_CATEGORIES = [
    {
        label: 'ATS / Essential',
        icon: Shield,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        templates: [
            { name: 'ATS Professional', id: 'ats-professional' },
            { name: 'ATS Minimal', id: 'ats-minimal' },
            { name: 'ATS Classic', id: 'ats-classic' },
            { name: 'ATS Executive', id: 'ats-executive' },
        ]
    },
    {
        label: 'Modern / Clean',
        icon: Palette,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        templates: [
            { name: 'Modern Professional', id: 'ats-modern' },
            { name: 'ATS Timeline Pro', id: 'ats-timeline' },
            { name: 'ATS Dev-Console', id: 'ats-technical' },
            { name: 'Classic Clean', id: 'classic-clean' },
        ]
    },
    {
        label: 'Specialized Industry',
        icon: Stethoscope,
        color: 'text-rose-600',
        bg: 'bg-rose-50',
        templates: [
            { name: 'Nursing Professional', id: 'ats-nursing' },
            { name: 'Hospitality pro', id: 'ats-hospitality' },
            { name: 'ATS Scholar CV', id: 'ats-academia' },
            { name: 'ATS New Graduate', id: 'ats-graduate' },
        ]
    }
]

// ─── Templates Mega-Dropdown ──────────────────────────────────────────────────

function TemplatesMegaMenu({ onClose }: { onClose: () => void }) {
    return (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[760px] bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/80">
                <div>
                    <p className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em]">Template Gallery</p>
                    <p className="text-sm font-bold text-neutral-700 mt-0.5">High-Performance Resume Library — Full ATS Compliance</p>
                </div>
                <Link
                    href="/samples"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-xs font-black text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-full transition"
                >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    Browse All Samples
                </Link>
            </div>

            {/* Category grid */}
            <div className="grid grid-cols-3 divide-x divide-neutral-100">
                {TEMPLATE_CATEGORIES.map((cat) => (
                    <div key={cat.label} className="p-4">
                        {/* Category header */}
                        <div className={cn('inline-flex items-center gap-1.5 px-2 py-1 rounded-lg mb-3', cat.bg)}>
                            <cat.icon className={cn('w-3.5 h-3.5', cat.color)} />
                            <span className={cn('text-[10px] font-black uppercase tracking-wider', cat.color)}>
                                {cat.label}
                            </span>
                        </div>

                        {/* Template links */}
                        <ul className="space-y-0.5">
                            {cat.templates.map((tpl) => (
                                <li key={tpl.id}>
                                    <Link
                                        href={`/studio/${tpl.id}`}
                                        onClick={onClose}
                                        className="flex items-center justify-between group px-2 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors"
                                    >
                                        <span className="text-sm font-medium text-neutral-700 group-hover:text-primary-600 transition-colors">
                                            {tpl.name}
                                        </span>
                                        <ArrowRight className="w-3 h-3 text-neutral-300 group-hover:text-primary-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Footer CTA */}
            <div className="px-6 py-4 bg-gradient-to-r from-neutral-950 to-neutral-900 flex items-center justify-between">
                <div>
                    <p className="text-sm font-black text-white">Ready to build your resume?</p>
                    <p className="text-xs text-neutral-400 mt-0.5">Start with any template — switch anytime.</p>
                </div>
                <Link
                    href="/editor/setup"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-bold px-4 py-2 rounded-xl transition shrink-0"
                >
                    Get Started <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}

const PRODUCT_TOOLS = [
    {
        name: 'Resume Builder',
        description: 'Professional templates & AI-guided generation.',
        href: '/editor/setup',
        icon: FileText,
        color: 'text-blue-600',
        bg: 'bg-blue-50'
    },
    {
        name: 'Free ATS Scanner',
        description: 'Check if your resume passes applicant tracking systems.',
        href: '/ats-resume-scanner',
        icon: ScanSearch,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50'
    },
    {
        name: 'Industry Kits',
        description: 'Specialized kits for Tech, Healthcare, Graduates & Remote.',
        href: '/#kits',
        icon: Briefcase,
        color: 'text-rose-600',
        bg: 'bg-rose-50'
    },
    {
        name: 'Cover Letter Pro',
        description: 'Draft highly-tailored cover letters instantly.',
        href: '/editor/setup?type=cover_letter',
        icon: PenTool,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50'
    },
    {
        name: 'AI Career Coach',
        description: 'Real-time feedback on your professional story.',
        href: '/career-hub',
        icon: Rocket,
        color: 'text-purple-600',
        bg: 'bg-purple-50'
    },
    {
        name: 'Keyword Matcher',
        description: 'Analyze job postings to beat ATS filters.',
        href: '/career-hub',
        icon: Search,
        color: 'text-amber-600',
        bg: 'bg-amber-50'
    },
    {
        name: 'Job Tracker',
        description: 'A unified dashboard for all your applications.',
        href: '/dashboard',
        icon: Target,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50'
    }
]

function ToolsMegaMenu({ onClose }: { onClose: () => void }) {
    return (
        <div className="absolute top-full left-0 mt-3 w-[640px] bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
            <div className="grid grid-cols-2 p-4 gap-2">
                {PRODUCT_TOOLS.map((tool) => (
                    <Link
                        key={tool.name}
                        href={tool.href}
                        onClick={onClose}
                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-neutral-50 transition-all group"
                    >
                        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3', tool.bg)}>
                            <tool.icon className={cn('w-6 h-6', tool.color)} />
                        </div>
                        <div>
                            <p className="text-sm font-black text-neutral-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight italic">
                                {tool.name}
                            </p>
                            <p className="text-xs text-neutral-500 font-medium leading-relaxed mt-1">
                                {tool.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none">Complete Professional Toolkit</p>
                <Link href="/dashboard" onClick={onClose} className="text-xs font-black text-primary-600 hover:underline inline-flex items-center gap-1 uppercase tracking-widest">
                    Open Your Workspace <ArrowRight className="w-3 h-3" />
                </Link>
            </div>
        </div>
    )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export function Navbar() {
    const { user, signOut } = useAuth()
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
    const [isTemplateMenuOpen, setIsTemplateMenuOpen] = useState(false)
    const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const userDropdownRef = useRef<HTMLDivElement>(null)
    const templateMenuRef = useRef<HTMLDivElement>(null)
    const toolsMenuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close dropdowns on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
                setIsUserDropdownOpen(false)
            }
            if (templateMenuRef.current && !templateMenuRef.current.contains(event.target as Node)) {
                setIsTemplateMenuOpen(false)
            }
            if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target as Node)) {
                setIsToolsMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Close dropdowns on route change
    useEffect(() => {
        setIsMenuOpen(false)
        setIsUserDropdownOpen(false)
        setIsTemplateMenuOpen(false)
        setIsToolsMenuOpen(false)
    }, [pathname])

    const staticNavLinks = [
        { name: 'Resources', href: '/blog' },
        { name: 'Pricing', href: '/pricing' },
    ]

    const isActive = (href: string) => {
        if (href.startsWith('/#')) return pathname === '/'
        return pathname === href || pathname.startsWith(href + '/')
    }

    const isTemplatesActive =
        pathname === '/samples' ||
        pathname.startsWith('/studio') ||
        pathname === '/' // home has template gallery section

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
                isScrolled
                    ? 'bg-white/90 backdrop-blur-md border-neutral-200 py-3 shadow-sm'
                    : 'bg-white border-transparent py-5'
            )}
        >
            <div className="w-full px-6 lg:px-10">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(59,130,246,0.4)] group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-neutral-950 via-neutral-800 to-neutral-600 tracking-tighter leading-none">
                                Clear Career Path
                            </span>
                            <span className="text-[10px] font-black text-primary-600 uppercase tracking-[0.3em] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                Build Your Legacy
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-6">

                            {/* Templates — mega dropdown trigger */}
                            <div className="relative" ref={templateMenuRef}>
                                <button
                                    onClick={() => setIsTemplateMenuOpen(v => !v)}
                                    className={cn(
                                        'flex items-center gap-1 text-sm font-semibold transition-all hover:text-primary-600 relative py-1',
                                        isTemplatesActive ? 'text-primary-600' : 'text-neutral-600'
                                    )}
                                    aria-expanded={isTemplateMenuOpen}
                                    aria-haspopup="true"
                                >
                                    Templates
                                    <ChevronDown className={cn(
                                        'w-3.5 h-3.5 transition-transform duration-200',
                                        isTemplateMenuOpen && 'rotate-180'
                                    )} />
                                    {isTemplatesActive && !isTemplateMenuOpen && (
                                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 rounded-full" />
                                    )}
                                </button>

                                {isTemplateMenuOpen && (
                                    <TemplatesMegaMenu onClose={() => setIsTemplateMenuOpen(false)} />
                                )}
                            </div>

                            {/* Tools & Services — dropdown trigger */}
                            <div className="relative" ref={toolsMenuRef}>
                                <button
                                    onClick={() => {
                                        setIsToolsMenuOpen(v => !v)
                                        setIsTemplateMenuOpen(false)
                                    }}
                                    className={cn(
                                        'flex items-center gap-1 text-sm font-semibold transition-all hover:text-primary-600 relative py-1',
                                        isToolsMenuOpen ? 'text-primary-600' : 'text-neutral-600'
                                    )}
                                    aria-expanded={isToolsMenuOpen}
                                    aria-haspopup="true"
                                >
                                    Tools &amp; Services
                                    <ChevronDown className={cn(
                                        'w-3.5 h-3.5 transition-transform duration-200',
                                        isToolsMenuOpen && 'rotate-180'
                                    )} />
                                </button>

                                {isToolsMenuOpen && (
                                    <ToolsMegaMenu onClose={() => setIsToolsMenuOpen(false)} />
                                )}
                            </div>

                            {/* Static nav links */}
                            {staticNavLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        'text-sm font-semibold transition-all hover:text-primary-600 relative py-1',
                                        isActive(link.href)
                                            ? 'text-primary-600'
                                            : 'text-neutral-600'
                                    )}
                                >
                                    {link.name}
                                    {isActive(link.href) && (
                                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 rounded-full animate-in fade-in zoom-in duration-300" />
                                    )}
                                </Link>
                            ))}
                        </div>

                        <div className="h-6 w-px bg-neutral-200 mx-2" />

                        {user ? (
                            <div className="relative" ref={userDropdownRef}>
                                <button
                                    onClick={() => setIsUserDropdownOpen(v => !v)}
                                    className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-all shadow-sm"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-sm ring-2 ring-white">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col items-start pr-1 max-w-[100px]">
                                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter leading-none">Account</span>
                                        <ChevronDown className={cn('w-3.5 h-3.5 text-neutral-500 transition-transform', isUserDropdownOpen && 'rotate-180')} />
                                    </div>
                                </button>

                                {isUserDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-neutral-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                                        <div className="px-5 py-4 bg-neutral-50/50 border-b border-neutral-100 mb-2">
                                            <p className="text-[10px] text-primary-600 font-black uppercase tracking-[0.2em] mb-1">Authenticated As</p>
                                            <p className="text-sm font-bold text-neutral-900 truncate">{user.email}</p>
                                        </div>
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-all"
                                            onClick={() => setIsUserDropdownOpen(false)}
                                        >
                                            <LayoutDashboard className="w-4 h-4" />
                                            Active Dashboard
                                        </Link>
                                        <Link
                                            href="/career-hub"
                                            className={cn(
                                                'flex items-center gap-3 px-5 py-3 text-sm font-medium transition-all',
                                                pathname.startsWith('/career-hub')
                                                    ? 'bg-primary-50 text-primary-700 font-bold'
                                                    : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-700'
                                            )}
                                            onClick={() => setIsUserDropdownOpen(false)}
                                        >
                                            <Target className="w-4 h-4" />
                                            Career Studio
                                        </Link>
                                        <Link
                                            href="/account"
                                            className={cn(
                                                'flex items-center gap-3 px-5 py-3 text-sm font-medium transition-all',
                                                pathname.startsWith('/account')
                                                    ? 'bg-primary-50 text-primary-700 font-bold'
                                                    : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-700'
                                            )}
                                            onClick={() => setIsUserDropdownOpen(false)}
                                        >
                                            <User className="w-4 h-4" />
                                            My Account
                                        </Link>
                                        <Link
                                            href="/account?tab=billing"
                                            className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-all"
                                            onClick={() => setIsUserDropdownOpen(false)}
                                        >
                                            <CreditCard className="w-4 h-4" />
                                            Billing &amp; Plan
                                        </Link>
                                        <div className="my-1 border-t border-neutral-50" />
                                        <button
                                            onClick={() => {
                                                signOut()
                                                setIsUserDropdownOpen(false)
                                            }}
                                            className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-danger-600 hover:bg-danger-50 transition-all"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/auth/login"
                                    className="text-sm font-semibold text-neutral-600 hover:text-neutral-900 px-2"
                                >
                                    Log In
                                </Link>
                                <Link href="/auth/signup">
                                    <Button size="sm" className="rounded-full px-6 shadow-md hover:shadow-lg transition-all font-bold">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        {user && (
                            <Link href="/dashboard" className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white shadow-sm ring-2 ring-white">
                                <User className="w-4 h-4" />
                            </Link>
                        )}
                        <button
                            onClick={() => setIsMenuOpen(v => !v)}
                            className="p-2 text-neutral-600 hover:text-neutral-900 bg-neutral-100 rounded-lg"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-neutral-200 absolute top-full left-0 right-0 py-8 px-6 flex flex-col gap-5 animate-in fade-in slide-in-from-top-4 duration-300 shadow-2xl max-h-[80vh] overflow-y-auto">

                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] px-2">Templates</p>
                    <Link
                        href="/samples"
                        className={cn(
                            'text-lg font-bold px-2 py-1 flex items-center gap-3 rounded-lg transition-colors',
                            pathname === '/samples' ? 'text-primary-600 bg-primary-50' : 'text-neutral-900'
                        )}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <LayoutGrid className="w-5 h-5 text-primary-500" />
                        Browse All Samples
                    </Link>

                    {/* Collapsed category list on mobile */}
                    <div className="grid grid-cols-1 gap-2 px-2">
                        {TEMPLATE_CATEGORIES.map(cat => (
                            <Link
                                key={cat.label}
                                href={`/studio/${cat.templates[0].id}`}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-2 p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors"
                            >
                                <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center', cat.bg)}>
                                    <cat.icon className={cn('w-4 h-4', cat.color)} />
                                </div>
                                <span className="text-xs font-bold text-neutral-700 leading-tight">{cat.label}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="h-px bg-neutral-100" />

                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] px-2">Services &amp; Tools</p>
                    <div className="flex flex-col gap-1 px-2">
                        {PRODUCT_TOOLS.map(tool => (
                            <Link
                                key={tool.name}
                                href={tool.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50"
                            >
                                <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', tool.bg)}>
                                    <tool.icon className={cn('w-5 h-5', tool.color)} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-neutral-900 leading-none">{tool.name}</span>
                                    <span className="text-[10px] text-neutral-500 mt-1">{tool.description}</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="h-px bg-neutral-100" />

                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] px-2">Navigation</p>
                    {staticNavLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                'text-lg font-bold px-2 py-1 rounded-lg transition-colors',
                                isActive(link.href) ? 'text-primary-600 bg-primary-50' : 'text-neutral-900'
                            )}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="h-px bg-neutral-100 my-2" />

                    {user ? (
                        <>
                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] px-2">User Workspace</p>
                            <Link
                                href="/dashboard"
                                className="text-lg font-bold text-neutral-900 px-2 py-1 flex items-center gap-3"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <LayoutDashboard className="w-5 h-5 text-primary-500" />
                                Dashboard
                            </Link>
                            <Link
                                href="/career-hub"
                                className={cn(
                                    'text-lg font-bold px-2 py-1 flex items-center gap-3',
                                    pathname.startsWith('/career-hub') ? 'text-primary-600' : 'text-neutral-900'
                                )}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Target className="w-5 h-5 text-primary-500" />
                                Career Studio
                            </Link>
                            <Link
                                href="/account"
                                className={cn(
                                    'text-lg font-bold px-2 py-1 flex items-center gap-3',
                                    pathname.startsWith('/account') ? 'text-primary-600' : 'text-neutral-900'
                                )}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <User className="w-5 h-5 text-primary-500" />
                                My Account
                            </Link>
                            <Link
                                href="/pricing"
                                className="text-lg font-bold text-neutral-900 px-2 py-1 flex items-center gap-3"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <CreditCard className="w-5 h-5 text-primary-500" />
                                Billing &amp; Plan
                            </Link>
                            <button
                                onClick={() => {
                                    signOut()
                                    setIsMenuOpen(false)
                                }}
                                className="text-lg font-bold text-danger-600 px-2 py-1 text-left flex items-center gap-3 mt-4"
                            >
                                <LogOut className="w-5 h-5" />
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-4 mt-2">
                            <Link
                                href="/auth/login"
                                className="text-lg font-bold text-neutral-900 px-2 text-center py-4 border border-neutral-200 rounded-xl"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Log In
                            </Link>
                            <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                                <Button className="w-full py-7 text-lg rounded-xl shadow-xl shadow-primary-200 font-bold">Get Started Free</Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}
