export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    content: string;
    relatedTemplates: string[]; // slugs
}

export const BLOG_POSTS: BlogPost[] = [
    {
        slug: 'how-to-make-an-ats-friendly-resume',
        title: 'How to Make an ATS Friendly Resume in 2026',
        excerpt: 'Learn the exact formatting secrets that help your resume bypass Applicant Tracking Systems (ATS) and get into the hands of human recruiters.',
        date: '2026-04-20',
        category: 'Resume Tips',
        relatedTemplates: ['software-engineer-resume-template-free', 'accountant-resume-template', 'data-analyst-resume-template-free'],
        content: `
            <p>If you're applying for jobs online today, your resume is likely being read by a machine before a human ever sees it. These machines are called Applicant Tracking Systems (ATS), and they are the gatekeepers of modern hiring.</p>
            
            <h2>What is an ATS?</h2>
            <p>An ATS is software used by employers to collect, sort, and scan thousands of resumes. It looks for specific keywords, job titles, and formatting structures to determine if you're a match for the role.</p>
            
            <h2>Top 3 Rules for ATS Compatibility</h2>
            <ol>
                <li><strong>Stick to a Single Column:</strong> Multi-column layouts often confuse parsers, causing your data to be read out of order.</li>
                <li><strong>Use Standard Section Headers:</strong> Use "Work Experience" instead of "My Career Journey" to ensure the software knows where your history begins.</li>
                <li><strong>Avoid Graphics and Icons:</strong> Most ATS parsers cannot "read" images or complex graphics. Keep it text-based.</li>
            </ol>
            
            <h2>The Solution</h2>
            <p>Our templates are engineered specifically to pass these tests while maintaining a premium design for human eyes.</p>
        `
    },
    {
        slug: 'how-to-write-a-resume-with-no-experience',
        title: 'How to Write a Resume with No Experience',
        excerpt: 'Landing your first job or internship? Here is how to structure your resume to highlight your potential over your past.',
        date: '2026-04-22',
        category: 'Entry Level',
        relatedTemplates: ['internship-resume-template', 'entry-level-software-engineer-resume-template'],
        content: `
            <p>Starting your career can feel like a "chicken and egg" problem: you need experience to get a job, but you need a job to get experience. However, every professional started exactly where you are.</p>
            
            <h2>Focus on Education and Projects</h2>
            <p>When you lack professional history, your education becomes your primary asset. List relevant coursework, GPA (if high), and any academic honors.</p>
            
            <h2>Highlight Your Projects</h2>
            <p>Did you build an app? Write a research paper? Lead a student society? These are "experience" in the eyes of a recruiter. Detail the tools you used and the outcomes you achieved.</p>
        `
    }
];

export function getPostBySlug(slug: string) {
    return BLOG_POSTS.find(p => p.slug === slug);
}
