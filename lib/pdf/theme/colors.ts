export const getTemplateColors = (templateId: string) => {
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
        if (id.startsWith('ats-modern')) return { primary: '#111827', secondary: '#2563eb', text: '#1a1a1a', border: '#e5e7eb' }
        if (id.startsWith('ats-graduate')) return { primary: '#1e3a8a', secondary: '#9f1239', text: '#1a1a1a', border: '#1e3a8a' }
        if (id.startsWith('ats-nursing')) return { primary: '#0f766e', secondary: '#14b8a6', text: '#1a1a1a', border: '#0f766e' }
        if (id.startsWith('ats-academia')) return { primary: '#334155', secondary: '#64748b', text: '#1a1a1a', border: '#475569' }
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

        // Hotel & Chef
        if (id.startsWith('hotel')) return { primary: '#b45309', secondary: '#d97706', text: '#1a1a1a', border: '#fcd34d', sidebarBg: '#ffffff' }
        if (id.startsWith('chef')) return { primary: '#b91c1c', secondary: '#ef4444', text: '#1a1a1a', border: '#fee2e2', sidebarBg: '#f9fafb' }

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

    // Revenue Leader (Sales/BD template)
    if (id.startsWith('revenue-leader')) {
        if (id.includes('green'))  return { primary: '#065f46', secondary: '#10b981', text: '#1a1a1a', border: '#6ee7b7', sidebarBg: '#f0fdf4' }
        if (id.includes('slate'))  return { primary: '#1e293b', secondary: '#64748b', text: '#1a1a1a', border: '#cbd5e1', sidebarBg: '#f8fafc' }
        if (id.includes('violet')) return { primary: '#4c1d95', secondary: '#7c3aed', text: '#1a1a1a', border: '#ddd6fe', sidebarBg: '#f5f3ff' }
        if (id.includes('orange')) return { primary: '#9a3412', secondary: '#ea580c', text: '#1a1a1a', border: '#fed7aa', sidebarBg: '#fff7ed' }
        return { primary: '#1e3a8a', secondary: '#2563eb', text: '#1a1a1a', border: '#bfdbfe', sidebarBg: '#eff6ff' }
    }

    // Default fallback
    return { primary: '#111827', secondary: '#3b82f6', text: '#1a1a1a', border: '#e5e7eb' }
}
