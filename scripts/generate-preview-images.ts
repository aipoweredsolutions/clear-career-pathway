/**
 * Template Preview Image Generator Guide
 * 
 * This script helps generate preview images for all templates.
 * Since we need actual screenshots, follow these manual steps:
 */

// List of templates that need preview images
export const MISSING_PREVIEWS = [
    { id: 'minimal', name: 'Clean Slate', path: '/public/templates/minimal-preview.png' },
    { id: 'compact', name: 'Compact Pro', path: '/public/templates/compact-preview.png' },
    { id: 'professional', name: 'Professional', path: '/public/templates/professional-preview.png' },
    { id: 'luxe', name: 'The Luxe', path: '/public/templates/luxe-preview.png' },
    { id: 'startup', name: 'The Startup', path: '/public/templates/startup-preview.png' },
    { id: 'artisan', name: 'The Artisan', path: '/public/templates/artisan-preview.png' },
    { id: 'split-contrast', name: 'The Split-Contrast', path: '/public/templates/split-contrast-preview.png' },
    { id: 'graduate', name: 'Graduate Professional', path: '/public/templates/graduate-preview.png' },
    { id: 'ats-classic', name: 'ATS Classic Serif', path: '/public/templates/ats-classic-preview.png' },
    { id: 'ats-minimal', name: 'ATS Ultra-Minimal', path: '/public/templates/ats-minimal-preview.png' },
    { id: 'ats-executive', name: 'ATS Executive Bold', path: '/public/templates/ats-executive-preview.png' },
    { id: 'ats-technical', name: 'ATS Dev-Console', path: '/public/templates/ats-technical-preview.png' },
    { id: 'ats-modern', name: 'ATS Modern Clean', path: '/public/templates/ats-modern-preview.png' },
    { id: 'ats-graduate', name: 'ATS New Grad', path: '/public/templates/ats-graduate-preview.png' },
    { id: 'ats-standard', name: 'ATS Pro-Standard', path: '/public/templates/ats-standard-preview.png' },
]

/**
 * MANUAL STEPS TO GENERATE PREVIEW IMAGES:
 * 
 * 1. Start the development server:
 *    npm run dev
 * 
 * 2. Navigate to: http://localhost:3000
 * 
 * 3. For each template in MISSING_PREVIEWS:
 *    a. Go to the template selector or create a new resume
 *    b. Select the template
 *    c. Use sample data (or create a sample resume)
 *    d. Take a screenshot of the rendered template
 *    e. Crop to A4 aspect ratio (210mm x 297mm or 794px x 1123px at 96 DPI)
 *    f. Optimize the image (compress to ~500-800KB)
 *    g. Save to the path specified above
 * 
 * 4. Verify all images are created:
 *    - Check /public/templates/ directory
 *    - Ensure all files are present
 *    - Verify file sizes are reasonable
 * 
 * ALTERNATIVE: Use Playwright or Puppeteer
 * 
 * If you want to automate this, you can use a headless browser:
 * 
 * ```bash
 * npm install --save-dev playwright
 * npx playwright codegen http://localhost:3000
 * ```
 * 
 * Then create a script to:
 * 1. Navigate to each template
 * 2. Wait for rendering
 * 3. Take a screenshot
 * 4. Save to the correct path
 */

// Sample data for testing templates
export const SAMPLE_RESUME_DATA = {
    personalInfo: {
        fullName: "Alex Johnson",
        professionalTitle: "Senior Software Engineer",
        email: "alex.johnson@email.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        city: "San Francisco",
        country: "USA",
        linkedinUrl: "https://linkedin.com/in/alexjohnson"
    },
    professionalSummary: {
        summaryText: "Results-driven software engineer with 8+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture. Passionate about creating elegant solutions to complex problems."
    },
    workExperience: [
        {
            jobTitle: "Senior Software Engineer",
            companyName: "Tech Innovations Inc.",
            startDate: "Jan 2020",
            endDate: "Present",
            isCurrent: true,
            roleDescription: "Lead development of cloud-native applications serving 1M+ users",
            achievements: [
                { achievementText: "Architected microservices platform reducing deployment time by 60%" },
                { achievementText: "Mentored team of 5 junior developers, improving code quality by 40%" },
                { achievementText: "Implemented CI/CD pipeline reducing bugs in production by 75%" }
            ]
        },
        {
            jobTitle: "Software Engineer",
            companyName: "Digital Solutions Co.",
            startDate: "Jun 2017",
            endDate: "Dec 2019",
            isCurrent: false,
            roleDescription: "Developed full-stack web applications using modern JavaScript frameworks",
            achievements: [
                { achievementText: "Built real-time analytics dashboard processing 100K events/second" },
                { achievementText: "Optimized database queries reducing load time by 50%" }
            ]
        }
    ],
    education: [
        {
            institutionName: "Stanford University",
            degree: "Bachelor of Science",
            fieldOfStudy: "Computer Science",
            endYear: 2017
        }
    ],
    skills: [
        { skillName: "React", proficiencyLevel: "expert" },
        { skillName: "Node.js", proficiencyLevel: "expert" },
        { skillName: "TypeScript", proficiencyLevel: "advanced" },
        { skillName: "AWS", proficiencyLevel: "advanced" },
        { skillName: "Docker", proficiencyLevel: "advanced" },
        { skillName: "PostgreSQL", proficiencyLevel: "advanced" }
    ],
    projects: [
        {
            projectName: "Open Source Analytics Platform",
            role: "Core Contributor",
            startDate: "2021",
            endDate: "Present",
            description: "Built scalable analytics platform used by 500+ companies",
            toolsUsed: ["React", "Node.js", "MongoDB"]
        }
    ],
    certifications: [
        {
            certificationName: "AWS Solutions Architect",
            issuingOrganization: "Amazon Web Services",
            issueYear: 2021
        }
    ],
    languages: [
        { languageName: "English", proficiencyLevel: "Native" },
        { languageName: "Spanish", proficiencyLevel: "Professional" }
    ]
}

console.log('Template Preview Generator Guide')
console.log('=================================')
console.log(`\nMissing ${MISSING_PREVIEWS.length} preview images:`)
MISSING_PREVIEWS.forEach((template, index) => {
    console.log(`${index + 1}. ${template.name} (${template.id})`)
    console.log(`   → ${template.path}`)
})
console.log('\nSee comments above for manual generation steps.')
