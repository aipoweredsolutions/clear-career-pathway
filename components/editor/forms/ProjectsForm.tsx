'use client'

import React from 'react'
import { Project } from '@/lib/types/resume'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Plus, Trash2, Link as LinkIcon, MoveDown, List } from 'lucide-react'

interface ProjectsFormProps {
    data: Project[]
    onChange: (data: Project[]) => void
}

export function ProjectsForm({ data = [], onChange }: ProjectsFormProps) {
    const addProject = () => {
        const newProject: Project = {
            id: crypto.randomUUID(),
            projectName: '',
            role: '',
            description: '',
            toolsUsed: [],
            startDate: '',
            endDate: ''
        }
        onChange([...data, newProject])
    }

    const updateProject = (index: number, field: keyof Project, value: any) => {
        const newData = [...data]
        newData[index] = { ...newData[index], [field]: value }
        onChange(newData)
    }

    const removeProject = (index: number) => {
        const newData = data.filter((_, i) => i !== index)
        onChange(newData)
    }

    return (
        <div className="space-y-8">
            {data.map((project, index) => (
                <div key={project.id || index} className="border border-neutral-200 rounded-xl p-6 bg-neutral-50 relative">
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button
                            onClick={() => updateProject(index, 'forcePageBreak', !project.forcePageBreak)}
                            className={`p-1.5 rounded-lg border transition-all ${
                                project.forcePageBreak 
                                    ? 'bg-amber-100 border-amber-200 text-amber-700 shadow-sm' 
                                    : 'bg-white border-neutral-200 text-neutral-400 hover:text-neutral-600'
                            }`}
                            title={project.forcePageBreak ? "Starts on next page" : "Start on next page"}
                        >
                            <MoveDown className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => removeProject(index)}
                            className="p-1.5 rounded-lg border border-neutral-200 bg-white text-neutral-400 hover:text-danger-500 transition-all"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <Input
                            label="Project Name"
                            value={project.projectName}
                            onChange={(e) => updateProject(index, 'projectName', e.target.value)}
                            placeholder="e.g. E-commerce Platform Redesign"
                        />
                        <Input
                            label="Role"
                            value={project.role || ''}
                            onChange={(e) => updateProject(index, 'role', e.target.value)}
                            placeholder="e.g. Lead UI Designer"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <Input
                            label="Start Date"
                            type="month"
                            value={project.startDate || ''}
                            onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                            min="1950-01"
                            max="2050-12"
                        />
                        <Input
                            label="End Date"
                            type="month"
                            value={project.endDate || ''}
                            onChange={(e) => updateProject(index, 'endDate', e.target.value)}
                            min="1950-01"
                            max="2050-12"
                        />
                    </div>

                    <div className="mb-4">
                        <Input
                            label="Project URL"
                            value={project.projectUrl || ''}
                            onChange={(e) => updateProject(index, 'projectUrl', e.target.value)}
                            placeholder="e.g. github.com/username/project"
                        />
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-medium text-neutral-700">Description</label>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    const current = project.description || ''
                                    const lines = current.split('\n')
                                    const bulleted = lines.map(line => {
                                        const trimmed = line.trim()
                                        if (trimmed && !trimmed.startsWith('•') && !trimmed.startsWith('-')) {
                                            return `• ${trimmed}`
                                        }
                                        return line
                                    }).join('\n')
                                    updateProject(index, 'description', bulleted)
                                }}
                                className="text-neutral-500 h-7 text-xs"
                            >
                                <List className="w-3 h-3 mr-1.5" />
                                Add Bullets
                            </Button>
                        </div>
                        <Textarea
                            value={project.description || ''}
                            onChange={(e) => updateProject(index, 'description', e.target.value)}
                            placeholder="Describe the project goals and your contributions..."
                            rows={3}
                        />
                    </div>

                    <div className="mb-4">
                        <Input
                            label="Tools & Technologies (comma separated)"
                            value={project.toolsUsed?.join(', ') || ''}
                            onChange={(e) => updateProject(index, 'toolsUsed', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                            placeholder="e.g. React, Tailwind, Supabase"
                        />
                    </div>
                </div>
            ))}

            <Button
                variant="outline"
                className="w-full border-dashed py-6 text-neutral-500 hover:text-primary-600 hover:border-primary-500 hover:bg-primary-50"
                onClick={addProject}
            >
                <Plus className="w-5 h-5 mr-2" />
                Add Project
            </Button>
        </div>
    )
}
