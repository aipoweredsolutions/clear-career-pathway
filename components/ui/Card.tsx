import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export function Card({ className = '', children, ...props }: CardProps) {
    return (
        <div className={`bg-white rounded-xl border border-neutral-200 shadow-sm ${className}`} {...props}>
            {children}
        </div>
    )
}

export function CardHeader({ className = '', children, ...props }: CardProps) {
    return (
        <div className={`p-6 border-b border-neutral-200 ${className}`} {...props}>
            {children}
        </div>
    )
}

export function CardContent({ className = '', children, ...props }: CardProps) {
    return (
        <div className={`p-6 ${className}`} {...props}>
            {children}
        </div>
    )
}

export function CardFooter({ className = '', children, ...props }: CardProps) {
    return (
        <div className={`p-6 border-t border-neutral-200 ${className}`} {...props}>
            {children}
        </div>
    )
}
