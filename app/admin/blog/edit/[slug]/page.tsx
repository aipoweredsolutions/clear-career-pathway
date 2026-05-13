import React from 'react'
import { AdminBlogEditor } from '@/components/admin/AdminBlogEditor'
import { getPostBySlug } from '@/lib/utils/mdx'
import { notFound } from 'next/navigation'

interface Props {
    params: Promise<{ slug: string }>
}

export default async function EditBlogPostPage({ params }: Props) {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    return <AdminBlogEditor initialData={post} />
}
