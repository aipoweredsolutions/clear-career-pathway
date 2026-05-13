import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content/blog')

export interface MDXPost {
    slug: string
    title: string
    excerpt: string
    date: string
    category: string
    author: string
    image: string
    content: string
}

export function getPostSlugs() {
    if (!fs.existsSync(contentDir)) {
        return []
    }
    return fs.readdirSync(contentDir).filter(file => file.endsWith('.mdx'))
}

export function getPostBySlug(slug: string): MDXPost {
    const realSlug = slug.replace(/\.mdx$/, '')
    const fullPath = path.join(contentDir, `${realSlug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
        slug: realSlug,
        title: data.title || '',
        excerpt: data.excerpt || '',
        date: data.date || '',
        category: data.category || '',
        author: data.author || '',
        image: data.image || '',
        content,
    }
}

export function getAllPosts(): MDXPost[] {
    const slugs = getPostSlugs()
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    return posts
}
