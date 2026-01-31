export interface BlogPost {
    id: string
    slug: string
    title: string
    excerpt: string
    content: string
    category: 'Resume Writing' | 'Career Growth' | 'Interview Prep'
    author: string
    publishedAt: string
    image: string
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: '1',
        slug: 'top-10-ats-friendly-skills-2024',
        title: 'Top 10 ATS-Friendly Skills for 2024',
        excerpt: 'Discover which skills are currently being prioritized by Applicant Tracking Systems and how to list them effectively.',
        content: `
            <p>In 2024, the job market is more competitive than ever. To get your resume noticed, you need to ensure it's optimized for Applicant Tracking Systems (ATS). Here are the top 10 skills that are currently in high demand across multiple industries.</p>
            
            <h2>1. Data Literacy</h2>
            <p>Regardless of your field, being able to interpret and act on data is a critical skill. Recruiters are looking for candidates who can make data-driven decisions.</p>
            
            <h2>2. Digital Collaboration Tools</h2>
            <p>With the rise of remote and hybrid work, proficiency in tools like Slack, Microsoft Teams, and Asana is no longer optional.</p>
            
            <h2>3. Emotional Intelligence</h2>
            <p>Soft skills are more important than ever. Being able to empathize and communicate effectively with colleagues is a top priority for hiring managers.</p>
            
            <!-- More content here -->
        `,
        category: 'Resume Writing',
        author: 'Alex Morgan',
        publishedAt: '2024-03-15',
        image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: '2',
        slug: 'how-to-write-professional-summary',
        title: 'How to Write a Professional Summary That Gets You Noticed',
        excerpt: 'Your summary is the first thing recruiters see. Learn how to make it impact-driven and concise.',
        content: `
            <p>Your professional summary is your elevator pitch. It needs to be punchy, relevant, and filled with impact. Here's how to craft a summary that stops the scroll.</p>
            
            <h2>Start with Your Title</h2>
            <p>Clearly state who you are. "Senior Project Manager with 10+ years of experience..." is a classic for a reason.</p>
            
            <h2>Highlight Your Primary Achievement</h2>
            <p>Don't just list tasks. Mention a specific win. "Increased team efficiency by 40%..." shows immediate value.</p>
        `,
        category: 'Resume Writing',
        author: 'James Sterling',
        publishedAt: '2024-03-10',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: '3',
        slug: 'ultimate-guide-to-resume-keywords',
        title: 'The Ultimate Guide to Resume Keywords',
        excerpt: 'Stop guessing and start matching. Learn how to find the right keywords for your target roles.',
        content: `
            <p>Keywords are the bridge between your resume and the hiring manager. If you don't use the right ones, the ATS might never let your resume through.</p>
        `,
        category: 'Career Growth',
        author: 'Sarah Chen',
        publishedAt: '2024-03-05',
        image: 'https://images.unsplash.com/photo-1454165833772-d99628a5ffa6?auto=format&fit=crop&w=800&q=80'
    }
]
