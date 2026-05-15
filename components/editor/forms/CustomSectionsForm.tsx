'use client'

import React from 'react'
import { CustomSection, CustomSectionItem } from '@/lib/types/resume'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Plus, Trash2, GripVertical, FileText, List, MoveDown } from 'lucide-react'
import { Textarea } from '@/components/ui/Textarea'

interface CustomSectionsFormProps {
    data: CustomSection[]
    onChange: (data: CustomSection[]) => void
}

export function CustomSectionsForm({ data = [], onChange }: CustomSectionsFormProps) {
    const addSection = () => {
        const newSection: CustomSection = {
            id: crypto.randomUUID(),
            title: 'New Section',
            items: [],
            content: '',
            displayOrder: data.length
        }
        onChange([...data, newSection])
    }

    const updateSection = (index: number, field: keyof CustomSection, value: any) => {
        const newData = [...data]
        newData[index] = { ...newData[index], [field]: value }
        onChange(newData)
    }

    const removeSection = (index: number) => {
        const newData = data.filter((_, i) => i !== index)
        onChange(newData)
    }

    const addItem = (sectionIndex: number) => {
        const newData = [...data]
        const section = newData[sectionIndex]
        const newItem: CustomSectionItem = {
            id: crypto.randomUUID(),
            text: '',
            displayOrder: (section.items?.length || 0)
        }
        section.items = [...(section.items || []), newItem]
        onChange(newData)
    }

    const updateItem = (sectionIndex: number, itemIndex: number, value: string) => {
        const newData = [...data]
        if (newData[sectionIndex].items) {
            newData[sectionIndex].items![itemIndex].text = value
            onChange(newData)
        }
    }

    const removeItem = (sectionIndex: number, itemIndex: number) => {
        const newData = [...data]
        if (newData[sectionIndex].items) {
            newData[sectionIndex].items = newData[sectionIndex].items!.filter((_, i) => i !== itemIndex)
            onChange(newData)
        }
    }

    return (
        <div className="space-y-8">
            <div className="bg-primary-50 p-4 rounded-xl border border-primary-100 mb-6">
                <p className="text-sm text-primary-800 font-medium">
                    Add custom sections like &quot;Awards&quot;, &quot;Interests&quot;, or &quot;Military Service&quot;.
                    You can choose between a text block or a list of bullet points.
                </p>
            </div>

            {data.map((section, sIndex) => (
                <div key={section.id || sIndex} className="border border-neutral-200 rounded-2xl p-6 bg-white shadow-sm relative group">
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button
                            onClick={() => updateSection(sIndex, 'forcePageBreak', !section.forcePageBreak)}
                            className={`p-1.5 rounded-lg border transition-all ${
                                section.forcePageBreak 
                                    ? 'bg-amber-100 border-amber-200 text-amber-700 shadow-sm' 
                                    : 'bg-neutral-50 border-neutral-200 text-neutral-400 hover:text-neutral-600'
                            }`}
                            title={section.forcePageBreak ? "Starts on next page" : "Start on next page"}
                        >
                            <MoveDown className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => removeSection(sIndex)}
                            className="text-neutral-400 hover:text-danger-500 transition-colors bg-neutral-50 p-1.5 rounded-lg border border-neutral-200"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <Input
                            label="Section Title"
                            value={section.title}
                            onChange={(e) => updateSection(sIndex, 'title', e.target.value)}
                            placeholder="e.g. Awards & Recognition"
                            className="text-lg font-bold"
                        />

                        {/* Content Switcher */}
                        <div className="flex gap-4 border-b border-neutral-100 pb-4">
                            <button
                                onClick={() => updateSection(sIndex, 'items', [])}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${!section.items || section.items.length === 0 ? 'bg-primary-50 text-primary-700 shadow-sm ring-1 ring-primary-200' : 'text-neutral-500 hover:text-neutral-700'}`}
                            >
                                <FileText className="w-4 h-4" />
                                Paragraph
                            </button>
                            <button
                                onClick={() => {
                                    if (!section.items || section.items.length === 0) {
                                        addItem(sIndex)
                                    }
                                }}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${section.items && section.items.length > 0 ? 'bg-primary-50 text-primary-700 shadow-sm ring-1 ring-primary-200' : 'text-neutral-500 hover:text-neutral-700'}`}
                            >
                                <List className="w-4 h-4" />
                                Bullet Points
                            </button>
                        </div>

                        {section.items && section.items.length > 0 ? (
                            <div className="space-y-3">
                                {section.items.map((item, iIndex) => (
                                    <div key={item.id || iIndex} className="flex gap-2 items-start">
                                        <div className="mt-2.5 text-neutral-300">
                                            <GripVertical className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                            <Input
                                                value={item.text}
                                                onChange={(e) => updateItem(sIndex, iIndex, e.target.value)}
                                                placeholder="Add a point..."
                                            />
                                        </div>
                                        <button
                                            onClick={() => removeItem(sIndex, iIndex)}
                                            className="mt-2 text-neutral-400 hover:text-danger-500"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addItem(sIndex)}
                                    className="mt-2 text-xs"
                                >
                                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Point
                                </Button>
                            </div>
                        ) : (
                            <Textarea
                                label="Section Content"
                                value={section.content || ''}
                                onChange={(e) => updateSection(sIndex, 'content', e.target.value)}
                                placeholder="Type your section content here..."
                                rows={4}
                            />
                        )}
                    </div>
                </div>
            ))}

            <Button
                variant="outline"
                className="w-full border-dashed py-8 text-neutral-500 hover:text-primary-600 hover:border-primary-500 hover:bg-primary-50 transition-all rounded-2xl"
                onClick={addSection}
            >
                <Plus className="w-6 h-6 mr-2" />
                Add Custom Section
            </Button>
        </div>
    )
}
