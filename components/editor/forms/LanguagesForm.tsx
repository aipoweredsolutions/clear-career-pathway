'use client'

import React from 'react'
import { Language, LanguageProficiency } from '@/lib/types/resume'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Plus, Trash2, Globe } from 'lucide-react'

interface LanguagesFormProps {
    data: Language[]
    onChange: (data: Language[]) => void
}

const PROFICIENCY_LEVELS: { value: LanguageProficiency; label: string }[] = [
    { value: 'basic', label: 'Basic' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'fluent', label: 'Fluent' },
    { value: 'native', label: 'Native/Bilingual' }
]

export function LanguagesForm({ data = [], onChange }: LanguagesFormProps) {
    const addLanguage = () => {
        const newLang: Language = {
            id: crypto.randomUUID(),
            languageName: '',
            proficiencyLevel: 'fluent'
        }
        onChange([...data, newLang])
    }

    const updateLang = (index: number, field: keyof Language, value: any) => {
        const newData = [...data]
        newData[index] = { ...newData[index], [field]: value }
        onChange(newData)
    }

    const removeLang = (index: number) => {
        const newData = data.filter((_, i) => i !== index)
        onChange(newData)
    }

    return (
        <div className="space-y-4">
            {data.map((lang, index) => (
                <div key={lang.id || index} className="flex flex-col md:flex-row gap-4 items-end bg-neutral-50 p-4 rounded-xl border border-neutral-200 relative">
                    <button
                        onClick={() => removeLang(index)}
                        className="absolute -top-2 -right-2 bg-white text-neutral-400 hover:text-danger-500 transition-colors rounded-full p-1 border border-neutral-200 shadow-sm"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex-1 w-full">
                        <Input
                            label="Language"
                            value={lang.languageName}
                            onChange={(e) => updateLang(index, 'languageName', e.target.value)}
                            placeholder="e.g. English, Spanish"
                        />
                    </div>

                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Proficiency</label>
                        <select
                            className="flex h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value={lang.proficiencyLevel}
                            onChange={(e) => updateLang(index, 'proficiencyLevel', e.target.value as LanguageProficiency)}
                        >
                            {PROFICIENCY_LEVELS.map(level => (
                                <option key={level.value} value={level.value}>{level.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            ))}

            <Button
                variant="outline"
                className="w-full border-dashed py-4 text-neutral-500 hover:text-primary-600 hover:border-primary-500"
                onClick={addLanguage}
            >
                <Plus className="w-4 h-4 mr-2" />
                Add Language
            </Button>
        </div>
    )
}
