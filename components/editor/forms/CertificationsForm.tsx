'use client'

import React from 'react'
import { Certification } from '@/lib/types/resume'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Plus, Trash2, Calendar } from 'lucide-react'

interface CertificationsFormProps {
    data: Certification[]
    onChange: (data: Certification[]) => void
}

export function CertificationsForm({ data = [], onChange }: CertificationsFormProps) {
    const addCertification = () => {
        const newCert: Certification = {
            id: crypto.randomUUID(),
            certificationName: '',
            issuingOrganization: '',
            issueYear: new Date().getFullYear()
        }
        onChange([...data, newCert])
    }

    const updateCert = (index: number, field: keyof Certification, value: any) => {
        const newData = [...data]
        newData[index] = { ...newData[index], [field]: value }
        onChange(newData)
    }

    const removeCert = (index: number) => {
        const newData = data.filter((_, i) => i !== index)
        onChange(newData)
    }

    return (
        <div className="space-y-6">
            {data.map((cert, index) => (
                <div key={cert.id || index} className="border border-neutral-200 rounded-xl p-6 bg-neutral-50 relative">
                    <button
                        onClick={() => removeCert(index)}
                        className="absolute top-4 right-4 text-neutral-400 hover:text-danger-500 transition-colors"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <Input
                            label="Certification Name"
                            value={cert.certificationName}
                            onChange={(e) => updateCert(index, 'certificationName', e.target.value)}
                            placeholder="e.g. AWS Certified Solutions Architect"
                        />
                        <Input
                            label="Issuing Organization"
                            value={cert.issuingOrganization}
                            onChange={(e) => updateCert(index, 'issuingOrganization', e.target.value)}
                            placeholder="e.g. Amazon Web Services"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Issue Year"
                            type="number"
                            value={cert.issueYear || ''}
                            onChange={(e) => updateCert(index, 'issueYear', parseInt(e.target.value))}
                            placeholder="2023"
                        />
                        <Input
                            label="Credential ID"
                            value={cert.credentialId || ''}
                            onChange={(e) => updateCert(index, 'credentialId', e.target.value)}
                            placeholder="ID-12345"
                        />
                    </div>
                </div>
            ))}

            <Button
                variant="outline"
                className="w-full border-dashed py-6 text-neutral-500 hover:text-primary-600 hover:border-primary-500 hover:bg-primary-50"
                onClick={addCertification}
            >
                <Plus className="w-5 h-5 mr-2" />
                Add Certification
            </Button>
        </div>
    )
}
