'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { Button } from '@/components/ui/Button'
import { Menu, X, User, ChevronDown, LayoutDashboard, LogOut, FileText, CreditCard, Target } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Navbar() {
    const { user, signOut } = useAuth()
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Click outside dropdown handler
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [dropdownRef])

    const navLinks = [
        { name: 'Templates', href: '/#templates' },
        { name: 'Career Studio', href: '/career-hub' },
        { name: 'Samples', href: '/samples' },
        { name: 'Pricing', href: '/pricing' },
    ]

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

    const isActive = (href: string) => {
        if (href.startsWith('/#')) {
            return pathname === '/'
        }
        return pathname === href
    }

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
                isScrolled
                    ? 'bg-white/90 backdrop-blur-md border-neutral-200 py-3 shadow-sm'
                    : 'bg-white border-transparent py-5'
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600">
                            Clear Career Path
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-6">
                            {navLinks.map((link) => (
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
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-all shadow-sm"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-sm ring-2 ring-white">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col items-start pr-1 max-w-[100px]">
                                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter leading-none">Account</span>
                                        <ChevronDown className={cn("w-3.5 h-3.5 text-neutral-500 transition-transform", isDropdownOpen && "rotate-180")} />
                                    </div>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-neutral-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                                        <div className="px-5 py-4 bg-neutral-50/50 border-b border-neutral-100 mb-2">
                                            <p className="text-[10px] text-primary-600 font-black uppercase tracking-[0.2em] mb-1">Authenticated As</p>
                                            <p className="text-sm font-bold text-neutral-900 truncate">{user.email}</p>
                                        </div>
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-all"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <LayoutDashboard className="w-4 h-4" />
                                            Active Dashboard
                                        </Link>
                                        <Link
                                            href="/career-hub"
                                            className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-all"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <Target className="w-4 h-4" />
                                            Career Studio
                                        </Link>
                                        <Link
                                            href="/pricing"
                                            className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-all"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <CreditCard className="w-4 h-4" />
                                            Subscription & Billing
                                        </Link>
                                        <div className="my-1 border-t border-neutral-50" />
                                        <button
                                            onClick={() => {
                                                signOut()
                                                setIsDropdownOpen(false)
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
                            onClick={toggleMenu}
                            className="p-2 text-neutral-600 hover:text-neutral-900 bg-neutral-100 rounded-lg"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-neutral-200 absolute top-full left-0 right-0 py-8 px-6 flex flex-col gap-5 animate-in fade-in slide-in-from-top-4 duration-300 shadow-2xl">
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] px-2">Navigation</p>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-lg font-bold px-2 py-1 rounded-lg transition-colors",
                                isActive(link.href) ? "text-primary-600 bg-primary-50" : "text-neutral-900"
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
                                href="/pricing"
                                className="text-lg font-bold text-neutral-900 px-2 py-1 flex items-center gap-3"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <CreditCard className="w-5 h-5 text-primary-500" />
                                Subscription
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
