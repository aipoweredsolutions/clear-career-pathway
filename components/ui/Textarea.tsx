import React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: string
    helperText?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, helperText, ...props }, ref) => {
        const charCount = props.value ? String(props.value).length : 0
        const showCount = (props as any).showCount
        const maxLength = props.maxLength

        return (
            <div className="w-full relative">
                <div className="flex justify-between items-end mb-1">
                    {label && (
                        <label className="block text-sm font-medium text-neutral-700">
                            {label}
                            {props.required && <span className="text-danger-500 ml-1">*</span>}
                        </label>
                    )}
                    {showCount && (
                        <span className={cn(
                            "text-[10px] font-black uppercase tracking-widest",
                            maxLength && charCount >= maxLength ? "text-danger-500" : "text-neutral-400"
                        )}>
                            {charCount}{maxLength ? ` / ${maxLength}` : ''}
                        </span>
                    )}
                </div>
                <textarea
                    ref={ref}
                    className={cn(
                        "w-full px-3 py-2 border rounded-lg text-neutral-900 placeholder-neutral-400 min-h-[100px]",
                        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                        "disabled:bg-neutral-100 disabled:cursor-not-allowed resize-y",
                        error ? "border-danger-500" : "border-neutral-300",
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-danger-600">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1 text-sm text-neutral-500">{helperText}</p>
                )}
            </div>
        )
    }
)

Textarea.displayName = 'Textarea'
