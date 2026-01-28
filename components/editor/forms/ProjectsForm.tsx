'use client'

import React from 'react'
import { Project } from '@/lib/types/resume'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Plus, Trash2, Link as LinkIcon } from 'lucide-react'

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
                    <button
                        onClick={() => removeProject(index)}
                        className="absolute top-4 right-4 text-neutral-400 hover:text-danger-500 transition-colors"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>

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
                        />
                        <Input
                            label="End Date"
                            type="month"
                            value={project.endDate || ''}
                            onChange={(e) => updateProject(index, 'endDate', e.target.value)}
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
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
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
