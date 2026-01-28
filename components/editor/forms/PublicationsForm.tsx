'use client'

import React from 'react'
import { Publication } from '@/lib/types/resume'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Plus, Trash2, BookOpen, Link as LinkIcon } from 'lucide-react'

interface PublicationsFormProps {
    data: Publication[]
    onChange: (data: Publication[]) => void
}

export function PublicationsForm({ data = [], onChange }: PublicationsFormProps) {
    const addPublication = () => {
        const newPub: Publication = {
            id: crypto.randomUUID(),
            title: '',
            platformOrPublisher: '',
            publicationYear: new Date().getFullYear(),
            url: ''
        }
        onChange([...data, newPub])
    }

    const updatePub = (index: number, field: keyof Publication, value: any) => {
        const newData = [...data]
        newData[index] = { ...newData[index], [field]: value }
        onChange(newData)
    }

    const removePub = (index: number) => {
        const newData = data.filter((_, i) => i !== index)
        onChange(newData)
    }

    return (
        <div className="space-y-6">
            {data.map((pub, index) => (
                <div key={pub.id || index} className="border border-neutral-200 rounded-xl p-6 bg-neutral-50 relative">
                    <button
                        onClick={() => removePub(index)}
                        className="absolute top-4 right-4 text-neutral-400 hover:text-danger-500 transition-colors"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="mb-4">
                        <Input
                            label="Publication Title"
                            value={pub.title}
                            onChange={(e) => updatePub(index, 'title', e.target.value)}
                            placeholder="e.g. Design Systems: A Practical Guide"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <Input
                            label="Publisher / Platform"
                            value={pub.platformOrPublisher || ''}
                            onChange={(e) => updatePub(index, 'platformOrPublisher', e.target.value)}
                            placeholder="e.g. Medium, Smashing Magazine"
                        />
                        <Input
                            label="Year"
                            type="number"
                            value={pub.publicationYear || ''}
                            onChange={(e) => updatePub(index, 'publicationYear', parseInt(e.target.value))}
                            placeholder="2023"
                        />
                    </div>

                    <div className="mb-4">
                        <Input
                            label="URL"
                            value={pub.url || ''}
                            onChange={(e) => updatePub(index, 'url', e.target.value)}
                            placeholder="e.g. medium.com/@user/article-title"
                        />
                    </div>
                </div>
            ))}

            <Button
                variant="outline"
                className="w-full border-dashed py-6 text-neutral-500 hover:text-primary-600 hover:border-primary-500"
                onClick={addPublication}
            >
                <Plus className="w-5 h-5 mr-2" />
                Add Publication
            </Button>
        </div>
    )
}
