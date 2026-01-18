'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { Button } from '@/components/ui/Button'
import { Menu, X, User, ChevronDown, LayoutDashboard, LogOut, FileText, CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Navbar() {
    const { user, signOut } = useAuth()
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Templates', href: '/#templates' },
        { name: 'Pricing', href: '/pricing' },
    ]

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
                isScrolled
                    ? 'bg-white/80 backdrop-blur-md border-neutral-200 py-3 shadow-sm'
                    : 'bg-transparent border-transparent py-5'
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
                                        'text-sm font-medium transition-colors hover:text-primary-600',
                                        pathname === link.href ? 'text-primary-600' : 'text-neutral-600'
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="h-6 w-px bg-neutral-200 mx-2" />

                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-all"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-sm">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <ChevronDown className={cn("w-4 h-4 text-neutral-500 transition-transform", isDropdownOpen && "rotate-180")} />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="px-4 py-2 border-b border-neutral-50 mb-1">
                                            <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Account</p>
                                            <p className="text-sm font-semibold text-neutral-900 truncate">{user.email}</p>
                                        </div>
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <LayoutDashboard className="w-4 h-4 text-neutral-400" />
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/pricing"
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <CreditCard className="w-4 h-4 text-neutral-400" />
                                            Subscription
                                        </Link>
                                        <button
                                            onClick={() => {
                                                signOut()
                                                setIsDropdownOpen(false)
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-danger-600 hover:bg-danger-50 transition-colors border-t border-neutral-50 mt-1"
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
                                    className="text-sm font-medium text-neutral-600 hover:text-neutral-900 px-2"
                                >
                                    Log In
                                </Link>
                                <Link href="/auth/signup">
                                    <Button size="sm" className="rounded-full px-6 shadow-md hover:shadow-lg transition-all">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        {user && (
                            <Link href="/dashboard" className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                                <User className="w-5 h-5" />
                            </Link>
                        )}
                        <button
                            onClick={toggleMenu}
                            className="p-2 text-neutral-600 hover:text-neutral-900"
                        >
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-neutral-200 absolute top-full left-0 right-0 py-6 px-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-lg font-medium text-neutral-900 px-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="h-px bg-neutral-100 my-2" />
                    {user ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="text-lg font-medium text-neutral-900 px-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={() => {
                                    signOut()
                                    setIsMenuOpen(false)
                                }}
                                className="text-lg font-medium text-danger-600 px-2 text-left"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <Link
                                href="/auth/login"
                                className="text-lg font-medium text-neutral-900 px-2 text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Log In
                            </Link>
                            <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                                <Button className="w-full">Get Started</Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}
