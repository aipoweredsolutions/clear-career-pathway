'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { ResumeDocument } from '@/lib/types/resume'
import { ResumeForm } from '@/components/editor/ResumeForm'
import { TemplateRenderer } from '@/components/templates/TemplateRenderer'
import { TemplateSelector } from '@/components/editor/TemplateSelector'
import { Button } from '@/components/ui/Button'
import { PDFDownloadButton } from '@/components/pdf/PDFDownloadButton'
import { ResumeDOCX } from '@/lib/docx/ResumeDOCX'
import { Save, ArrowLeft, LayoutTemplate, X, FileText, Loader2, Check } from 'lucide-react'
import Link from 'next/link'
import { fetchResume, saveResume } from '@/app/editor/actions'

export default function EditorPage() {
    const params = useParams()
    const documentId = params.documentId as string

    const [data, setData] = useState<ResumeDocument | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [lastSaved, setLastSaved] = useState<Date | null>(null)
    const [showTemplates, setShowTemplates] = useState(false)

    // Initial Fetch
    useEffect(() => {
        if (!documentId) return

        const loadData = async () => {
            try {
                const fetchedData = await fetchResume(documentId)
                if (fetchedData) {
                    setData(fetchedData)
                } else {
                    // Handle 404
                    console.error("Document not found")
                }
            } catch (error) {
                console.error("Failed to load resume", error)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [documentId])

    const handleSave = async () => {
        if (!data) return
        setSaving(true)
        try {
            const result = await saveResume(data)
            if (result.success) {
                setLastSaved(new Date())
            } else {
                alert('Failed to save changes')
            }
        } catch (error) {
            console.error('Save failed', error)
        } finally {
            setSaving(false)
        }
    }

    // Auto-save debounce (optional, using manual save for now as requested by typical flow, but accessible)
    // We can add a simple auto-save effect later.

    const handleTemplateSelect = (templateId: string) => {
        if (data) {
            setData({ ...data, templateId })
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-neutral-100">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
                    <p className="text-neutral-500 font-medium">Loading your resume...</p>
                </div>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center h-screen bg-neutral-100">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-neutral-900 mb-2">Resume Not Found</h1>
                    <Link href="/dashboard" className="text-primary-600 hover:underline">Return to Dashboard</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen bg-neutral-100 overflow-hidden">
            {/* Editor Header */}
            <header className="bg-white border-b border-neutral-200 px-6 py-3 flex items-center justify-between shrink-0 h-16 relative z-20">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-neutral-500 hover:text-neutral-900 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-semibold text-neutral-900 leading-tight">
                            {data.title || 'Untitled Document'}
                        </h1>
                        <span className="text-xs text-neutral-500 flex items-center gap-1">
                            {saving ? (
                                <>
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    Saving...
                                </>
                            ) : lastSaved ? (
                                <>
                                    <Check className="w-3 h-3 text-green-500" />
                                    Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </>
                            ) : (
                                'Unsaved changes'
                            )}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowTemplates(!showTemplates)}
                        className={showTemplates ? 'bg-neutral-100' : ''}
                    >
                        <LayoutTemplate className="w-4 h-4 mr-2" />
                        Templates
                    </Button>

                    <div className="h-6 w-px bg-neutral-300 mx-1" />

                    <Button variant="outline" size="sm" onClick={handleSave} disabled={saving}>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                    </Button>

                    <Button variant="outline" size="sm" onClick={() => ResumeDOCX.download(data)}>
                        <div className="flex items-center text-blue-700">
                            <FileText className="w-4 h-4 mr-2" />
                            DOCX
                        </div>
                    </Button>

                    <PDFDownloadButton
                        data={data}
                        fileName={`${data.personalInfo?.fullName || 'resume'}.pdf`}
                    />
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden relative">
                {/* Left Panel: Form Editor */}
                <div className="w-1/2 min-w-[400px] h-full overflow-y-auto border-r border-neutral-200 bg-white">
                    <ResumeForm data={data} onChange={setData} />
                </div>

                {/* Right Panel: Live Preview */}
                <div className="flex-1 h-full bg-neutral-100 overflow-y-auto p-8 flex justify-center relative">
                    <div className="origin-top scale-[0.85] shadow-2xl transition-all duration-300 ease-in-out">
                        <TemplateRenderer
                            templateId={data.templateId}
                            data={data}
                            className="min-h-[11in]"
                        />
                    </div>
                </div>

                {/* Templates Sidebar Overlay */}
                {showTemplates && (
                    <div className="absolute top-0 right-0 bottom-0 w-80 bg-white border-l border-neutral-200 shadow-xl z-10 transform transition-transform duration-300 ease-in-out overflow-y-auto">
                        <div className="p-4 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white z-10">
                            <h2 className="font-semibold text-neutral-900">Select Template</h2>
                            <button
                                onClick={() => setShowTemplates(false)}
                                className="text-neutral-500 hover:text-neutral-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <TemplateSelector
                            currentTemplateId={data.templateId}
                            onSelect={handleTemplateSelect}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
