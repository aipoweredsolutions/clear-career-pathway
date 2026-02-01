import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer'
import { ResumeDocument } from '@/lib/types/resume'

/**
 * Dynamic PDF Template Generator
 * Supports multiple template styles based on templateId
 * Matches the preview templates for download consistency
 */

Font.register({
    family: 'Inter',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2' },
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2', fontWeight: 'bold' },
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontStyle: 'italic' },
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2', fontWeight: 'bold', fontStyle: 'italic' }
    ]
})

Font.register({
    family: 'Lora',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/lora/v23/0QI6MX1D_JOuAwHTJED0.woff2' },
        { src: 'https://fonts.gstatic.com/s/lora/v23/0QI6MX1D_JOuAwHTJED0.woff2', fontWeight: 'bold' },
        { src: 'https://fonts.gstatic.com/s/lora/v23/0QI6MX1D_JOuAwHTJED0.woff2', fontStyle: 'italic' },
        { src: 'https://fonts.gstatic.com/s/lora/v23/0QI6MX1D_JOuAwHTJED0.woff2', fontWeight: 'bold', fontStyle: 'italic' }
    ]
})

// Helper to get template colors based on templateId
const getTemplateColors = (templateId: string) => {
    const id = templateId.toLowerCase()

    // New ATS Series
    if (id.startsWith('ats-')) {
        if (id.includes('black')) return { primary: '#1a1a1a', secondary: '#4b5563', text: '#1a1a1a', border: '#374151' }
        if (id.includes('navy')) return { primary: '#1e3a8a', secondary: '#3b82f6', text: '#1a1a1a', border: '#1e3a8a' }
        if (id.includes('charcoal')) return { primary: '#374151', secondary: '#6b7280', text: '#1a1a1a', border: '#374151' }
        if (id.includes('blue')) return { primary: '#2563eb', secondary: '#3b82f6', text: '#1a1a1a', border: '#2563eb' }
        if (id.includes('green') || id.includes('matrix') || id.includes('campus')) return { primary: '#064e3b', secondary: '#10b981', text: '#1a1a1a', border: '#065f46' }
        if (id.includes('gold')) return { primary: '#92400e', secondary: '#d97706', text: '#1a1a1a', border: '#b45309' }
        if (id.includes('cyan')) return { primary: '#0891b2', secondary: '#22d3ee', text: '#1a1a1a', border: '#0891b2' }
        if (id.includes('orange')) return { primary: '#ea580c', secondary: '#fb923c', text: '#1a1a1a', border: '#ea580c' }
        if (id.includes('violet')) return { primary: '#7c3aed', secondary: '#8b5cf6', text: '#1a1a1a', border: '#7c3aed' }
        if (id.includes('teal')) return { primary: '#0d9488', secondary: '#2dd4bf', text: '#1a1a1a', border: '#0d9488' }
        if (id.includes('slate')) return { primary: '#475569', secondary: '#64748b', text: '#1a1a1a', border: '#475569' }
        if (id.includes('maroon')) return { primary: '#9f1239', secondary: '#e11d48', text: '#1a1a1a', border: '#9f1239' }

        // Base fallbacks
        if (id.startsWith('ats-classic')) return { primary: '#1a1a1a', secondary: '#4b5563', text: '#1a1a1a', border: '#374151' }
        if (id.startsWith('ats-minimal')) return { primary: '#000000', secondary: '#9ca3af', text: '#1a1a1a', border: '#e5e7eb' }
        if (id.startsWith('ats-executive')) return { primary: '#111827', secondary: '#b45309', text: '#1a1a1a', border: '#111827' }
        if (id.startsWith('ats-technical')) return { primary: '#000000', secondary: '#064e3b', text: '#1a1a1a', border: '#171717' }
        if (id.startsWith('ats-modern')) return { primary: '#111827', secondary: '#2563eb', text: '#1a1a1a', border: '#e5e7eb' }
        if (id.startsWith('ats-graduate')) return { primary: '#1e3a8a', secondary: '#9f1239', text: '#1a1a1a', border: '#1e3a8a' }
        if (id.startsWith('ats-timeline')) return { primary: '#0f172a', secondary: '#475569', text: '#1a1a1a', border: '#0f172a' }
        if (id.startsWith('ats-standard')) return { primary: '#111827', secondary: '#475569', text: '#1a1a1a', border: '#f1f5f9' }
        return { primary: '#1a1a1a', secondary: '#3b82f6', text: '#1a1a1a', border: '#e5e7eb' }
    }

    // Hospitality & Service
    if (id.startsWith('hospitality') || id.startsWith('cruise') || id.startsWith('service')) {
        // Cruise
        if (id.includes('ocean')) return { primary: '#0369a1', secondary: '#0ea5e9', text: '#0c4a6e', border: '#bae6fd', sidebarBg: '#f0f9ff' }
        if (id.includes('anchor')) return { primary: '#334155', secondary: '#64748b', text: '#0f172a', border: '#cbd5e1', sidebarBg: '#f8fafc' }
        if (id.includes('coral')) return { primary: '#e11d48', secondary: '#f43f5e', text: '#881337', border: '#fecdd3', sidebarBg: '#fff1f2' }
        if (id.includes('white')) return { primary: '#475569', secondary: '#94a3b8', text: '#1e293b', border: '#e2e8f0', sidebarBg: '#ffffff' }
        if (id.includes('navy') || id.startsWith('cruise')) return { primary: '#0f172a', secondary: '#334155', text: '#0f172a', border: '#e2e8f0', sidebarBg: '#f1f5f9' }

        // Service
        if (id.includes('teal')) return { primary: '#0d9488', secondary: '#14b8a6', text: '#134e4a', border: '#ccfbf1', sidebarBg: '#f0fdfa' }
        if (id.includes('orange')) return { primary: '#ea580c', secondary: '#f97316', text: '#7c2d12', border: '#ffedd5', sidebarBg: '#fff7ed' }
        if (id.includes('purple')) return { primary: '#7c3aed', secondary: '#8b5cf6', text: '#4c1d95', border: '#ede9fe', sidebarBg: '#f5f3ff' }
        if (id.includes('slate')) return { primary: '#475569', secondary: '#64748b', text: '#1e293b', border: '#e2e8f0', sidebarBg: '#f8fafc' }

        // Hospitality
        if (id.includes('gold')) return { primary: '#b45309', secondary: '#d97706', text: '#1a1a1a', border: '#fcd34d' }
        if (id.includes('black')) return { primary: '#1a1a1a', secondary: '#4b5563', text: '#1a1a1a', border: '#e5e7eb' }
        if (id.startsWith('service')) return { primary: '#1f2937', secondary: '#4b5563', text: '#1a1a1a', border: '#e5e7eb', sidebarBg: '#1f2937', sidebarText: '#ffffff' }

        return { primary: '#b45309', secondary: '#d97706', text: '#1a1a1a', border: '#fcd34d' }
    }

    // Modern / Professional / Minimal with Sidebar or explicit accent
    if (id.startsWith('modern') || id.startsWith('professional') || id.startsWith('minimal') || id.startsWith('compact') || id.startsWith('graduate')) {
        if (id.includes('black')) return { primary: '#111827', secondary: '#4b5563', text: '#1f2937', border: '#111827', sidebarBg: '#111827', sidebarText: '#ffffff' }
        if (id.includes('teal')) return { primary: '#134e4a', secondary: '#14b8a6', text: '#1f2937', border: '#134e4a', sidebarBg: '#134e4a', sidebarText: '#ffffff' }
        if (id.includes('slate')) return { primary: '#0f172a', secondary: '#64748b', text: '#1f2937', border: '#0f172a', sidebarBg: '#0f172a', sidebarText: '#ffffff' }
        if (id.includes('navy')) return { primary: '#0f172a', secondary: '#334155', text: '#1f2937', border: '#0f172a', sidebarBg: '#0f172a', sidebarText: '#ffffff' }
        if (id.includes('charcoal')) return { primary: '#374151', secondary: '#6b7280', text: '#1f2937', border: '#374151', sidebarBg: '#374151', sidebarText: '#ffffff' }
        if (id.includes('blue')) return { primary: '#1e3a8a', secondary: '#3b82f6', text: '#1f2937', border: '#1e3a8a', sidebarBg: '#1e3a8a', sidebarText: '#ffffff' }
        if (id.includes('green') || id.includes('emerald')) return { primary: '#064e3b', secondary: '#10b981', text: '#1f2937', border: '#064e3b', sidebarBg: '#064e3b', sidebarText: '#ffffff' }
        if (id.includes('violet') || id.includes('purple')) return { primary: '#4c1d95', secondary: '#8b5cf6', text: '#1f2937', border: '#4c1d95', sidebarBg: '#4c1d95', sidebarText: '#ffffff' }
        if (id.includes('maroon') || id.includes('rose')) return { primary: '#881337', secondary: '#f43f5e', text: '#1f2937', border: '#881337', sidebarBg: '#881337', sidebarText: '#ffffff' }

        if (id.startsWith('modern')) return { primary: '#0f172a', secondary: '#64748b', text: '#1f2937', border: '#0f172a', sidebarBg: '#0f172a', sidebarText: '#ffffff' }
        if (id.startsWith('professional')) return { primary: '#0f172a', secondary: '#64748b', text: '#1f2937', border: '#0f172a' }
        if (id.startsWith('minimal')) return { primary: '#1a1a1a', secondary: '#737373', text: '#1a1a1a', border: '#e5e7eb' }
    }

    // Classic / Standard
    if (id.startsWith('classic')) {
        if (id.includes('black')) return { primary: '#000000', secondary: '#4b5563', text: '#1a1a1a', border: '#000000' }
        if (id.includes('blue')) return { primary: '#1e3a8a', secondary: '#3b82f6', text: '#1a1a1a', border: '#3b82f6' }
        if (id.includes('green')) return { primary: '#065f46', secondary: '#10b981', text: '#1a1a1a', border: '#10b981' }
        if (id.includes('rose') || id.includes('red')) return { primary: '#881337', secondary: '#f43f5e', text: '#1a1a1a', border: '#f43f5e' }
        if (id.includes('purple') || id.includes('violet')) return { primary: '#5b21b6', secondary: '#8b5cf6', text: '#1a1a1a', border: '#8b5cf6' }
        if (id.includes('navy')) return { primary: '#312783', secondary: '#6366f1', text: '#1a1a1a', border: '#6366f1' }
        return { primary: '#1e3a8a', secondary: '#3b82f6', text: '#1a1a1a', border: '#3b82f6' }
    }

    // Technical / Startup (Dark Sidebar/Header)
    if (id.startsWith('technical') || id.startsWith('startup')) {
        // Startup Colors
        if (id.includes('vibrant') || id.includes('blue')) return { primary: '#2563eb', secondary: '#60a5fa', text: '#1e40af', border: '#bfdbfe', sidebarBg: '#eff6ff' }
        if (id.includes('electric') || id.includes('purple')) return { primary: '#9333ea', secondary: '#c084fc', text: '#6b21a8', border: '#e9d5ff', sidebarBg: '#faf5ff' }
        if (id.includes('cyber') || id.includes('lime') || id.includes('green')) return { primary: '#84cc16', secondary: '#a3e635', text: '#3f6212', border: '#d9f99d', sidebarBg: '#f7fee7' }
        if (id.includes('hot-pink') || id.includes('pink')) return { primary: '#f43f5e', secondary: '#fb7185', text: '#be123c', border: '#fecdd3', sidebarBg: '#fff1f2' }

        if (id.includes('black')) return { primary: '#000000', secondary: '#71717a', text: '#f9fafb', border: '#27272a', sidebarBg: '#000000' }
        if (id.includes('dark')) return { primary: '#111827', secondary: '#6366f1', text: '#f9fafb', border: '#374151', sidebarBg: '#030712' }
        if (id.includes('devops')) return { primary: '#064e3b', secondary: '#10b981', text: '#f0fdf4', border: '#065f46', sidebarBg: '#052c22' }
        if (id.includes('slate')) return { primary: '#1e293b', secondary: '#94a3b8', text: '#f8fafc', border: '#334155', sidebarBg: '#0f172a' }
        return { primary: '#111827', secondary: '#6366f1', text: '#111827', border: '#e5e7eb', sidebarBg: '#f8fafc' }
    }

    // Executive variants
    if (id.startsWith('executive') || id.startsWith('luxe')) {
        if (id.includes('black')) return { primary: '#000000', secondary: '#71717a', text: '#1a1a1a', border: '#27272a' }
        if (id.includes('gold')) return { primary: '#92400e', secondary: '#d97706', text: '#1a1a1a', border: '#f59e0b' }
        if (id.includes('emerald')) return { primary: '#064e3b', secondary: '#10b981', text: '#1a1a1a', border: '#34d399' }
        if (id.includes('charcoal')) return { primary: '#1e293b', secondary: '#64748b', text: '#1a1a1a', border: '#cbd5e1' }
        if (id.includes('navy')) return { primary: '#0f172a', secondary: '#3b82f6', text: '#1a1a1a', border: '#1e3a8a' }
        return { primary: '#1e3a8a', secondary: '#3b82f6', text: '#1a1a1a', border: '#cbd5e1' }
    }

    // Cute variants
    if (id.startsWith('cute')) {
        if (id.includes('black')) return { primary: '#111827', secondary: '#6b7280', text: '#111827', border: '#e5e7eb', headerBg: '#f9fafb' }
        if (id.includes('pink')) return { primary: '#db2777', secondary: '#fbcfe8', text: '#831843', border: '#f9a8d4', headerBg: '#fdf2f8' }
        if (id.includes('mint')) return { primary: '#0d9488', secondary: '#ccfbf1', text: '#134e4a', border: '#99f6e4', headerBg: '#f0fdfa' }
        if (id.includes('lavender')) return { primary: '#7c3aed', secondary: '#e9d5ff', text: '#4c1d95', border: '#ddd6fe', headerBg: '#f5f3ff' }
        if (id.includes('peach')) return { primary: '#ea580c', secondary: '#ffedd5', text: '#7c2d12', border: '#fed7aa', headerBg: '#fff7ed' }
        return { primary: '#db2777', secondary: '#fbcfe8', text: '#831843', border: '#f9a8d4', headerBg: '#fdf2f8' }
    }

    // Chic / Artisan (Clean, Typography focused)
    if (id.startsWith('chic') || id.startsWith('artisan')) {
        if (id.includes('black')) return { primary: '#000000', secondary: '#404040', text: '#1a1a1a', border: '#d4d4d4' }
        if (id.includes('navy')) return { primary: '#0f172a', secondary: '#334155', text: '#1a1a1a', border: '#cbd5e1' }
        if (id.includes('slate')) return { primary: '#1e293b', secondary: '#64748b', text: '#1a1a1a', border: '#cbd5e1' }
        if (id.includes('charcoal')) return { primary: '#171717', secondary: '#525252', text: '#1a1a1a', border: '#e5e7eb' }
        if (id.includes('serif')) return { primary: '#1a1a1a', secondary: '#737373', text: '#1a1a1a', border: '#e5e7eb' }
        if (id.includes('sage')) return { primary: '#064e3b', secondary: '#374151', text: '#1a1a1a', border: '#d1fae5' }
        if (id.includes('terracotta')) return { primary: '#7c2d12', secondary: '#4b5563', text: '#1a1a1a', border: '#fdba74' }
        if (id.includes('clay')) return { primary: '#78716c', secondary: '#57534e', text: '#1a1a1a', border: '#e7e5e4' }
        return { primary: '#1a1a1a', secondary: '#737373', text: '#1a1a1a', border: '#e5e7eb' }
    }

    // Academic (Dense, publications-focused)
    if (id.startsWith('academic')) {
        if (id.includes('black')) return { primary: '#000000', secondary: '#404040', text: '#1a1a1a', border: '#d4d4d4' }
        if (id.includes('navy')) return { primary: '#1e3a8a', secondary: '#3b82f6', text: '#1a1a1a', border: '#1e3a8a' }
        if (id.includes('maroon')) return { primary: '#7f1d1d', secondary: '#ef4444', text: '#1a1a1a', border: '#7f1d1d' }
        return { primary: '#1a1a1a', secondary: '#4b5563', text: '#1a1a1a', border: '#d1d5db' }
    }

    // Creative / Split-Contrast
    if (id.startsWith('creative') || id.startsWith('split-contrast')) {
        if (id.includes('black')) return { primary: '#000000', secondary: '#525252', text: '#1a1a1a', border: '#d4d4d4', sidebarBg: '#f5f5f5', sidebarText: '#000000' }
        if (id.includes('rose') || id.includes('pink') || id === 'creative' || id.includes('nursing')) return { primary: '#e11d48', secondary: '#fb7185', text: '#1a1a1a', border: '#fda4af', sidebarBg: '#fff1f2', sidebarText: '#881337' }
        if (id.includes('purple')) return { primary: '#7c3aed', secondary: '#8b5cf6', text: '#1a1a1a', border: '#ddd6fe', sidebarBg: '#f5f3ff', sidebarText: '#4c1d95' }
        if (id.includes('orange')) return { primary: '#ea580c', secondary: '#f97316', text: '#1a1a1a', border: '#fed7aa', sidebarBg: '#fff7ed', sidebarText: '#7c2d12' }
        if (id.includes('indigo')) return { primary: '#4f46e5', secondary: '#818cf8', text: '#1a1a1a', border: '#c7d2fe', sidebarBg: '#eef2ff', sidebarText: '#312e81' }

        // Split-contrast specific themes
        if (id.includes('warm')) return { primary: '#1c1917', secondary: '#78716c', text: '#1a1a1a', border: '#e7e5e4', sidebarBg: '#fafaf9', sidebarText: '#1c1917' }
        if (id.includes('slate')) return { primary: '#0f172a', secondary: '#64748b', text: '#1a1a1a', border: '#e2e8f0', sidebarBg: '#f8fafc', sidebarText: '#0f172a' }
        if (id.includes('navy')) return { primary: '#0f172a', secondary: '#334155', text: '#1a1a1a', border: '#e5e7eb', sidebarBg: '#f1f5f9', sidebarText: '#0f172a' }

        return { primary: '#1f2937', secondary: '#4b5563', text: '#1a1a1a', border: '#e5e7eb', sidebarBg: '#f9fafb', sidebarText: '#111827' }
    }

    // Default fallback
    return { primary: '#111827', secondary: '#3b82f6', text: '#1a1a1a', border: '#e5e7eb' }
}

// Dynamic styles factory
const createStyles = (templateId: string) => {
    const colors = getTemplateColors(templateId)
    const id = templateId.toLowerCase()

    const hasSidebar = id.startsWith('modern') || id.startsWith('technical') || id.startsWith('startup') || id.startsWith('chic') || id.startsWith('artisan') || id.startsWith('creative') || id.startsWith('split-contrast') || id.startsWith('cute') || id.startsWith('service') || id.startsWith('hospitality') || id.startsWith('cruise') || id.startsWith('nursing') || id.startsWith('ats-modern')
    const hasColumns = id.startsWith('compact')
    const sidebarOnRight = id.startsWith('technical') || id.startsWith('startup') || id.startsWith('chic') || id.startsWith('artisan') || id.startsWith('creative') || id.startsWith('compact') || id.startsWith('ats-modern')
    const sidebarOnLeft = id.startsWith('split-contrast') || id.startsWith('modern') || id.startsWith('hospitality') || id.startsWith('service') || id.startsWith('cruise') || id.startsWith('nursing')
    const isDarkSidebar = id.startsWith('modern') || (id.startsWith('technical') && id.includes('dark'))
    const isSplitContrast = id.startsWith('split-contrast')

    const isSerif = id.startsWith('chic') || id.startsWith('luxe') || id.startsWith('executive') || id.startsWith('academic') || id.includes('serif') || id.startsWith('ats-classic') || id.startsWith('hospitality')
    const isChic = id.startsWith('chic')
    const isExecutive = id.startsWith('executive') || id.startsWith('luxe') || id.startsWith('ats-executive')
    const isAcademic = id.startsWith('academic')

    // Specific alignment checks to match HTML templates
    const isCentered = id.startsWith('classic') ||
        (id.startsWith('minimal') && !id.startsWith('ats-minimal')) ||
        id.startsWith('executive') ||
        id.startsWith('luxe') ||
        id.startsWith('cute') ||
        id.startsWith('ats-professional') ||
        id.startsWith('ats-executive') ||
        id.startsWith('graduate')

    const isJustifiedHeader = id.startsWith('compact') || id.startsWith('technical') || id.startsWith('ats-standard') || id.startsWith('ats-minimal') || id.startsWith('ats-timeline')
    const isTimelinePro = id.startsWith('ats-timeline')

    // Pre-calculate border widths to avoid undefined issues
    // We force these to be constants, effectively casting boolean logic to number
    const headerBorderBottomWidth =
        id.startsWith('ats-executive') ? 4 :
            (id.startsWith('ats-standard') || id.startsWith('ats-classic') || id.startsWith('ats-modern') || id.startsWith('classic')) ? 1 :
                (id.startsWith('compact') || id.startsWith('ats-timeline')) ? 2 : 0

    const sidebarBorderLeftWidth = sidebarOnRight ? 1 : 0
    const sidebarBorderRightWidth = sidebarOnRight ? 0 : 1

    const sectionTitleBorderBottomWidth =
        (id.startsWith('ats-professional') || id.startsWith('technical')) ? 2 :
            (id.startsWith('ats-classic') || id.startsWith('ats-graduate')) ? 1 : 0

    const experienceItemBorderLeftWidth = id.startsWith('creative') || id.startsWith('startup') || id.startsWith('technical') || id.startsWith('ats-executive') ? 2 : 0
    const photoBorderRadius = id.startsWith('cruise') ? 60 : 4

    return StyleSheet.create({
        page: {
            padding: hasSidebar ? 0 : (id.startsWith('ats-classic') ? 48 : (isChic ? 50 : (isExecutive ? 50 : (isAcademic ? 40 : 45)))),
            fontFamily: isSerif ? 'Times-Roman' : (id.startsWith('technical') ? 'Courier' : 'Helvetica'),
            fontSize: id.startsWith('ats-classic') ? 10 : (isChic ? 11 : (isAcademic ? 9 : (isExecutive ? 10.5 : 10))),
            lineHeight: id.startsWith('ats-classic') ? 1.5 : (isChic ? 1.7 : (isAcademic ? 1.45 : (isExecutive ? 1.65 : 1.6))),
            color: colors.text,
            backgroundColor: colors.headerBg || '#ffffff',
            flexDirection: sidebarOnRight ? 'row-reverse' : 'row',
        },
        // Layout wrapper for non-sidebar templates
        container: {
            flex: 1,
            padding: 0,
        },
        sidebar: {
            width: '32%',
            backgroundColor: colors.sidebarBg || colors.primary,
            color: colors.sidebarText || '#ffffff',
            padding: 20,
            paddingTop: 40,
            borderLeftWidth: sidebarBorderLeftWidth,
            borderRightWidth: sidebarBorderRightWidth,
            borderStyle: 'solid',
            borderColor: 'rgba(0,0,0,0.05)',
        },
        initialsCircle: {
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'rgba(255,255,255,0.2)',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 15,
            alignSelf: 'center',
        },
        initialsText: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#ffffff',
        },
        terminalHeader: {
            backgroundColor: id.includes('dark') ? '#171717' : '#f8fafc',
            padding: 20,
            borderRadius: 6,
            marginBottom: 20,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: id.includes('dark') ? '#334155' : '#e2e8f0',
        },
        terminalDots: {
            flexDirection: 'row',
            gap: 4,
            position: 'absolute',
            top: 10,
            right: 10,
        },
        terminalDot: {
            width: 8,
            height: 8,
            borderRadius: 4,
        },
        // Hospitality-specific
        photo: {
            width: 120,
            height: 120,
            objectFit: 'cover',
            borderRadius: photoBorderRadius,
            borderWidth: 3,
            borderColor: '#ffffff',
            borderStyle: 'solid',
            alignSelf: 'center',
            marginBottom: 20,
        },
        mainContent: {
            width: '68%',
            padding: 40,
            paddingTop: 40,
            backgroundColor: '#ffffff',
        },
        header: {
            marginBottom: 20,
            flexDirection: isJustifiedHeader ? 'row' : 'column',
            justifyContent: isJustifiedHeader ? 'space-between' : 'flex-start',
            alignItems: isJustifiedHeader ? 'flex-end' : (isCentered ? 'center' : 'flex-start'),
            textAlign: isCentered ? 'center' : 'left',
            paddingBottom: (id.startsWith('classic') || id.startsWith('compact') || id.startsWith('ats')) ? 15 : 10,
            borderBottomWidth: headerBorderBottomWidth,
            borderBottomColor: id.startsWith('ats-executive') ? '#262626' :
                (id.startsWith('ats-standard') ? '#f3f4f6' :
                    (id.startsWith('ats-classic') ? '#d1d5db' :
                        (id.startsWith('ats-modern') ? '#e5e7eb' : colors.primary))),
            borderStyle: 'solid',
            width: '100%', // Ensure header takes full width for alignment
        },
        name: {
            fontSize: isChic ? 36 : (isExecutive ? 28 : 24),
            fontWeight: isChic ? 'ultralight' : 'bold',
            color: colors.primary,
            marginBottom: id.startsWith('classic') ? 8 : (isChic ? 10 : (isExecutive ? 10 : 4)),
            textTransform: isExecutive || id.startsWith('classic') ? 'uppercase' : 'none',
            letterSpacing: id.startsWith('classic') ? 1.5 : (isChic ? -0.5 : (isExecutive ? 3 : 0)),
        },
        title: {
            fontSize: isExecutive ? 14 : (isChic ? 10 : 12),
            color: colors.secondary,
            fontWeight: isChic ? 'normal' : 'bold',
            fontStyle: isExecutive ? 'italic' : 'normal',
            marginBottom: id.startsWith('classic') ? 15 : (isExecutive ? 15 : (isChic ? 20 : 10)),
            textTransform: isChic ? 'uppercase' : 'none',
            letterSpacing: isChic ? 2 : 0,
        },
        contactInfo: {
            flexDirection: (id.startsWith('executive') || id.startsWith('luxe') || id.startsWith('classic') || id.startsWith('ats') || id.startsWith('graduate')) ? 'row' : 'column',
            justifyContent: (id.startsWith('executive') || id.startsWith('luxe') || id.startsWith('classic') || id.startsWith('ats') || id.startsWith('graduate')) ? 'center' : 'flex-start',
            alignItems: isJustifiedHeader ? 'flex-end' : 'center',
            gap: id.startsWith('ats-professional') ? 12 : 10,
            fontSize: (id.startsWith('ats') || id.startsWith('compact')) ? 8 : 9,
            color: '#64748b',
            marginBottom: 10,
            flexWrap: 'wrap',
        },
        contactItem: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
        },
        contactIcon: {
            fontSize: 10,
            color: '#1a1a1a',
        },
        sidebarContact: {
            marginTop: 20,
            gap: 6,
        },
        sidebarContactItem: {
            fontSize: 8.5,
            opacity: 0.9,
            marginBottom: 4,
        },
        section: {
            marginTop: isExecutive ? 28 : 22,
            marginBottom: 8,
        },
        sectionTitleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginBottom: isExecutive ? 15 : 12,
            marginTop: isExecutive ? 28 : 20,
        },
        sectionTitle: {
            fontSize: 11,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: colors.primary,
            letterSpacing: 1,
            borderBottomWidth: sectionTitleBorderBottomWidth,
            borderBottomColor: id.startsWith('ats-professional') ? '#1a1a1a' :
                (id.startsWith('ats-classic') ? '#d1d5db' :
                    (id.startsWith('ats-graduate') ? '#f3f4f6' :
                        (id.startsWith('technical') ? colors.secondary : 'transparent'))),
            borderStyle: 'solid',
            paddingBottom: (id.startsWith('ats-professional') || id.startsWith('ats-classic') || id.startsWith('ats-graduate')) ? 3 : 0,
            marginBottom: (id.startsWith('ats-professional') || id.startsWith('ats-classic') || id.startsWith('ats-graduate')) ? 8 : 0,
        },
        sectionTitleBar: {
            flex: 1,
            height: 2,
            backgroundColor: colors.primary,
            opacity: 0.1,
        },
        startupSectionTitleBar: {
            flex: 1,
            height: 4,
            backgroundColor: colors.primary,
        },
        sidebarSectionTitle: {
            fontSize: 10,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: colors.sidebarText || '#ffffff',
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(255,255,255,0.2)',
            borderStyle: 'solid',
            paddingBottom: 4,
            marginBottom: 12,
            marginTop: 25,
            letterSpacing: 1,
        },
        summaryContainer: {
            paddingLeft: (id.startsWith('ats-standard') || id.startsWith('ats-executive')) ? 15 : 0,
            paddingVertical: id.startsWith('ats-executive') ? 10 : 0,
            paddingHorizontal: id.startsWith('ats-executive') ? 15 : 0,
            backgroundColor: id.startsWith('ats-executive') ? '#f9fafb' : 'transparent',
            borderLeftWidth: id.startsWith('ats-executive') ? 4 : (id.startsWith('ats-standard') ? 2 : 0),
            borderLeftColor: id.startsWith('ats-executive') ? '#1a1a1a' : '#f3f4f6',
            borderStyle: 'solid',
        },
        summaryText: {
            fontSize: 10,
            color: '#334155',
            lineHeight: 1.6,
            fontStyle: (id.startsWith('ats-classic') || id.startsWith('ats-executive')) ? 'italic' : 'normal',
        },
        experienceItem: {
            marginBottom: 22,
            paddingLeft: id.startsWith('creative') || id.startsWith('startup') || id.startsWith('technical') ? 15 : 0,
            borderLeftWidth: experienceItemBorderLeftWidth,
            borderLeftColor: (id.startsWith('creative') || id.startsWith('startup') || id.startsWith('technical')) ? 'rgba(0,0,0,0.05)' : 'transparent',
            borderStyle: 'solid',
            position: 'relative',
        },
        timelineDot: {
            position: 'absolute',
            left: -5,
            top: 4,
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: colors.primary,
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: '#ffffff',
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 4,
        },
        bold: {
            fontWeight: 'bold',
            color: colors.primary,
            fontSize: 10.5,
        },
        italic: {
            fontStyle: 'italic',
            color: '#4b5563',
        },
        date: {
            fontSize: 9,
            color: '#6b7280',
            fontWeight: 'bold',
        },
        achievement: {
            flexDirection: 'row',
            marginLeft: 8,
            marginBottom: 3,
        },
        bullet: {
            width: 10,
            color: colors.secondary,
            fontSize: 10,
        },
        achievementText: {
            flex: 1,
            color: '#374151',
            fontSize: 9.5,
            lineHeight: 1.4,
        },
        skillsList: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 5,
        },
        skillBadge: {
            paddingVertical: 2,
            paddingHorizontal: 6,
            backgroundColor: id.startsWith('ats') ? 'transparent' : '#f3f4f6',
            borderWidth: 0,
            borderStyle: 'solid',
            borderRadius: 3,
            fontSize: 8.5,
            color: colors.primary,
        },
        sidebarSkill: {
            fontSize: 9,
            paddingVertical: 3,
            paddingHorizontal: 8,
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: 4,
            marginBottom: 4,
            marginRight: 4,
        },
        // --- Timeline Pro Styles ---
        timelineSection: {
            position: 'relative',
            marginLeft: 5,
            paddingLeft: 25,
            marginBottom: 20,
        },
        timelineLine: {
            position: 'absolute',
            left: 0,
            top: 10,
            bottom: 0,
            width: 1,
            backgroundColor: colors.primary,
            opacity: 0.1,
        },
        timelineItemPro: {
            position: 'relative',
            marginBottom: 25,
        },
        timelineDotPro: {
            position: 'absolute',
            left: -29,
            top: 5,
            width: 8,
            height: 8,
            borderRadius: 4,
            borderWidth: 2,
            borderColor: colors.primary,
            borderStyle: 'solid',
            backgroundColor: '#ffffff',
        }
    })
}


interface PDFDocumentProps {
    data: ResumeDocument
    isWatermarked?: boolean
}

export function ResumePDF({ data, isWatermarked = false }: PDFDocumentProps) {
    // Create dynamic styles based on template
    const tId = (data.templateId || '').toLowerCase()
    const styles = createStyles(tId)
    const colors = getTemplateColors(tId)
    const isCute = tId.startsWith('cute')
    const hasSidebar = tId.startsWith('modern') || tId.startsWith('technical') || tId.startsWith('startup') || tId.startsWith('chic') || tId.startsWith('artisan') || tId.startsWith('creative') || tId.startsWith('split-contrast') || isCute || tId.startsWith('service') || tId.startsWith('hospitality') || tId.startsWith('cruise') || tId.startsWith('nursing') || tId.startsWith('ats-modern')
    const isCompact = tId.startsWith('compact')
    const isTimelinePro = tId.startsWith('ats-timeline')

    return (
        <Document title={`${data.personalInfo?.fullName || 'Resume'} - Clear Career Path`}>
            <Page size="A4" style={styles.page}>
                {hasSidebar ? (
                    <>
                        {/* FULL HEIGHT SIDEBAR LAYOUTS (Modern, Technical, etc) */}
                        {/* SIDEBAR */}
                        <View style={styles.sidebar}>
                            {data.personalInfo?.photoUrl && (tId.startsWith('modern') || tId.startsWith('service') || tId.startsWith('hospitality') || tId.startsWith('cruise')) && (
                                <View style={{ marginBottom: 20, alignItems: 'center' }}>
                                    <Image
                                        src={data.personalInfo.photoUrl}
                                        style={{ width: 100, height: 100, borderRadius: 50, objectFit: 'cover' }}
                                    />
                                </View>
                            )}

                            {tId.startsWith('modern') && !data.personalInfo?.photoUrl && (
                                <View style={styles.initialsCircle}>
                                    <Text style={styles.initialsText}>
                                        {data.personalInfo?.fullName?.split(' ').map(n => n[0]).join('')}
                                    </Text>
                                </View>
                            )}

                            <View style={{ marginBottom: 20, textAlign: 'center' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{data.personalInfo?.fullName}</Text>
                                <Text style={{ fontSize: 9, marginTop: 4, opacity: 0.9, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 0.5 }}>{data.personalInfo?.professionalTitle}</Text>
                            </View>

                            <View style={styles.sidebarSectionTitle}>
                                <Text>{tId.startsWith('startup') ? 'Connect' : 'Contact'}</Text>
                            </View>
                            <View style={styles.sidebarContact}>
                                {data.personalInfo?.email && <Text style={styles.sidebarContactItem}>{data.personalInfo.email}</Text>}
                                {data.personalInfo?.phone && <Text style={styles.sidebarContactItem}>{data.personalInfo.phone}</Text>}
                                {data.personalInfo?.location && <Text style={styles.sidebarContactItem}>{data.personalInfo.location}</Text>}
                                {data.personalInfo?.linkedinUrl && <Text style={styles.sidebarContactItem}>LinkedIn</Text>}
                            </View>

                            {data.skills && data.skills.length > 0 && (
                                <>
                                    <View style={styles.sidebarSectionTitle}>
                                        <Text>Skills</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, gap: 4 }}>
                                        {data.skills.map((skill, i) => (
                                            <Text key={i} style={[styles.sidebarSkill, tId.startsWith('compact') ? { backgroundColor: '#171717', color: '#ffffff', fontSize: 7, paddingHorizontal: 4, paddingVertical: 1 } : {}]}>
                                                {skill.skillName}
                                            </Text>
                                        ))}
                                    </View>
                                </>
                            )}

                            {data.education && data.education.length > 0 && (
                                <>
                                    <View style={styles.sidebarSectionTitle}>
                                        <Text>Education</Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        {data.education.map((edu, i) => (
                                            <View key={i} style={{ marginBottom: 12 }}>
                                                <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{edu.institutionName}</Text>
                                                <Text style={{ fontSize: 9, opacity: 0.9 }}>{edu.degree}</Text>
                                                <Text style={{ fontSize: 8, opacity: 0.7 }}>{edu.endYear}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </>
                            )}

                            {data.languages && data.languages.length > 0 && (
                                <>
                                    <View style={styles.sidebarSectionTitle}>
                                        <Text>Languages</Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        {data.languages.map((lang, i) => (
                                            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                                                <Text style={{ fontSize: 9 }}>{lang.languageName}</Text>
                                                <Text style={{ fontSize: 8, opacity: 0.7 }}>{lang.proficiencyLevel}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </>
                            )}
                        </View>

                        {/* MAIN CONTENT */}
                        <View style={styles.mainContent}>
                            {tId.startsWith('technical') && (
                                <View style={styles.terminalHeader}>
                                    <View style={styles.terminalDots}>
                                        <View style={[styles.terminalDot, { backgroundColor: '#ef4444' }]} />
                                        <View style={[styles.terminalDot, { backgroundColor: '#f59e0b' }]} />
                                        <View style={[styles.terminalDot, { backgroundColor: '#10b981' }]} />
                                    </View>
                                    <Text style={{ fontSize: 8, color: '#64748b', marginBottom: 4 }}>{`// ${data.personalInfo?.professionalTitle || 'Developer'}`}</Text>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: tId.includes('dark') ? '#ffffff' : '#1e293b' }}>
                                        {`const developer = "${data.personalInfo?.fullName}";`}
                                    </Text>
                                </View>
                            )}

                            {data.professionalSummary?.summaryText && (
                                <View style={styles.section}>
                                    <View style={styles.sectionTitleContainer}>
                                        <Text style={styles.sectionTitle}>{tId.startsWith('creative') ? 'About Me' : (tId.startsWith('startup') ? 'Ambition' : 'Profile')}</Text>
                                        <View style={tId.startsWith('startup') ? styles.startupSectionTitleBar : styles.sectionTitleBar} />
                                    </View>
                                    <Text style={{ fontSize: 10, color: '#334155', lineHeight: 1.6 }}>{data.professionalSummary.summaryText}</Text>
                                </View>
                            )}

                            {data.workExperience && data.workExperience.length > 0 && (
                                <View style={styles.section}>
                                    <View style={styles.sectionTitleContainer}>
                                        <Text style={styles.sectionTitle}>Experience</Text>
                                        <View style={tId.startsWith('startup') ? styles.startupSectionTitleBar : styles.sectionTitleBar} />
                                    </View>
                                    {data.workExperience.map((job, i) => (
                                        <View key={i} style={styles.experienceItem}>
                                            {(tId.startsWith('creative') || tId.startsWith('startup')) && <View style={styles.timelineDot} />}
                                            <View style={styles.row}>
                                                <Text style={styles.bold}>{job.jobTitle}</Text>
                                                <Text style={styles.date}>{job.startDate} — {job.isCurrent ? 'Present' : job.endDate}</Text>
                                            </View>
                                            <Text style={styles.italic}>{job.companyName}</Text>
                                            <Text style={{ fontSize: 9.5, color: '#475569', marginTop: 4, marginBottom: 6 }}>{job.roleDescription}</Text>
                                            {job.achievements?.map((ach, j) => (
                                                <View key={j} style={styles.achievement}>
                                                    <Text style={[styles.bullet, { color: tId.startsWith('creative') ? '#fb7185' : colors.secondary }]}>{tId.startsWith('creative') ? '\u279C' : '\u2022'}</Text>
                                                    <Text style={styles.achievementText}>{ach.achievementText}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    ))}
                                </View>
                            )}

                            {data.projects && data.projects.length > 0 && (
                                <View style={styles.section}>
                                    <View style={styles.sectionTitleContainer}>
                                        <Text style={styles.sectionTitle}>Projects</Text>
                                        <View style={tId.startsWith('startup') ? styles.startupSectionTitleBar : styles.sectionTitleBar} />
                                    </View>
                                    {data.projects.map((proj, i) => (
                                        <View key={i} style={styles.experienceItem}>
                                            {(tId.startsWith('creative') || tId.startsWith('startup')) && <View style={styles.timelineDot} />}
                                            <View style={styles.row}>
                                                <Text style={styles.bold}>{proj.projectName}</Text>
                                                <Text style={styles.date}>{proj.startDate} — {proj.endDate}</Text>
                                            </View>
                                            <Text style={styles.italic}>{proj.role} {proj.clientOrOrganization && `| ${proj.clientOrOrganization}`}</Text>
                                            {proj.description && <Text style={{ fontSize: 9.5, color: '#334155', marginTop: 4 }}>{proj.description}</Text>}
                                            {proj.toolsUsed && proj.toolsUsed.length > 0 && tId.startsWith('startup') && (
                                                <Text style={{ fontSize: 8, color: '#94a3b8', marginTop: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
                                                    {proj.toolsUsed.map(t => `#${t}`).join(' ')}
                                                </Text>
                                            )}
                                        </View>
                                    ))}
                                </View>
                            )}

                            {data.certifications && data.certifications.length > 0 && (
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Certifications</Text>
                                    {data.certifications.map((cert, i) => (
                                        <View key={i} style={{ marginBottom: 4 }}>
                                            <Text style={styles.bold}>{cert.certificationName}</Text>
                                            <Text style={styles.italic}>{cert.issuingOrganization} • {cert.issueYear}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    </>
                ) : (
                    <View style={styles.container}>
                        {/* TOP HEADER LAYOUTS (Standard, Compact, Executive) */}
                        <View style={styles.header}>
                            {/* Photo for Hospitality/Cruise */}
                            {(tId.startsWith('hospitality') || tId.startsWith('cruise')) && data.personalInfo?.photoUrl && (
                                <View style={{ position: 'absolute', right: 0, top: 0 }}>
                                    <Image
                                        src={data.personalInfo.photoUrl}
                                        style={styles.photo}
                                    />
                                </View>
                            )}
                            <View style={[isCompact ? { width: '65%' } : {}, (tId.startsWith('hospitality') || tId.startsWith('cruise')) ? { width: '70%' } : {}]}>
                                <Text style={styles.name}>{data.personalInfo?.fullName}</Text>
                                {!tId.startsWith('ats-professional') && <Text style={styles.title}>{data.personalInfo?.professionalTitle}</Text>}
                            </View>
                            <View style={styles.contactInfo}>
                                {tId.startsWith('ats-professional') ? (
                                    <>
                                        {data.personalInfo?.phone && (
                                            <View style={styles.contactItem}>
                                                <Text style={[styles.contactIcon, { fontSize: 8, fontWeight: 'bold' }]}>P:</Text>
                                                <Text>{data.personalInfo.phone}</Text>
                                            </View>
                                        )}
                                        {data.personalInfo?.email && (
                                            <View style={styles.contactItem}>
                                                <Text style={[styles.contactIcon, { fontSize: 8, fontWeight: 'bold' }]}>E:</Text>
                                                <Text>{data.personalInfo.email}</Text>
                                            </View>
                                        )}
                                        {data.personalInfo?.linkedinUrl && (
                                            <View style={styles.contactItem}>
                                                <Text style={[styles.contactIcon, { fontSize: 8, fontWeight: 'bold' }]}>LI:</Text>
                                                <Text>{data.personalInfo.linkedinUrl.replace(/^https?:\/\//, '')}</Text>
                                            </View>
                                        )}
                                        {(data.personalInfo?.city || data.personalInfo?.country) && (
                                            <View style={styles.contactItem}>
                                                <Text style={[styles.contactIcon, { fontSize: 8, fontWeight: 'bold' }]}>L:</Text>
                                                <Text>{[data.personalInfo.city, data.personalInfo.country].filter(Boolean).join(', ')}</Text>
                                            </View>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <Text>{data.personalInfo?.email}</Text>
                                        <Text>{(tId.startsWith('ats') || isCompact) ? '• ' : ''}{data.personalInfo?.phone}</Text>
                                        <Text>{(tId.startsWith('ats') || isCompact) ? '• ' : ''}{data.personalInfo?.location || [data.personalInfo?.city, data.personalInfo?.country].filter(Boolean).join(', ')}</Text>
                                        {data.personalInfo?.linkedinUrl && <Text>{(tId.startsWith('ats') || isCompact) ? '• ' : ''}{data.personalInfo.linkedinUrl.replace(/^https?:\/\//, '')}</Text>}
                                    </>
                                )}
                            </View>
                        </View>

                        <View style={{ flexDirection: (isCompact) ? 'row-reverse' : 'column', gap: isCompact ? 25 : 0 }}>
                            {/* IF COMPACT, render the small sidebar sections on the right */}
                            {isCompact && (
                                <View style={{ width: '35%', marginTop: 10 }}>
                                    {data.skills && data.skills.length > 0 && (
                                        <View style={styles.section}>
                                            <Text style={styles.sectionTitle}>Skills</Text>
                                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                                                {data.skills.map((skill, i) => (
                                                    <Text key={i} style={{ backgroundColor: '#171717', color: '#ffffff', fontSize: 7, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 2 }}>{skill.skillName}</Text>
                                                ))}
                                            </View>
                                        </View>
                                    )}
                                    {data.education && data.education.length > 0 && (
                                        <View style={styles.section}>
                                            <Text style={styles.sectionTitle}>Education</Text>
                                            {data.education.map((edu, i) => (
                                                <View key={i} style={{ marginBottom: 10 }}>
                                                    <Text style={{ fontSize: 9, fontWeight: 'bold' }}>{edu.institutionName}</Text>
                                                    <Text style={{ fontSize: 8 }}>{edu.degree}</Text>
                                                    <Text style={{ fontSize: 7, color: '#64748b' }}>{edu.endYear}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            )}

                            {/* MAIN AREA */}
                            <View style={{ flex: 1 }}>
                                {data.professionalSummary?.summaryText && (
                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>
                                            {tId.startsWith('ats-standard') ? '01 // Profile' :
                                                (isCompact ? 'Profile' :
                                                    (tId.startsWith('ats-executive') ? 'Executive Profile' : 'Professional Summary'))}
                                        </Text>
                                        <View style={styles.summaryContainer}>
                                            <Text style={styles.summaryText}>{data.professionalSummary.summaryText}</Text>
                                        </View>
                                    </View>
                                )}

                                {tId.startsWith('ats-standard') ? (
                                    <>
                                        {/* ATS Standard Order: Experience -> Skills */}
                                        {data.workExperience && data.workExperience.length > 0 && (
                                            <View style={isTimelinePro ? styles.timelineSection : styles.section}>
                                                {isTimelinePro && <View style={styles.timelineLine} />}
                                                <Text style={styles.sectionTitle}>
                                                    {tId.startsWith('ats-standard') ? '02 // Experience' :
                                                        (tId.startsWith('ats') ? 'Work Experience' : 'Experience')}
                                                </Text>
                                                {data.workExperience.map((job, i) => (
                                                    <View key={i} style={isTimelinePro ? styles.timelineItemPro : styles.experienceItem}>
                                                        {isTimelinePro && <View style={styles.timelineDotPro} />}
                                                        <View style={styles.row}>
                                                            <Text style={styles.bold}>{job.jobTitle}</Text>
                                                            <Text style={styles.date}>{job.startDate} — {job.isCurrent ? 'Present' : job.endDate}</Text>
                                                        </View>
                                                        <Text style={styles.italic}>{job.companyName}{job.location ? ` | ${job.location}` : ''}</Text>
                                                        <Text style={{ fontSize: 9.5, color: '#475569', marginTop: 4, marginBottom: 5 }}>{job.roleDescription}</Text>
                                                        {job.achievements?.map((ach, j) => (
                                                            <View key={j} style={styles.achievement}>
                                                                <Text style={styles.bullet}>•</Text>
                                                                <Text style={styles.achievementText}>{ach.achievementText}</Text>
                                                            </View>
                                                        ))}
                                                    </View>
                                                ))}
                                            </View>
                                        )}
                                        {!isCompact && data.skills && data.skills.length > 0 && (
                                            <View style={styles.section}>
                                                <Text style={styles.sectionTitle}>
                                                    {tId.startsWith('ats-standard') ? '03 // Competencies' :
                                                        (tId.startsWith('ats') ? 'Core Skills' : 'Skills')}
                                                </Text>
                                                {tId.startsWith('ats') ? (
                                                    <View style={{ gap: 4 }}>
                                                        {(() => {
                                                            const grouped: Record<string, string[]> = {}
                                                            data.skills.forEach(s => {
                                                                const type = s.skillType || 'professional'
                                                                if (!grouped[type]) grouped[type] = []
                                                                grouped[type].push(s.skillName)
                                                            })

                                                            const categoryLabels: Record<string, string> = {
                                                                technical: 'Technical Skills',
                                                                professional: 'Professional Skills',
                                                                tool: 'Tools & Technologies',
                                                                industry: 'Industry Knowledge'
                                                            }

                                                            return Object.entries(grouped).map(([type, skills], idx) => (
                                                                <View key={idx} style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
                                                                    <Text style={{ fontSize: 9, fontWeight: 'bold', width: 120, color: '#475569' }}>
                                                                        {categoryLabels[type] || type}:
                                                                    </Text>
                                                                    <Text style={{ fontSize: 9, flex: 1, color: '#1e293b' }}>
                                                                        {skills.join(', ')}
                                                                    </Text>
                                                                </View>
                                                            ))
                                                        })()}
                                                    </View>
                                                ) : (
                                                    <View style={styles.skillsList}>
                                                        {data.skills.map((skill, i) => (
                                                            <Text key={i} style={styles.skillBadge}>{skill.skillName}</Text>
                                                        ))}
                                                    </View>
                                                )}
                                            </View>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {/* Default Order: Skills -> Experience */}
                                        {!isCompact && data.skills && data.skills.length > 0 && (
                                            <View style={styles.section}>
                                                <Text style={styles.sectionTitle}>
                                                    {tId.startsWith('ats-standard') ? '03 // Competencies' :
                                                        (tId.startsWith('ats') ? 'Core Skills' : 'Skills')}
                                                </Text>
                                                {tId.startsWith('ats') ? (
                                                    <View style={{ gap: 4 }}>
                                                        {(() => {
                                                            const grouped: Record<string, string[]> = {}
                                                            data.skills.forEach(s => {
                                                                const type = s.skillType || 'professional'
                                                                if (!grouped[type]) grouped[type] = []
                                                                grouped[type].push(s.skillName)
                                                            })

                                                            const categoryLabels: Record<string, string> = {
                                                                technical: 'Technical Skills',
                                                                professional: 'Professional Skills',
                                                                tool: 'Tools & Technologies',
                                                                industry: 'Industry Knowledge'
                                                            }

                                                            return Object.entries(grouped).map(([type, skills], idx) => (
                                                                <View key={idx} style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
                                                                    <Text style={{ fontSize: 9, fontWeight: 'bold', width: 120, color: '#475569' }}>
                                                                        {categoryLabels[type] || type}:
                                                                    </Text>
                                                                    <Text style={{ fontSize: 9, flex: 1, color: '#1e293b' }}>
                                                                        {skills.join(', ')}
                                                                    </Text>
                                                                </View>
                                                            ))
                                                        })()}
                                                    </View>
                                                ) : (
                                                    <View style={styles.skillsList}>
                                                        {data.skills.map((skill, i) => (
                                                            <Text key={i} style={styles.skillBadge}>{skill.skillName}</Text>
                                                        ))}
                                                    </View>
                                                )}
                                            </View>
                                        )}
                                        {data.workExperience && data.workExperience.length > 0 && (
                                            <View style={isTimelinePro ? styles.timelineSection : styles.section}>
                                                {isTimelinePro && <View style={styles.timelineLine} />}
                                                <Text style={styles.sectionTitle}>
                                                    {tId.startsWith('ats-standard') ? '02 // Experience' :
                                                        (tId.startsWith('ats') ? 'Work Experience' : 'Experience')}
                                                </Text>
                                                {data.workExperience.map((job, i) => (
                                                    <View key={i} style={isTimelinePro ? styles.timelineItemPro : styles.experienceItem}>
                                                        {isTimelinePro && <View style={styles.timelineDotPro} />}
                                                        <View style={styles.row}>
                                                            <Text style={styles.bold}>{job.jobTitle}</Text>
                                                            <Text style={styles.date}>{job.startDate} — {job.isCurrent ? 'Present' : job.endDate}</Text>
                                                        </View>
                                                        <Text style={styles.italic}>{job.companyName}{job.location ? ` | ${job.location}` : ''}</Text>
                                                        <Text style={{ fontSize: 9.5, color: '#475569', marginTop: 4, marginBottom: 5 }}>{job.roleDescription}</Text>
                                                        {job.achievements?.map((ach, j) => (
                                                            <View key={j} style={styles.achievement}>
                                                                <Text style={styles.bullet}>•</Text>
                                                                <Text style={styles.achievementText}>{ach.achievementText}</Text>
                                                            </View>
                                                        ))}
                                                    </View>
                                                ))}
                                            </View>
                                        )}
                                    </>
                                )}

                                {!isCompact && data.education && data.education.length > 0 && (
                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>
                                            {tId.startsWith('ats-standard') ? '04 // Education' : 'Education'}
                                        </Text>
                                        {data.education.map((edu, i) => (
                                            <View key={i} style={{ marginBottom: 10 }}>
                                                <View style={styles.row}>
                                                    <Text style={styles.bold}>
                                                        {edu.degree}
                                                        {(edu.major || edu.fieldOfStudy) && ` in ${edu.major || edu.fieldOfStudy}`}
                                                    </Text>
                                                    <Text style={styles.date}>{edu.endYear}</Text>
                                                </View>
                                                <Text style={styles.italic}>{edu.institutionName}{edu.location ? ` | ${edu.location}` : ''}</Text>
                                                {edu.gpa && <Text style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>GPA: {edu.gpa}</Text>}
                                            </View>
                                        ))}
                                    </View>
                                )}

                                {data.projects && data.projects.length > 0 && (
                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>Projects</Text>
                                        {data.projects.map((proj, i) => (
                                            <View key={i} style={styles.experienceItem}>
                                                <View style={styles.row}>
                                                    <Text style={styles.bold}>{proj.projectName}</Text>
                                                    <Text style={styles.date}>{proj.startDate} — {proj.endDate}</Text>
                                                </View>
                                                <Text style={styles.italic}>{proj.role} {proj.clientOrOrganization && `| ${proj.clientOrOrganization}`}</Text>
                                                {proj.description && <Text style={{ fontSize: 9.5, color: '#334155', marginTop: 4 }}>{proj.description}</Text>}
                                            </View>
                                        ))}
                                    </View>
                                )}

                                {data.certifications && data.certifications.length > 0 && (
                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>Certifications</Text>
                                        {data.certifications.map((cert, i) => (
                                            <View key={i} style={{ marginBottom: 4 }}>
                                                <Text style={styles.bold}>{cert.certificationName}</Text>
                                                <Text style={styles.italic}>{cert.issuingOrganization} • {cert.issueYear}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}

                                {data.languages && data.languages.length > 0 && (
                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>Languages</Text>
                                        <View style={{ flexDirection: 'row', gap: 10 }}>
                                            {data.languages.map((lang, i) => (
                                                <Text key={i} style={{ fontSize: 9.5 }}>
                                                    <Text style={{ fontWeight: 'bold' }}>{lang.languageName}</Text> ({lang.proficiencyLevel})
                                                </Text>
                                            ))}
                                        </View>
                                    </View>
                                )}

                                {data.publications && data.publications.length > 0 && (
                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>Publications</Text>
                                        {data.publications.map((pub, i) => (
                                            <View key={i} style={{ marginBottom: 6 }}>
                                                <Text style={styles.bold}>{pub.title}</Text>
                                                <Text style={styles.italic}>{pub.platformOrPublisher} • {pub.publicationYear}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}

                                {data.volunteerExperience && data.volunteerExperience.length > 0 && (
                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>Volunteer Experience</Text>
                                        {data.volunteerExperience.map((vol, i) => (
                                            <View key={i} style={{ marginBottom: 8 }}>
                                                <View style={styles.row}>
                                                    <Text style={styles.bold}>{vol.roleTitle}</Text>
                                                    <Text style={styles.date}>{vol.startDate} — {vol.endDate}</Text>
                                                </View>
                                                <Text style={styles.italic}>{vol.organizationName}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}

                                {data.professionalAffiliations && data.professionalAffiliations.length > 0 && (
                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>Professional Affiliations</Text>
                                        {data.professionalAffiliations.map((aff, i) => (
                                            <View key={i} style={{ marginBottom: 4 }}>
                                                <Text style={styles.bold}>{aff.organizationName}</Text>
                                                <Text style={styles.italic}>{aff.roleOrMembership}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}

                                {data.references && data.references.length > 0 && (
                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>References</Text>
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
                                            {data.references.map((ref, i) => (
                                                <View key={i} style={{ width: '45%' }}>
                                                    <Text style={styles.bold}>{ref.referenceName}</Text>
                                                    <Text style={{ fontSize: 9, color: '#64748b' }}>{ref.role} • {ref.organization}</Text>
                                                    <Text style={{ fontSize: 8, color: '#94a3b8' }}>{ref.contactDetails || ref.availabilityStatement}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                )}

                                {data.achievements && data.achievements.length > 0 && (
                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>Achievements & Awards</Text>
                                        <View style={{ gap: 6 }}>
                                            {data.achievements.map((ach, i) => (
                                                <View key={i}>
                                                    <View style={styles.row}>
                                                        <Text style={styles.bold}>{ach.achievementTitle}</Text>
                                                        {ach.year && <Text style={styles.date}>{ach.year}</Text>}
                                                    </View>
                                                    {ach.issuingBody && <Text style={styles.italic}>{ach.issuingBody}</Text>}
                                                    {ach.description && <Text style={{ fontSize: 9, color: '#475569', marginTop: 2 }}>{ach.description}</Text>}
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                )}

                                {(data.additionalInfo?.otherInfo || (data.professionalAffiliations && data.professionalAffiliations.length > 0)) && (
                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>Additional Information</Text>
                                        {data.professionalAffiliations && data.professionalAffiliations.length > 0 && (
                                            <View style={{ marginBottom: 6 }}>
                                                <Text style={[styles.bold, { fontSize: 9 }]}>Professional Affiliations:</Text>
                                                <Text style={{ fontSize: 9, color: '#334155' }}>
                                                    {data.professionalAffiliations.map(aff => aff.organizationName).join(', ')}
                                                </Text>
                                            </View>
                                        )}
                                        {data.additionalInfo?.otherInfo && (
                                            <Text style={{ fontSize: 9.5, color: '#334155', lineHeight: 1.5 }}>{data.additionalInfo.otherInfo}</Text>
                                        )}
                                    </View>
                                )}

                                {/* Custom Sections */}
                                {data.customSections?.map((section, idx) => (
                                    <View key={idx} style={styles.section}>
                                        <Text style={styles.sectionTitle}>{section.title}</Text>
                                        {section.items && section.items.length > 0 ? (
                                            <View style={{ gap: 4 }}>
                                                {section.items.map((item, iIdx) => (
                                                    <View key={iIdx} style={styles.achievement}>
                                                        <Text style={styles.bullet}>•</Text>
                                                        <Text style={styles.achievementText}>{item.text}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        ) : (
                                            <Text style={{ fontSize: 9.5 }}>{section.content}</Text>
                                        )}
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                )}

                {/* WATERMARK */}
                {isWatermarked && (
                    <View style={{ position: 'absolute', bottom: 30, left: 0, right: 0, textAlign: 'center', opacity: 0.5 }}>
                        <Text style={{ fontSize: 8, color: '#94a3b8', fontStyle: 'italic' }}>
                            Created with Clear Career Path &mdash; Building a path to your dream job.
                        </Text>
                    </View>
                )}
            </Page>
        </Document>
    )
}
