'use client'

import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Upload, X, FileText, AlertCircle } from 'lucide-react'

interface UploadDialogProps {
    isOpen: boolean
    onClose: () => void
    onUpload: (data: any) => void
}

export function UploadDialog({ isOpen, onClose, onUpload }: UploadDialogProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    if (!isOpen) return null

    const processFile = async (file: File) => {
        // Client-side validation
        const validTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]
        if (!validTypes.includes(file.type)) {
            setError('Please upload a PDF or DOCX file.')
            return
        }

        if (file.size > 10 * 1024 * 1024) {
            setError('File size must be less than 10MB.')
            return
        }

        setIsUploading(true)
        setError(null)

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Upload failed')
            }

            const result = await response.json()
            onUpload(result.data)
            onClose()
        } catch (err) {
            setError('Failed to process file. Please try again.')
        } finally {
            setIsUploading(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0])
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                    <h2 className="text-xl font-semibold text-neutral-900">Upload Resume</h2>
                    <button onClick={onClose} className="text-neutral-500 hover:text-neutral-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8">
                    <div
                        className={`
              border-2 border-dashed rounded-xl p-8 text-center transition-colors
              ${isDragging ? 'border-primary-500 bg-primary-50' : 'border-neutral-300 hover:border-primary-400'}
              ${error ? 'border-danger-300 bg-danger-50' : ''}
            `}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                    >
                        <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Upload className="w-8 h-8" />
                        </div>

                        <h3 className="text-lg font-medium text-neutral-900 mb-2">
                            Drag and drop your resume
                        </h3>
                        <p className="text-neutral-500 mb-6">
                            Supports PDF and DOCX (Max 10MB)
                        </p>

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    processFile(e.target.files[0])
                                }
                            }}
                        />

                        <Button onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                            {isUploading ? 'Uploading...' : 'Browse Files'}
                        </Button>
                    </div>

                    {error && (
                        <div className="mt-4 flex items-center text-danger-600 text-sm bg-danger-50 p-3 rounded-lg">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
