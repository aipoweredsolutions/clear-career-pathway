// ─────────────────────────────────────────────────────────────────────────────
// templates-seo.ts
// Canonical source of truth for all SEO-targeted resume example pages.
// Each entry must have UNIQUE howToWrite, keySkills, exampleBullets, and faqs.
// ─────────────────────────────────────────────────────────────────────────────

export interface SeoTemplate {
    slug: string
    templateId: string
    industry: string
    title: string
    name: string
    description: string
    sampleDataKey: string
    atsScore: number
    whyItWorks: string
    bestFor: string
    howToWrite: {
        intro: string
        experience: string
        skills: string
        formatting: string
    }
    keySkills: string[]
    exampleBullets: string[]
    faqs: { q: string; a: string }[]
    relatedSlugs: string[]
    previewImage?: string
}

export const SEO_TEMPLATES: SeoTemplate[] = [
    // ── TECHNOLOGY ────────────────────────────────────────────────────────────
    {
        slug: 'software-engineer-resume-example',
        templateId: 'ats-modern',
        industry: 'Technology',
        title: 'Software Engineer Resume Example',
        name: 'ATS Modern',
        description: 'Free software engineer resume example for 2025. ATS-optimised layout with role-specific keywords for SWE roles at FAANG, startups and scale-ups. Customise and download in minutes.',
        sampleDataKey: 'software-engineer',
        atsScore: 99,
        whyItWorks: 'Clean single-column layout with a prominent skills block ensures ATS parsers correctly extract your tech stack before a human ever reads the page. The reverse-chronological experience section is weighted toward measurable impact, which is exactly what engineering hiring managers scan for.',
        bestFor: 'Mid-level to senior software engineers applying to product companies, FAANG, or well-funded startups where ATS screening is the first filter.',
        howToWrite: {
            intro: 'A software engineer resume must clear two gatekeepers in sequence: an ATS that keyword-matches your stack against the job description, and a senior engineer or engineering manager who will spend under 30 seconds deciding if you are worth a phone screen. Your opening summary should name your specialisation (backend, full-stack, ML infrastructure), your primary language, and one concrete outcome — in two sentences.',
            experience: 'For each role, lead with the scope of the system you owned: traffic volume, data scale, team size, or revenue impact. Then write two to four bullets that follow the formula "Did X, measured by Y, resulting in Z." Avoid responsibilities ("worked on the payments service") and replace them with ownership ("re-architected the payments service from a monolith to event-driven microservices, cutting P99 latency from 800ms to 120ms"). Quantify wherever possible — percentages, absolute numbers, and time-to-resolution figures all land better than adjectives.',
            skills: 'Mirror the exact technology names used in the job posting. If the posting says "React" do not write "ReactJS". If it says "PostgreSQL" do not write "Postgres". ATS software performs string matching, not synonym resolution. Organise your skills into categories: Languages, Frameworks, Cloud/Infrastructure, Databases, and Tools. Do not list soft skills here — they belong in your bullets as evidence, not assertions.',
            formatting: 'One column, 10–12pt body font, standard section headers (Work Experience, Education, Skills, Projects). No tables, no text boxes, no columns — these break most ATS parsers. Keep to one page if under seven years of experience, two pages maximum for senior engineers. PDF format only. Name the file: FirstName-LastName-SoftwareEngineer-Resume.pdf.'
        },
        keySkills: ['Python', 'Java', 'TypeScript', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'CI/CD', 'REST API', 'GraphQL', 'microservices', 'agile', 'system design', 'code review', 'TDD'],
        exampleBullets: [
            'Re-architected monolithic checkout service into 6 event-driven microservices, reducing deployment time by 78% and eliminating a class of race conditions that caused $120K/year in revenue loss.',
            'Led migration of 4TB PostgreSQL database to Aurora with zero downtime, improving read throughput by 3.4× and reducing RDS costs by $8,400/month.',
            'Implemented distributed rate-limiting layer in Redis that handled 2.3M req/min at peak, cutting fraudulent API calls by 94% with no impact on legitimate traffic.',
            'Mentored 4 junior engineers through structured code review cycles; 3 were promoted within 18 months of joining the team.'
        ],
        faqs: [
            { q: 'Should a software engineer resume be one page or two?', a: 'One page for 0–6 years of experience; two pages for senior or staff engineers with substantial project history. Never pad to fill space — a tight one-page resume at five years is stronger than a padded two-pager.' },
            { q: 'What ATS keywords should a software engineer include?', a: 'Include every technology in the job posting verbatim. Beyond that, add standard CS terms: data structures, algorithms, distributed systems, REST, CI/CD, and your cloud provider (AWS/GCP/Azure). ATS systems match strings, not concepts.' },
            { q: 'Should I include side projects on a software engineer resume?', a: 'Yes, if they demonstrate skills not evidenced by your employment history. Give each project a name, link to the repo or live site, your tech stack, and one metric (stars, users, or a performance stat). Keep the projects section below work experience.' },
            { q: 'How do I write a software engineer resume with no experience?', a: 'Lead with a skills section that lists languages and frameworks you have genuinely used. Follow with a projects section showcasing two to four substantial builds. Then add education, any open-source contributions, and internships. Quantify everything — even a personal project can cite user counts, performance benchmarks, or lines of code.' }
        ],
        relatedSlugs: ['data-scientist-resume-example', 'product-manager-resume-example', 'devops-engineer-resume-example', 'frontend-developer-resume-example']
    },
    {
        slug: 'data-scientist-resume-example',
        templateId: 'ats-technical',
        industry: 'Technology',
        title: 'Data Scientist Resume Example',
        name: 'ATS Technical',
        description: 'Free data scientist resume example 2025. ATS-ready template with Python, ML, and statistical modelling keywords. Used by analysts at Google, Meta, and top-tier startups.',
        sampleDataKey: 'data-scientist',
        atsScore: 98,
        whyItWorks: 'The technical layout surfaces your methodologies and toolchain prominently — the two things data science hiring managers verify first. A dedicated "Tech Stack" row beneath your header means parsers and humans identify your capabilities within seconds.',
        bestFor: 'Data scientists, ML engineers, and quantitative analysts applying to tech companies, financial institutions, or research-driven organisations.',
        howToWrite: {
            intro: 'Data science resumes must bridge two audiences: an ATS or recruiter who filters for Python/SQL/ML keywords, and a hiring manager or principal scientist who evaluates your statistical rigour. Your summary should name your domain (NLP, computer vision, forecasting, causal inference), your preferred stack, and one signature project outcome in two to three sentences.',
            experience: 'Structure each role around the problem, your methodology, and the business outcome. Avoid generic claims ("built ML models") and be specific about model type, training data scale, and production impact. "Trained a gradient-boosted classifier on 18M labelled transactions (XGBoost, Python) achieving 96.2% precision at 88% recall, reducing fraud losses by $3.1M annually" is infinitely stronger than "developed fraud detection model." Hiring managers in this field will probe your methodology in interviews — write what you can defend.',
            skills: 'Separate languages (Python, R, SQL), ML frameworks (PyTorch, TensorFlow, scikit-learn, XGBoost), data infrastructure (Spark, Databricks, Airflow, dbt, BigQuery), and visualisation (Tableau, Matplotlib, Plotly). List statistical methods you use regularly: regression, hypothesis testing, A/B testing, Bayesian inference, time-series forecasting. Do not list Excel as a technical skill.',
            formatting: 'Two pages is acceptable for data scientists with three or more years of experience due to the need to describe methodology. Use standard headers: Professional Summary, Experience, Projects, Education, Technical Skills. Avoid graph-based skill bars — ATS cannot read SVGs and recruiters distrust self-assessed proficiency charts.'
        },
        keySkills: ['Python', 'R', 'SQL', 'PyTorch', 'TensorFlow', 'scikit-learn', 'XGBoost', 'Spark', 'dbt', 'BigQuery', 'Airflow', 'Tableau', 'A/B testing', 'hypothesis testing', 'regression analysis', 'NLP', 'time series', 'Bayesian inference', 'machine learning', 'deep learning'],
        exampleBullets: [
            'Built real-time churn prediction model (LightGBM, Python) on 45M user records achieving AUC 0.91, enabling targeted retention campaigns that reduced 30-day churn by 22% and saved $4.7M ARR.',
            'Designed and ran 140 A/B experiments across recommendation engine variants; statistical methodology adopted company-wide, increasing experiment velocity by 3× while maintaining 95% confidence thresholds.',
            'Architected feature store in Databricks serving 60 ML models in production with sub-20ms p99 latency, eliminating training-serving skew that had caused 11% prediction error drift.',
            'Published internal research on causal inference framework for marketing attribution; framework adopted across 3 business units, replacing last-touch attribution and reallocating $12M in media spend.'
        ],
        faqs: [
            { q: 'What is the best resume format for a data scientist?', a: 'Reverse-chronological with a prominent technical skills section. Your most recent roles should occupy 60% of the experience section. List projects separately if they demonstrate skills not evidenced in employment — especially if you are transitioning from academia.' },
            { q: 'Should I include Kaggle competitions on a data scientist resume?', a: 'Yes, if you placed in the top 20% or earned a medal. Include the competition name, your rank/medal, and the approach you used. Medal-level Kaggle work is taken seriously by top tech companies as a proxy for ML ability.' },
            { q: 'How do I write a data scientist resume with an academic background?', a: 'Lead with your most relevant publications or thesis project, framing outcomes in business terms where possible (impact on field, citations, grant funding). Then list technical skills, then academic experience reformatted as project-style bullets. Recruiters respond better to "deployed model to production" than "conducted research on."' }
        ],
        relatedSlugs: ['software-engineer-resume-example', 'product-manager-resume-example', 'business-analyst-resume-example']
    },
    {
        slug: 'product-manager-resume-example',
        templateId: 'ats-gold-standard',
        industry: 'Technology',
        title: 'Product Manager Resume Example',
        name: 'ATS Gold Standard',
        description: 'Free product manager resume example 2025. ATS-optimised with discovery, roadmap, and cross-functional leadership keywords. Download and customise in minutes.',
        sampleDataKey: 'product-manager',
        atsScore: 97,
        whyItWorks: 'A strong PM resume balances business outcomes with process fluency. This layout gives proportional weight to your impact metrics while still surfacing the methodological keywords (OKRs, discovery, roadmapping) that ATS systems filter on.',
        bestFor: 'Product managers at mid-stage startups or enterprise companies; APMs building their first PM resume; senior PMs moving into group product management.',
        howToWrite: {
            intro: 'Product management resumes are evaluated on two axes: the scope of the products you have owned (revenue impact, user scale, team size) and your process fluency (how you discover problems, prioritise, and ship). Your summary should name your product domain (consumer, B2B SaaS, marketplace, platform), the scale you have operated at, and one outcome that demonstrates business judgment.',
            experience: 'PM resumes must answer "what did you build and what happened as a result?" for every role. Quantify in terms hiring managers care about: revenue, conversion rate, NPS, activation, retention, or DAU/MAU. Specify the size of the teams you coordinated and the number of engineers you worked with — scope signals. Avoid describing process ("ran sprint planning") without outcome ("halved sprint carryover by restructuring planning ceremony, shipping 14% more features per quarter").',
            skills: 'List product tools (Jira, Linear, Productboard, Figma, Amplitude, Mixpanel), methodologies (OKRs, RICE prioritisation, jobs-to-be-done, continuous discovery), and any technical fluency relevant to your domain (SQL, API design, data modeling). Do not list "leadership" or "communication" as skills — demonstrate them through bullets.',
            formatting: 'One to two pages depending on seniority. Standard reverse-chronological format. If you have an MBA, list Education after Experience unless you are fewer than two years out of school. Use the words "product manager" and your specific domain keyword (e.g. "B2B SaaS product manager") explicitly in your summary — ATS systems search for these phrases verbatim.'
        },
        keySkills: ['product roadmap', 'OKRs', 'product discovery', 'A/B testing', 'user research', 'agile', 'scrum', 'Jira', 'Figma', 'Amplitude', 'Mixpanel', 'SQL', 'go-to-market', 'prioritisation', 'stakeholder management', 'cross-functional', 'product strategy', 'RICE', 'jobs-to-be-done'],
        exampleBullets: [
            'Launched redesigned onboarding flow (6-week discovery sprint, 3 engineers) that increased 7-day activation from 34% to 61%, adding $2.8M in ARR within one quarter of release.',
            'Defined and shipped payments internationalisation for 12 new markets; coordinated 4 engineering squads, legal, compliance, and finance across 9 months, generating $18M incremental revenue in year one.',
            'Introduced RICE prioritisation framework across 3 product squads; reduced unplanned work by 31% and improved sprint predictability from 58% to 84% in two quarters.',
            'Ran 22 continuous discovery interviews per month, synthesising insights into a validated opportunity backlog that increased engineering time spent on high-confidence bets from 40% to 73%.'
        ],
        faqs: [
            { q: 'How do I write a product manager resume with no PM experience?', a: 'Lead with transferable skills from adjacent roles: engineering (you understand technical constraints), design (you understand user needs), business analysis (you understand metrics), or customer success (you understand user problems). Frame past projects as mini-PM experiences: "identified problem, proposed solution, coordinated execution, measured outcome." Emphasise any cross-functional collaboration and quantified business results.' },
            { q: 'Should a product manager resume include technical skills?', a: 'Yes. Even non-technical PMs benefit from listing SQL (for data analysis), Figma (for prototyping collaboration), and any analytics platforms they use. Technical PMs should list their stack fluency — it is a genuine differentiator for senior roles at engineering-led companies.' }
        ],
        relatedSlugs: ['software-engineer-resume-example', 'ux-designer-resume-example', 'business-analyst-resume-example']
    },
    {
        slug: 'ux-designer-resume-example',
        templateId: 'ats-bauhaus',
        industry: 'Technology',
        title: 'UX Designer Resume Example',
        name: 'ATS Bauhaus',
        description: 'Free UX designer resume example 2025. Research, prototyping, and design systems keywords. Visually distinctive yet fully ATS-compliant. Download and customise in minutes.',
        sampleDataKey: 'ux-designer',
        atsScore: 96,
        whyItWorks: 'UX designer resumes must work for two audiences: ATS parsers that filter on specific tool names and methodologies, and design leads who will judge aesthetic sensibility at a glance. This template strikes the right balance — typographically considered but structurally compliant.',
        bestFor: 'UX designers, product designers, and UX researchers applying to tech companies, design agencies, or in-house creative teams.',
        howToWrite: {
            intro: 'UX design resumes succeed when they frame design work as business problem-solving, not craft. Your summary should name your specialisation (product design, service design, design systems, research-led design), your primary tools, and one outcome measured in user or business terms. Hiring managers at tech companies are evaluating whether you think in outcomes, not in deliverables.',
            experience: 'For each role, describe what you designed (scope and complexity), your process (research methods, prototyping fidelity, stakeholder collaboration), and what changed as a result (usability metrics, conversion, task completion, NPS). "Redesigned checkout flow" is weak. "Redesigned checkout flow based on 24 usability sessions and cart abandonment analysis, increasing purchase conversion by 18% and reducing support tickets related to payment errors by 41%" is strong.',
            skills: 'List tools explicitly: Figma, Sketch, Adobe XD, Protopie, Framer, InVision, Maze, Hotjar, Dovetail, UserTesting. Include research methods: usability testing, card sorting, tree testing, journey mapping, contextual inquiry. ATS systems match tool names — "prototyping software" will not match a search for "Figma." Also list any front-end fluency (HTML/CSS, React basics) as it is a genuine differentiator.',
            formatting: 'One to two pages. Include a portfolio link in your header — it is the single most important element on a UX resume and should be impossible to miss. Use standard section headers. Resist the temptation to use a multi-column layout to "show" your design skills — most ATS parsers misread columns and your portfolio is where you demonstrate visual ability.'
        },
        keySkills: ['Figma', 'user research', 'usability testing', 'prototyping', 'wireframing', 'design systems', 'information architecture', 'interaction design', 'user flows', 'journey mapping', 'Maze', 'Hotjar', 'accessibility', 'WCAG', 'responsive design', 'A/B testing', 'design thinking', 'card sorting'],
        exampleBullets: [
            'Led end-to-end redesign of mobile app onboarding (research → high-fidelity prototype → shipped) reducing time-to-first-value from 9.2 minutes to 3.1 minutes and increasing 7-day retention by 29%.',
            'Built and documented design system of 140 components adopted by 12 product squads, reducing design-to-development handoff time by 60% and achieving pixel-perfect implementation rate of 94%.',
            'Ran 18-week service design engagement for NHS digital health platform; ethnographic research with 62 patients and 34 clinicians produced journey map that identified 7 high-severity friction points, 4 of which were shipped within 6 months.',
            'Facilitated 40+ co-design workshops with cross-functional stakeholders across 3 business units, translating ambiguous briefs into validated design concepts with measurable success criteria.'
        ],
        faqs: [
            { q: 'Should a UX designer resume include a portfolio?', a: 'Absolutely — it is more important than the resume itself for most hiring managers. Include the URL prominently in your header. Make sure the link works and the portfolio loads quickly. If your portfolio is password-protected, mention the password in your cover letter or application note.' },
            { q: 'How long should a UX designer resume be?', a: 'One page for 0–4 years of experience; two pages for senior or principal designers. Your resume is a summary that earns a portfolio review — keep it tight and outcome-focused.' }
        ],
        relatedSlugs: ['product-manager-resume-example', 'graphic-designer-resume-example', 'software-engineer-resume-example']
    },
    {
        slug: 'devops-engineer-resume-example',
        templateId: 'ats-technical',
        industry: 'Technology',
        title: 'DevOps Engineer Resume Example',
        name: 'ATS Technical',
        description: 'Free DevOps engineer resume example 2025. Kubernetes, Terraform, CI/CD, and cloud infrastructure keywords. ATS-compliant template ready to customise and download.',
        sampleDataKey: 'devops-engineer',
        atsScore: 99,
        whyItWorks: 'DevOps roles are heavily keyword-screened. This template surfaces your toolchain, cloud certifications, and infrastructure scope in the first third of the page — exactly where ATS parsers and engineering managers focus their attention.',
        bestFor: 'DevOps, platform, site reliability, and cloud infrastructure engineers applying at SaaS companies, enterprise tech teams, or cloud-native startups.',
        howToWrite: {
            intro: 'DevOps engineering resumes are almost entirely keyword-driven at the screening stage. Your summary should name your primary cloud provider (AWS/GCP/Azure), your orchestration platform (Kubernetes, ECS, Nomad), and your IaC tooling (Terraform, Pulumi, CDK). Include your current scope — number of services, environments, or engineers you support — to establish scale.',
            experience: 'Focus on availability, reliability, and velocity metrics: uptime percentages, MTTR reduction, deployment frequency improvements, and infrastructure cost savings. Frame platform work in terms of the engineering teams you enabled: "Reduced developer environment setup from 3 days to 45 minutes, onboarding 40 engineers per quarter." If you have managed incidents, mention on-call responsibilities and MTTR figures.',
            skills: 'Organise into: Cloud Platforms (AWS, GCP, Azure with specific services), Containers/Orchestration (Docker, Kubernetes, Helm, Istio), IaC (Terraform, Pulumi, Ansible, CloudFormation), CI/CD (GitHub Actions, Jenkins, ArgoCD, GitLab CI), Monitoring (Datadog, Grafana, Prometheus, PagerDuty), and Languages (Python, Go, Bash). Certifications (AWS Solutions Architect, CKA, CKS) should appear prominently.',
            formatting: 'One to two pages. List certifications in your Education or a dedicated Certifications section — they are strong ATS signals. Standard single-column format. Name the file with your specialisation: FirstName-LastName-DevOps-Engineer-Resume.pdf.'
        },
        keySkills: ['Kubernetes', 'Terraform', 'AWS', 'Docker', 'CI/CD', 'GitHub Actions', 'ArgoCD', 'Helm', 'Prometheus', 'Grafana', 'Datadog', 'Python', 'Go', 'Bash', 'Linux', 'Infrastructure as Code', 'site reliability engineering', 'GitOps', 'service mesh', 'Istio'],
        exampleBullets: [
            'Migrated 240-service monorepo to GitOps deployment model (ArgoCD, Kubernetes), reducing deployment lead time from 4 hours to 12 minutes and eliminating class of manual deployment errors causing 2–3 incidents per month.',
            'Designed multi-region AWS infrastructure (Terraform) achieving 99.97% uptime SLA across 18 months; DR failover tested monthly with automated runbooks reducing RTO from 4 hours to 22 minutes.',
            'Implemented cost-optimised Kubernetes cluster autoscaling (Karpenter) reducing EC2 spend by $34,000/month while maintaining p99 latency SLOs for 60M daily requests.',
            'Built internal developer platform (Backstage) adopted by 180 engineers, reducing mean time to first PR in new service from 3 days to 4 hours.'
        ],
        faqs: [
            { q: 'Should a DevOps engineer list certifications on their resume?', a: 'Yes. AWS Solutions Architect, CKA, CKS, and Google Cloud Professional certifications are strong ATS signals and are specifically searched for by recruiters. List them in a dedicated Certifications section with the issuing body and year.' },
            { q: 'What is the difference between a DevOps and SRE resume?', a: 'DevOps resumes emphasise CI/CD pipelines, automation, and developer enablement. SRE resumes emphasise reliability metrics (SLOs, error budgets), incident management, and scalability engineering. Frame your experience to match the job description — many skills overlap.' }
        ],
        relatedSlugs: ['software-engineer-resume-example', 'data-scientist-resume-example', 'cybersecurity-analyst-resume-example']
    },
    {
        slug: 'frontend-developer-resume-example',
        templateId: 'ats-modern',
        industry: 'Technology',
        title: 'Front-End Developer Resume Example',
        name: 'ATS Modern',
        description: 'Free front-end developer resume example 2025. React, TypeScript, and performance optimisation keywords. ATS-compliant template ready to customise and download.',
        sampleDataKey: 'frontend-developer',
        atsScore: 98,
        whyItWorks: 'Front-end roles require demonstrating both technical depth (framework expertise, performance engineering) and product sensibility (accessibility, UX collaboration). This layout surfaces your stack in a scannable format while leaving room for impact-led experience bullets.',
        bestFor: 'Front-end and full-stack developers specialising in the browser layer, applying to product companies, agencies, or startups.',
        howToWrite: {
            intro: 'Front-end developer resumes must satisfy ATS keyword matching for specific frameworks (React, Vue, Angular — not just "JavaScript") while also demonstrating product impact to engineering managers. Your summary should name your primary framework, your performance engineering experience if relevant, and one outcome (a Core Web Vitals improvement, a bundle size reduction, or a conversion metric).',
            experience: 'Quantify performance impact where possible: bundle size reductions, LCP/CLS/FID improvements, Lighthouse score changes, and conversion or retention effects of UI changes. Also quantify scale: monthly active users, page views, or team size. "Rewrote legacy jQuery dashboard in React 18" is a chore. "Rewrote legacy jQuery dashboard in React 18 with concurrent rendering; reduced time-to-interactive by 67% for 1.4M monthly users, improving task completion rate by 12%" is a bullet that survives interview scrutiny.',
            skills: 'Frameworks first (React, Next.js, Vue, Nuxt, Angular, Svelte), then languages (TypeScript, JavaScript, HTML, CSS), then tooling (Webpack, Vite, ESBuild), testing (Jest, Cypress, Playwright), and design collaboration tools (Figma, Storybook). List accessibility experience explicitly (WCAG 2.1, ARIA) — it is increasingly screened for.',
            formatting: 'One page if under five years; two pages for senior engineers with substantial project history. A GitHub link in the header is expected and should not be omitted. Portfolio link optional but valuable for creative-leaning roles. Avoid visual resume builders that produce multi-column PDF output — they break ATS parsing.'
        },
        keySkills: ['React', 'TypeScript', 'Next.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux', 'GraphQL', 'REST API', 'Jest', 'Cypress', 'Webpack', 'Vite', 'Git', 'responsive design', 'accessibility', 'WCAG', 'performance optimisation', 'Storybook'],
        exampleBullets: [
            'Migrated 180-component design system from class-based React to hooks-based architecture with full TypeScript coverage; reduced bundle size by 34% and achieved 100% Lighthouse accessibility score.',
            'Led Core Web Vitals optimisation sprint (LCP, CLS, FID) across 14 high-traffic pages; LCP improved from 4.1s to 1.3s, contributing to 9% organic traffic increase measured over 90 days.',
            'Built real-time collaborative editing feature (Yjs, WebSockets, React) supporting 50 concurrent users with sub-50ms sync latency, increasing enterprise tier conversion by 22%.',
            'Implemented comprehensive E2E test suite (Playwright, 340 tests) achieving 97% coverage of critical user paths; reduced production regressions by 71% over 6 months.'
        ],
        faqs: [
            { q: 'Should a front-end developer include a portfolio?', a: 'Yes. A GitHub profile is mandatory. A deployed portfolio site is highly recommended. Many hiring managers will look at code quality in your repos before or during interviews — make sure your pinned repos are presentable.' },
            { q: 'Is TypeScript experience required for front-end jobs in 2025?', a: 'For most product company roles, yes. TypeScript has become the industry standard for production JavaScript applications. If you have not yet learned TypeScript, prioritise it before applying to mid-to-senior front-end roles.' }
        ],
        relatedSlugs: ['software-engineer-resume-example', 'ux-designer-resume-example', 'devops-engineer-resume-example']
    },

    // ── HEALTHCARE ────────────────────────────────────────────────────────────
    {
        slug: 'registered-nurse-resume-example',
        templateId: 'ats-nursing',
        industry: 'Healthcare',
        title: 'Registered Nurse Resume Example',
        name: 'ATS Nursing',
        description: 'Free registered nurse resume example 2025. ATS-optimised with clinical skills, certifications, and specialty keywords. Trusted by nurses at NHS, NHS Foundation Trusts, and private hospitals.',
        sampleDataKey: 'registered-nurse',
        atsScore: 99,
        whyItWorks: 'Nursing job applications are heavily screened by ATS for specific certifications (NMC PIN, BLS, ACLS), specialty keywords, and clinical skill sets before a recruitment manager reviews the file. This template surfaces all three categories in the first third of the page.',
        bestFor: 'Registered nurses at all stages: newly qualified NQNs, band 5–7 nurses applying within the NHS, specialist nurses moving into new clinical areas, and nurses returning to practice.',
        howToWrite: {
            intro: 'A registered nurse resume must lead with your NMC PIN (or equivalent registration number) and current registration status — omitting this is an immediate disqualifier for NHS and most private sector roles. Your professional summary should name your specialty (acute, ICU, A&E, community, theatre, oncology), your years of qualified experience, and one clinical achievement or quality improvement contribution.',
            experience: 'For each role, describe the clinical environment (ward type, bed numbers, patient acuity level), your patient caseload, and any leadership responsibilities (shift coordination, student mentorship, charge nurse duties). Include quality improvement work, audit participation, and any reduction in clinical incidents, medication errors, or patient falls. NHS recruiters specifically look for Band-appropriate scope and evidence of the NHS Values in practice.',
            skills: 'List clinical skills explicitly: IV cannulation, venepuncture, catheterisation, wound management, medication administration, early warning score monitoring, end-of-life care, patient assessment. ATS filters match these terms verbatim against person specifications. Then list certifications: BLS, ILS, ALS, Moving & Handling, and any specialty-specific training.',
            formatting: 'Two pages maximum. NMC PIN at the top. Certifications in a dedicated section. Use standard NHS-compatible headers: Personal Profile, Professional Registration, Core Clinical Skills, Work Experience, Education and Training, Continuing Professional Development. Avoid graphics and tables — NHS Trac system and most ATS parsers reject formatted PDFs.'
        },
        keySkills: ['NMC registration', 'patient assessment', 'medication administration', 'IV cannulation', 'venepuncture', 'wound management', 'BLS', 'ILS', 'electronic patient records', 'SBAR handover', 'early warning scores', 'catheterisation', 'infection control', 'safeguarding', 'end-of-life care', 'multidisciplinary team', 'clinical governance', 'NMC Code'],
        exampleBullets: [
            'Coordinated care for 6–8 complex acute patients per shift on a 28-bed medical ward, maintaining 96% medication administration accuracy across 12-month audit period.',
            'Led implementation of SBAR handover protocol across a 32-bed surgical ward; standardised communication reduced reported near-misses related to incomplete handover by 43% in six months.',
            'Mentored 4 student nurses through supervised practice assessments; 3 achieved outstanding performance ratings in final placement assessment, 1 secured first-choice Band 5 post on completion.',
            'Completed quality improvement project reducing catheter-associated UTI rate from 4.2 to 1.8 per 1,000 catheter-days over 8 months through bundle compliance monitoring and staff education.'
        ],
        faqs: [
            { q: 'Do I need to include my NMC PIN on my nursing resume?', a: 'Yes. Include it prominently near the top of your resume alongside your name and contact details. Most NHS and private sector employers will check NMC register status before interview — making it easy to find signals professionalism and reduces administrative friction.' },
            { q: 'What is the ideal length for a nursing CV?', a: 'Two pages for most Band 5–6 nurses. Three pages maximum for senior nurses, specialists, or those with extensive CPD, publications, or leadership experience. NQN resumes should be kept to one to two pages with a strong focus on placement experience.' },
            { q: 'How should I list bank or agency nursing experience?', a: 'List it as you would a standard role, with the agency name as employer and the types of ward/settings you covered in the description. Noting the breadth of clinical environments demonstrates adaptability — a strong quality for band 6+ applications.' }
        ],
        relatedSlugs: ['medical-assistant-resume-example', 'pharmacist-resume-example', 'physical-therapist-resume-example']
    },
    {
        slug: 'medical-assistant-resume-example',
        templateId: 'ats-professional',
        industry: 'Healthcare',
        title: 'Medical Assistant Resume Example',
        name: 'ATS Professional',
        description: 'Free medical assistant resume example 2025. Clinical and administrative skills, EMR keywords, and phlebotomy experience. ATS-optimised and ready to download.',
        sampleDataKey: 'medical-assistant',
        atsScore: 97,
        whyItWorks: 'Medical assistant roles require a dual skill set — clinical (phlebotomy, vitals, injections) and administrative (EMR, scheduling, coding). This template separates these categories clearly so hiring managers and ATS systems can evaluate each dimension without confusion.',
        bestFor: 'Certified and non-certified medical assistants applying to physician practices, urgent care centres, hospital outpatient departments, and specialty clinics.',
        howToWrite: {
            intro: 'Medical assistant resumes are evaluated on your clinical procedural skills, your EMR system proficiency, and your patient communication track record. Your summary should state your certification (CMA or RMA if applicable), your years of experience, your EMR platform expertise, and your clinical setting (family practice, urgent care, orthopaedics, etc.).',
            experience: 'For each role, specify the patient volume you managed (patients per day), the clinical procedures you performed independently, and any administrative responsibilities (scheduling, prior authorisation, medical coding). Quantify wherever possible — patient throughput, appointment accuracy rates, and reduction in patient wait times demonstrate operational value beyond clinical competence.',
            skills: 'Clinical skills: phlebotomy, EKG/ECG, vital signs, injections (IM, SC), wound care, specimen collection, sterilisation. Administrative skills: EMR platforms by name (Epic, Athenahealth, eClinicalWorks, NextGen), CPT/ICD-10 coding, insurance verification, prior authorisation, medical billing. Certifications: CMA (AAMA), RMA, CPR/BLS, HIPAA compliance.',
            formatting: 'One page for 0–5 years; up to two pages for experienced MAs with multiple specialties. Include your CMA/RMA certification prominently. Standard reverse-chronological format. No graphics or tables.'
        },
        keySkills: ['phlebotomy', 'EKG/ECG', 'vital signs', 'injections', 'Epic EMR', 'Athenahealth', 'CPT coding', 'ICD-10', 'prior authorisation', 'patient intake', 'HIPAA', 'infection control', 'specimen collection', 'wound care', 'medical billing', 'insurance verification', 'CMA certification', 'BLS'],
        exampleBullets: [
            'Performed phlebotomy and specimen collection for 25–30 patients per day in a high-volume family practice, maintaining 99.2% specimen integrity rate over 18-month tenure.',
            'Managed prior authorisation workflow for 8-physician orthopaedic practice using Athenahealth; reduced authorisation turnaround from 4.2 days to 1.8 days through process standardisation.',
            'Trained 3 new medical assistants on clinical procedures and EMR workflows; all 3 achieved independent certification within 90-day probationary period.',
            'Implemented patient intake protocol reducing average lobby wait time from 22 minutes to 11 minutes across a 6-provider urgent care clinic.'
        ],
        faqs: [
            { q: 'Should a medical assistant include both clinical and administrative skills?', a: 'Yes — most MA roles require both and employers screen for both. List them in separate subsections under Skills so ATS systems and hiring managers can quickly verify coverage of each dimension.' },
            { q: 'Is CMA certification required to get a medical assistant job?', a: 'Not always required but strongly preferred. Certified MAs typically earn more and access a wider range of roles, particularly in larger health systems and specialty practices. If you are not yet certified, note if you are actively pursuing it.' }
        ],
        relatedSlugs: ['registered-nurse-resume-example', 'pharmacist-resume-example', 'physical-therapist-resume-example']
    },
    {
        slug: 'pharmacist-resume-example',
        templateId: 'ats-academia-cv',
        industry: 'Healthcare',
        title: 'Pharmacist Resume Example',
        name: 'ATS Academia CV',
        description: 'Free pharmacist resume example 2025. Clinical pharmacy, dispensing, and patient counselling keywords. Designed for hospital, retail, and clinical pharmacist roles.',
        sampleDataKey: 'pharmacist',
        atsScore: 98,
        whyItWorks: 'Pharmacy resumes require clear separation of clinical competencies, registration credentials, and setting-specific experience. This template gives prominence to your GPhC registration and clinical skills — the two items pharmacy employers check first.',
        bestFor: 'Community pharmacists, hospital clinical pharmacists, pre-registration pharmacists, and locum pharmacists seeking permanent or contract roles.',
        howToWrite: {
            intro: 'Pharmacist resumes must open with your GPhC registration number and current registration status (or equivalent for non-UK applicants). Your professional summary should specify your practice setting (community, hospital, GP-embedded, care home, oncology), your years post-qualification, and any independent prescribing status, clinical specialisms, or advanced practice qualifications.',
            experience: 'For community settings, quantify prescription volume (items per day/week), clinical services delivered (MUR, NMS, NUMSAS), and any governance or superintendent responsibilities. For hospital settings, highlight ward round participation, clinical audit, medicines reconciliation, and any prescribing authority. Leadership experience (line management, student supervision, technician training) should be explicitly noted.',
            skills: 'Clinical: medicines optimisation, clinical review, independent prescribing, patient counselling, pharmacovigilance, controlled drugs management, anticoagulation monitoring, antimicrobial stewardship. Technical: dispensary management, PMR systems (Rx, Cegedim, Emis, PharmOutcomes), clinical audit, stock management. Regulatory: GPhC standards, GPHC CPD, clinical governance.',
            formatting: 'Two pages for experienced pharmacists. GPhC PIN in the header or immediately below your name. Certifications and CPD should have their own section. Standard chronological format — avoid creative formatting that makes CPD and registration details difficult to locate.'
        },
        keySkills: ['GPhC registration', 'independent prescribing', 'medicines reconciliation', 'clinical review', 'controlled drugs', 'patient counselling', 'medicines optimisation', 'antimicrobial stewardship', 'MUR', 'NMS', 'clinical audit', 'pharmacovigilance', 'dispensary management', 'pharmacy technician supervision', 'clinical governance'],
        exampleBullets: [
            'Conducted independent prescribing clinics for hypertension and diabetes patients in a GP-embedded role, managing a caseload of 120 patients with 94% achieving NICE treatment targets within 12 months.',
            'Led antimicrobial stewardship programme across a 300-bed district general hospital, contributing to 31% reduction in broad-spectrum antibiotic use and zero carbapenemase-producing organism outbreaks over 24 months.',
            'Delivered medicines reconciliation for 98% of admissions within 24 hours on a medical admissions unit, identifying 2.3 clinically significant discrepancies per patient on average.',
            'Supervised 4 pre-registration pharmacists through Royal Pharmaceutical Society foundation training programme; all 4 passed registration assessment on first attempt.'
        ],
        faqs: [
            { q: 'Should I include my GPhC registration number on my resume?', a: 'Yes — prominently, either next to your name or in a professional registration section. Employers routinely check GPhC register status before shortlisting, and making it easy to find demonstrates regulatory awareness.' },
            { q: 'How do I write a pharmacist resume when moving from community to hospital?', a: 'Emphasise transferable clinical skills (drug interactions, patient counselling, controlled drugs, clinical audit) and any hospital-adjacent experience (discharge prescriptions, NUMSAS, clinical review). Express genuine motivation for the setting change in your summary and consider completing RPS foundation or clinical pharmacy courses before applying.' }
        ],
        relatedSlugs: ['registered-nurse-resume-example', 'medical-assistant-resume-example', 'physical-therapist-resume-example']
    },
    {
        slug: 'physical-therapist-resume-example',
        templateId: 'ats-hospitality',
        industry: 'Healthcare',
        title: 'Physical Therapist Resume Example',
        name: 'ATS Hospitality',
        description: 'Free physical therapist resume example 2025. Manual therapy, rehabilitation, and patient outcomes keywords. ATS-compliant and ready to customise for PT roles.',
        sampleDataKey: 'physical-therapist',
        atsScore: 97,
        whyItWorks: 'Physical therapy roles require demonstrating clinical expertise in evaluation and treatment, a record of measurable patient outcomes, and regulatory compliance (licensure, CPD). This template surfaces all three cleanly while maintaining ATS compatibility.',
        bestFor: 'Licensed physical therapists across all settings — outpatient orthopaedics, acute care, rehabilitation, sports medicine, paediatrics, and home health.',
        howToWrite: {
            intro: 'Physical therapist resumes must open with your state licensure number (or HCPC registration for UK practitioners) and your primary practice setting. Your summary should name your clinical specialisations (orthopaedic, neurological, paediatric, sports, geriatric), any manual therapy certifications (NAIOMT, McKenzie, dry needling), and one outcome that demonstrates your clinical effectiveness.',
            experience: 'For each role, specify the patient population, your caseload size, the conditions you treated most frequently, and documented outcome improvements. Use standardised functional outcome measures to quantify improvement: FIM scores, LEFS, PSFS, QuickDASH, or DASH. "Treated patients with musculoskeletal injuries" is weak; "treated outpatient musculoskeletal caseload of 14 patients per day, achieving average 68% improvement in LEFS scores at discharge" is compelling.',
            skills: 'Manual therapy techniques by name: joint mobilisation, soft tissue mobilisation, dry needling, cupping, myofascial release, instrument-assisted soft tissue mobilisation (IASTM). Therapeutic exercise: therapeutic exercise prescription, functional movement screening, neuromuscular re-education. Technology: EMR systems (WebPT, Clinicient, Therapy Brands), telehealth platforms.',
            formatting: 'Two pages for experienced PTs. Licensure number in the header. Certifications prominently listed. Standard chronological format. Avoid graphics and columns which are commonly rejected by healthcare ATS systems.'
        },
        keySkills: ['manual therapy', 'therapeutic exercise', 'patient evaluation', 'orthopedic rehabilitation', 'neurological rehabilitation', 'dry needling', 'joint mobilisation', 'functional movement screening', 'WebPT', 'outcome measures', 'HCPC registration', 'CPD', 'gait analysis', 'sports rehabilitation', 'paediatric physiotherapy'],
        exampleBullets: [
            'Managed outpatient orthopaedic caseload of 16 patients per day in a high-volume sports medicine clinic; patients achieved average 71% improvement in QuickDASH scores at discharge against 58% national benchmark.',
            'Implemented evidence-based ACL rehabilitation protocol adopted across 4-clinic practice; standardisation reduced protocol deviation from 34% to 8% and decreased mean time-to-sport-return by 3.2 weeks.',
            'Led 12-week stroke rehabilitation programme for acute inpatient unit; 14 of 18 patients achieved functional independence in targeted ADLs as measured by FIM motor subscale at discharge.',
            'Supervised 6 physical therapy students through clinical placement; 5 received outstanding ratings in clinical competency assessments, 1 won department award for most improved student.'
        ],
        faqs: [
            { q: 'What certifications add most value to a physical therapist resume?', a: 'Board certification as a specialist (OCS, NCS, SCS, GCS, PCS) adds significant value. Manual therapy certifications (NAIOMT, McKenzie, SFMA) are highly valued in outpatient orthopaedic settings. Dry needling certification is increasingly expected in sports medicine roles.' },
            { q: 'Should I tailor my PT resume to each setting?', a: 'Yes. Acute care roles want to see FIM scoring and early mobilisation experience. Outpatient orthopaedic roles want to see manual therapy certifications and standardised outcome data. Sports medicine roles want sport-return-to-play protocols. Use the same base resume but adjust the summary and skills emphasis for each application.' }
        ],
        relatedSlugs: ['registered-nurse-resume-example', 'medical-assistant-resume-example', 'pharmacist-resume-example']
    },

    // ── FINANCE ───────────────────────────────────────────────────────────────
    {
        slug: 'financial-analyst-resume-example',
        templateId: 'ats-chronograph',
        industry: 'Finance',
        title: 'Financial Analyst Resume Example',
        name: 'ATS Chronograph',
        description: 'Free financial analyst resume example 2025. Financial modelling, valuation, and FP&A keywords. ATS-optimised for investment banking, corporate finance, and Big 4 roles.',
        sampleDataKey: 'financial-analyst',
        atsScore: 98,
        whyItWorks: 'Financial analysis roles are screened for specific technical skills (modelling, Excel, SQL, specific financial platforms) and deal or project scale. This template gives your quantified financial impact top billing while keeping ATS-critical skill keywords in a scannable format.',
        bestFor: 'Financial analysts in investment banking, corporate finance, FP&A, private equity, and Big 4 advisory applying for analyst to associate-level roles.',
        howToWrite: {
            intro: 'Financial analyst resumes must demonstrate two things immediately: your technical modelling capability and the scale of your financial work. Your summary should state your area of specialisation (FP&A, investment banking, corporate development, equity research, PE), your Excel and modelling proficiency, and a concrete deal size or analysis impact.',
            experience: 'Every bullet should contain a number. Deal size, portfolio value managed, cost savings identified, revenue modelled, or accuracy rate of forecasts — specificity builds credibility with finance hiring managers. "Built financial models" is universally meaningless. "Built integrated three-statement LBO model for $340M manufacturing acquisition including sensitivity analysis across 12 operating assumptions, used in board-level investment decision" is a bullet worth defending.',
            skills: 'Technical: Excel (advanced — pivot tables, VBA, INDEX-MATCH), financial modelling (DCF, LBO, M&A accretion/dilution, comparable analysis), SQL, Tableau or Power BI, Bloomberg, Capital IQ, FactSet. Accounting: GAAP/IFRS familiarity, financial statement analysis, variance analysis. List CFA progress (Level I passed, candidate for Level II) if applicable.',
            formatting: 'One page for analysts with fewer than five years of experience. Two pages for senior analysts or those with CFA and deal-heavy backgrounds. GPA should be included if above 3.5 and within the past five years. List university, degree, and major explicitly — finance ATS systems frequently filter on educational background.'
        },
        keySkills: ['financial modelling', 'DCF analysis', 'LBO modelling', 'Excel', 'VBA', 'SQL', 'Bloomberg', 'Capital IQ', 'variance analysis', 'budget forecasting', 'FP&A', 'P&L management', 'M&A', 'PowerPoint', 'GAAP', 'IFRS', 'financial reporting', 'scenario analysis', 'equity research'],
        exampleBullets: [
            'Built integrated three-statement LBO model for $430M consumer goods acquisition including 8 debt tranches, management fee waterfall, and 47-scenario sensitivity table; model became division template used on 6 subsequent deals.',
            'Owned monthly FP&A process for $120M EMEA P&L including actuals analysis, variance commentary, and rolling 12-month reforecast presented to CFO; improved forecast accuracy from ±8.2% to ±2.9% over 4 quarters.',
            'Analysed 14 bolt-on acquisition targets for private equity portfolio company (£850M EV); produced 14 comparable company analyses and 3 full DCF models, 2 of which progressed to LOI stage.',
            'Automated monthly management reporting pack (Excel VBA, Power Query) reducing manual preparation time from 3 days to 4 hours and eliminating class of formula errors in prior-period comparatives.'
        ],
        faqs: [
            { q: 'Should I include my GPA on a financial analyst resume?', a: 'Yes, if it is 3.5 or higher (US) or a 2:1 or above (UK) and you graduated within the past five years. Investment banking and Big 4 recruiting remains heavily GPA-filtered at the junior level. Omit it if it would work against you.' },
            { q: 'Is CFA worth listing on a financial analyst resume?', a: 'Absolutely. Passing CFA Level I demonstrates quantitative rigour and commitment. List all passed levels and note if you are a current candidate for the next level. For equity research and investment management roles, it is a significant differentiator.' }
        ],
        relatedSlugs: ['accountant-resume-example', 'investment-banker-resume-example', 'business-analyst-resume-example']
    },
    {
        slug: 'accountant-resume-example',
        templateId: 'ats-gold-standard',
        industry: 'Finance',
        title: 'Accountant Resume Example',
        name: 'ATS Gold Standard',
        description: 'Free accountant resume example 2025. GAAP, IFRS, financial reporting, and audit keywords. ATS-optimised for Big 4, industry, and public sector accounting roles.',
        sampleDataKey: 'accountant',
        atsScore: 99,
        whyItWorks: 'Accounting resumes are keyword-screened for specific qualifications (ACA, ACCA, CPA, CIMA), software (QuickBooks, SAP, Oracle, NetSuite), and regulatory frameworks (GAAP, IFRS, SOX). This template surfaces all three at the top of the page where they are immediately visible.',
        bestFor: 'Qualified and part-qualified accountants in practice (Big 4, mid-tier, boutique) or industry (management accounts, financial reporting, group consolidation) at all seniority levels.',
        howToWrite: {
            intro: 'Accounting resumes must lead with qualification status — ACA, ACCA, CPA, CIMA (qualified, part-qualified with exam stages completed, or finalist). This is frequently the first filter applied by hiring managers and recruiters. Your summary should then specify your practice area (audit, tax, advisory, management accounts, group reporting) and your industry specialism if relevant.',
            experience: 'Frame audit and advisory work around the complexity and size of engagements handled, not just the procedures performed. "Prepared statutory accounts" tells a recruiter nothing. "Prepared IFRS-compliant statutory accounts for 8 wholly-owned subsidiaries (revenues £12M–£180M) and group consolidation pack for £640M listed group" demonstrates scope and technical rigour. For industry accountants, quantify the P&L, balance sheet, or budget you owned.',
            skills: 'Qualifications and professional standards: ACA, ACCA, CPA, CIMA, GAAP, IFRS, FRS 102, SOX, UK GAAP. Software: SAP, Oracle Financials, NetSuite, Xero, QuickBooks, Sage, Hyperion, Workday Financials, Excel (advanced). Technical: consolidation, statutory accounts, management accounts, variance analysis, budget forecasting, financial controls.',
            formatting: 'Two pages for qualified accountants. List qualification stage (e.g., "ACA Finalist — 12 of 15 exams passed") prominently. Standard chronological format. Avoid decorative formatting — finance recruiting is conservative and unusual layouts raise questions about priorities.'
        },
        keySkills: ['ACA', 'ACCA', 'CIMA', 'GAAP', 'IFRS', 'financial reporting', 'statutory accounts', 'management accounts', 'consolidation', 'audit', 'SAP', 'Oracle', 'NetSuite', 'Xero', 'Excel', 'SOX', 'variance analysis', 'budget forecasting', 'FRS 102', 'tax compliance'],
        exampleBullets: [
            'Prepared IFRS 9 and IFRS 16 compliant consolidated group accounts for a £1.4B listed retail group with 23 subsidiaries across 6 jurisdictions, delivered within 60-day statutory filing window for 3 consecutive years.',
            'Owned monthly management accounts process for a £95M division including P&L, balance sheet, and cashflow; improved close cycle from 12 days to 5 business days through process redesign and Oracle automation.',
            'Led SOX 404 compliance review for UK subsidiary of NYSE-listed group, documenting 140 key controls and remediating 12 deficiencies identified by external auditors — zero material weaknesses in subsequent audit.',
            'Supervised 3 part-qualified accountants through ACCA structured training programme; all 3 passed P-level exams on first attempt and 2 received outstanding performance ratings in annual review.'
        ],
        faqs: [
            { q: 'Should a part-qualified accountant list their exam progress?', a: 'Yes — specifically note the qualification, exams passed, and your expected completion date. "ACA — 12 of 15 exams passed, qualifying in March 2026" gives employers a clear picture. Never misrepresent your stage.' },
            { q: 'How important is software proficiency on an accountant resume?', a: 'Very. SAP, Oracle, and NetSuite experience are frequently deal-breakers for senior finance roles in large companies. Xero and QuickBooks experience is essential for SME and practice roles. List every finance platform you have meaningful working experience with.' }
        ],
        relatedSlugs: ['financial-analyst-resume-example', 'investment-banker-resume-example', 'business-analyst-resume-example']
    },

    // ── MARKETING ─────────────────────────────────────────────────────────────
    {
        slug: 'marketing-manager-resume-example',
        templateId: 'ats-editorial',
        industry: 'Marketing',
        title: 'Marketing Manager Resume Example',
        name: 'ATS Editorial',
        description: 'Free marketing manager resume example 2025. Campaign management, demand generation, and marketing attribution keywords. ATS-optimised for B2B, B2C, and digital marketing roles.',
        sampleDataKey: 'marketing-manager',
        atsScore: 97,
        whyItWorks: 'Marketing manager resumes must demonstrate channel ownership, budget management, and measurable performance against targets. This layout puts revenue impact and channel keywords front and centre — the two dimensions marketing hiring managers evaluate first.',
        bestFor: 'Marketing managers across B2B SaaS, consumer, agency, and e-commerce settings with 3–10 years of experience.',
        howToWrite: {
            intro: 'Marketing manager resumes must answer three questions immediately: what channels do you own, what budget have you managed, and what growth have you driven? Your summary should name your primary channels (paid search, content, email, events, partnerships), your budget range, and one revenue or pipeline figure. Generic summaries ("results-driven marketer with passion for brands") are discarded immediately.',
            experience: 'Every marketing bullet should contain a metric: pipeline generated, MQL volume, CPL reduction, email open/click rates, conversion rates, ROAS, or revenue attributed. The context matters too — "generated £4.2M pipeline" is good; "generated £4.2M pipeline from content marketing programme with £180K budget (23× ROI)" is excellent. Specify the tools you used and the team size you managed or collaborated with.',
            skills: 'Channels: SEO, PPC/SEM, email marketing, content marketing, social media, paid social, events, ABM, partner marketing, affiliate. Tools: HubSpot, Salesforce, Marketo, Pardot, Google Analytics 4, Google Ads, Meta Ads Manager, Semrush, Ahrefs, Hootsuite, Mailchimp. Analytics: attribution modelling, cohort analysis, conversion rate optimisation, A/B testing.',
            formatting: 'One to two pages. Include a portfolio link if you have content or campaign examples to show. Standard chronological format. Avoid jargon and brand names that only exist within your current employer — describe the channel and metric, not the internal programme name.'
        },
        keySkills: ['demand generation', 'lead generation', 'content marketing', 'SEO', 'paid search', 'email marketing', 'HubSpot', 'Salesforce', 'Google Analytics', 'A/B testing', 'marketing automation', 'campaign management', 'budget management', 'ABM', 'conversion rate optimisation', 'social media', 'brand strategy', 'MQL', 'pipeline attribution'],
        exampleBullets: [
            'Built inbound content programme from zero to 42,000 monthly organic sessions in 18 months (Semrush, HubSpot), generating £2.8M in influenced pipeline at a CPL 67% below paid channel benchmarks.',
            'Managed £1.4M annual paid search and paid social budget (Google Ads, LinkedIn, Meta); achieved 31% YoY improvement in pipeline ROAS through bid strategy restructuring and landing page A/B testing.',
            'Launched ABM programme targeting 200 enterprise accounts; collaborated with 4 AEs and SDRs to produce account-specific content sequences achieving 3.4× higher meeting booking rate than standard outbound.',
            'Led rebranding and website redesign project (6-month cross-functional programme, 3 agencies); new site launched 14 days ahead of schedule, achieving 41% increase in demo requests within 60 days of go-live.'
        ],
        faqs: [
            { q: 'How do I demonstrate ROI on a marketing manager resume?', a: 'Always pair spend with outcome: "managed £200K budget, generated £1.8M pipeline (9× ROI)." For brand or awareness campaigns where direct ROI is harder to measure, use reach, engagement, and share-of-voice metrics instead. Specificity is always stronger than vague claims.' },
            { q: 'What marketing tools should I list on my resume?', a: 'List every platform you have substantive hands-on experience with, not platforms you have briefly logged into. Recruiters frequently ask technical questions about listed tools in screening calls. HubSpot, Salesforce, and GA4 experience is expected at manager level; list specialist tools (ABM platforms, attribution software, data clean rooms) as differentiators.' }
        ],
        relatedSlugs: ['digital-marketing-specialist-resume-example', 'content-writer-resume-example', 'product-manager-resume-example']
    },
    {
        slug: 'digital-marketing-specialist-resume-example',
        templateId: 'ats-metro',
        industry: 'Marketing',
        title: 'Digital Marketing Specialist Resume Example',
        name: 'ATS Metro',
        description: 'Free digital marketing specialist resume example 2025. SEO, PPC, social media, and email marketing keywords. ATS-compliant and ready to customise for digital roles.',
        sampleDataKey: 'digital-marketing-specialist',
        atsScore: 96,
        whyItWorks: 'Digital marketing specialists are hired for specific channel ownership. This template uses a clear skills block to surface your platform certifications and channel expertise immediately, so recruiters and ATS systems can confirm fit in under 10 seconds.',
        bestFor: 'Digital marketing specialists with 1–5 years of channel experience in SEO, PPC, social media, email, or content marketing, across agencies or in-house teams.',
        howToWrite: {
            intro: 'Digital marketing resumes are filtered by channel keyword before they are read by a human. Your summary must name the specific channels you own (not just "digital marketing") — SEO, Google Ads, Meta Ads, email, LinkedIn, TikTok, YouTube — along with the tools you use and one metric that demonstrates performance. Ambiguity in your specialisation is the most common reason digital marketing CVs are rejected at screening.',
            experience: 'Specify the monthly budget or traffic scale for each role. "Managed PPC campaigns" is meaningless. "Managed £45K/month Google Ads budget across 8 campaigns for UK e-commerce retailer, achieving 4.2 ROAS against 3.0 target" gives a recruiter everything they need to assess seniority and competence. Seasonal campaigns, year-over-year comparisons, and A/B test results all add strong evidence of analytical rigour.',
            skills: 'SEO: technical SEO, on-page, link building, Semrush, Ahrefs, Screaming Frog. PPC: Google Ads, Microsoft Advertising, Google Tag Manager, conversion tracking. Paid Social: Meta Ads Manager, LinkedIn Campaign Manager, TikTok Ads. Email: Mailchimp, Klaviyo, HubSpot, segmentation, deliverability. Analytics: GA4, Looker Studio, attribution, UTM tracking. Certifications: Google Ads, HubSpot, Meta Blueprint.',
            formatting: 'One page for specialists with fewer than five years of experience. Certifications in a dedicated section — Google Ads Certified, HubSpot Certified, and Meta Blueprint are meaningful differentiators. Include portfolio or case study link if available.'
        },
        keySkills: ['Google Ads', 'Meta Ads', 'SEO', 'Google Analytics 4', 'email marketing', 'Klaviyo', 'HubSpot', 'Semrush', 'Ahrefs', 'Google Tag Manager', 'conversion tracking', 'A/B testing', 'landing page optimisation', 'social media management', 'content creation', 'paid social', 'ROAS', 'CPL', 'UTM tracking', 'Looker Studio'],
        exampleBullets: [
            'Managed £380K annual Google Ads budget across search, shopping, and display campaigns for UK fashion retailer; achieved 4.8 ROAS against 3.2 target through SKU-level bidding strategy and negative keyword sculpting.',
            'Led SEO strategy for SaaS website growing organic sessions from 8,200 to 61,000/month over 14 months through technical audit remediation, topical authority content programme, and link acquisition (62 referring domains added).',
            'Rebuilt email automation programme (Klaviyo) with 14 behavioural flows replacing 3 generic sequences; email revenue grew 94% YoY, contributing 28% of total e-commerce revenue against 16% industry average.',
            'A/B tested 22 Meta Ads creative variants over 8 weeks; winning creative set reduced CPL by 44% and scaled to £85K/month spend without ROAS degradation.'
        ],
        faqs: [
            { q: 'What certifications should a digital marketing specialist list?', a: 'Google Ads certification (Search, Shopping, Display), HubSpot Content Marketing and Inbound Marketing, Meta Blueprint (for paid social specialists), and Google Analytics 4 certification. These are ATS keywords that recruiters and agency hiring managers actively filter on.' },
            { q: 'Agency vs in-house digital marketing experience — does it matter?', a: 'Both are valued but for different reasons. Agency experience demonstrates breadth (multiple clients, industries, budgets) and pace. In-house experience demonstrates depth and strategic ownership. Frame your experience to match the role — if going in-house, emphasise your analytical and strategic thinking; if going to an agency, emphasise client management and campaign velocity.' }
        ],
        relatedSlugs: ['marketing-manager-resume-example', 'content-writer-resume-example', 'ux-designer-resume-example']
    },
    {
        slug: 'content-writer-resume-example',
        templateId: 'ats-editorial',
        industry: 'Marketing',
        title: 'Content Writer Resume Example',
        name: 'ATS Editorial',
        description: 'Free content writer resume example 2025. SEO content, copywriting, and content strategy keywords. ATS-compliant and ready to customise. Download in minutes.',
        sampleDataKey: 'content-writer',
        atsScore: 95,
        whyItWorks: 'Content writing resumes must demonstrate both writing quality (which a portfolio shows) and commercial impact (which your resume must prove). This template presents writing breadth alongside measurable content outcomes — the combination most content marketing hiring managers require.',
        bestFor: 'Content writers, copywriters, content strategists, and SEO content specialists applying to agencies, in-house content teams, and SaaS marketing departments.',
        howToWrite: {
            intro: 'Content writer resumes require a portfolio link — without one, most applications do not progress past initial screening. Your summary should name your content specialisation (SEO content, technical writing, email copywriting, social media, UX writing, long-form thought leadership), your industries of experience, and one measurable outcome (organic traffic, email performance, or conversion rate).',
            experience: 'Quantify content impact wherever possible: organic traffic driven, keyword rankings achieved, email open and click rates, conversion rates on landing page copy, content production volume. "Wrote blog posts" is insufficient. "Produced 6 SEO articles per month (avg. 2,400 words) that collectively drove 94,000 organic visits in 12 months across 140 ranked keywords" demonstrates commercial value.',
            skills: 'Content types: blog posts, white papers, case studies, email sequences, landing pages, social media content, UX microcopy, video scripts, press releases. SEO tools: Semrush, Ahrefs, Clearscope, SurferSEO, Yoast. CMS: WordPress, Contentful, Webflow. Writing tools: Grammarly Business, Hemingway, Google Docs. Research: primary research, data journalism, expert interviews.',
            formatting: 'One page with a prominent portfolio link. Work samples in the application email or cover letter are expected. If your portfolio is unavailable, include two to three sentence-length writing samples in your resume itself — at the content writing level, the quality of your resume copy IS your writing sample.'
        },
        keySkills: ['SEO content writing', 'copywriting', 'content strategy', 'email marketing', 'blog writing', 'Semrush', 'Ahrefs', 'WordPress', 'keyword research', 'long-form content', 'content calendar', 'HubSpot', 'social media content', 'white papers', 'case studies', 'landing page copy', 'editorial planning', 'Clearscope', 'UX writing'],
        exampleBullets: [
            'Produced 8 SEO-targeted articles monthly (avg. 2,200 words, Clearscope-optimised) for B2B SaaS client, growing organic blog traffic from 3,400 to 67,000 sessions/month over 16 months with 340 ranking keywords.',
            'Wrote 6-email welcome sequence for e-commerce brand (Klaviyo); sequence achieved 48% open rate and 9.2% click rate against industry benchmarks of 28% and 3.4%, contributing £61K in first-purchase revenue annually.',
            'Authored 4 original research reports (avg. 5,800 words) including survey design, data analysis, and stakeholder interviews; reports generated 840 backlinks and 23 media pickups including TechCrunch and Marketing Week.',
            'Managed content calendar of 24 assets/month across blog, email, social, and sales enablement for 6-person content team; on-time delivery rate of 97% maintained over 18 months of continuous production.'
        ],
        faqs: [
            { q: 'What should a content writer include in their portfolio?', a: 'Three to six pieces that demonstrate range and results. For each piece, briefly note the brief, the SEO or commercial context, and the outcome (traffic, conversions, media coverage). Avoid showing only your creative favourites — show the work that moved metrics.' },
            { q: 'Should a content writer include SEO skills on their resume?', a: 'Yes, for any role beyond purely creative copywriting. SEO content writing is the largest segment of the content job market. Even if you prefer brand or narrative writing, demonstrating SEO literacy (keyword research, search intent, content structure) makes you employable across a far wider range of roles.' }
        ],
        relatedSlugs: ['marketing-manager-resume-example', 'digital-marketing-specialist-resume-example', 'ux-designer-resume-example']
    },

    // ── SALES ─────────────────────────────────────────────────────────────────
    {
        slug: 'sales-manager-resume-example',
        templateId: 'ats-professional',
        industry: 'Sales',
        title: 'Sales Manager Resume Example',
        name: 'ATS Professional',
        description: 'Free sales manager resume example 2025. Pipeline management, quota attainment, and team leadership keywords. ATS-optimised for B2B SaaS and enterprise sales roles.',
        sampleDataKey: 'sales-manager',
        atsScore: 98,
        whyItWorks: 'Sales resumes are evaluated almost entirely on numbers — quota attainment, team performance, ARR or revenue managed, and deal sizes. This template puts your sales metrics front and centre, which is exactly where sales hiring managers look first.',
        bestFor: 'Sales managers in B2B SaaS, enterprise technology, professional services, and field sales organisations managing teams of 3–15 individual contributors.',
        howToWrite: {
            intro: 'Sales manager resumes are filtered for numbers before anything else. Your summary must state your quota attainment percentage, the ARR or revenue you managed, your team size, and your primary sales motion (inbound, outbound, channel, enterprise). Hiring managers in sales spend the first five seconds looking for quota achievement — make it impossible to miss.',
            experience: 'Every sales role should have at least three quantified metrics: quota attainment (as a percentage), team size, and total revenue or ARR managed. Then add deal size (ACV/TCV), average sales cycle length, win rate if favourable, and any team performance improvements (ramp time reduction, average attainment lift). Career progression bullets ("promoted to Senior Sales Manager after...") signal upward trajectory.',
            skills: 'Sales methodology: MEDDIC, MEDDPICC, Challenger Sale, Sandler, SPIN selling, value-based selling. CRM: Salesforce, HubSpot CRM, Outreach, Salesloft, Gong, Clari, Chorus. Sales process: territory planning, pipeline management, forecasting, account planning, QBRs, deal reviews, coaching frameworks. Leadership: hiring, onboarding, performance management, OTE design.',
            formatting: 'One to two pages. Quota attainment percentages should appear in the first bullet of each role — do not bury them. Numbers in bold or at the start of bullets are more scannable. Standard chronological format. Avoid tables for quota data — use simple text bullets.'
        },
        keySkills: ['quota attainment', 'pipeline management', 'Salesforce', 'ARR growth', 'MEDDIC', 'enterprise sales', 'team leadership', 'sales forecasting', 'account planning', 'outbound prospecting', 'Gong', 'Outreach', 'deal reviews', 'territory management', 'channel sales', 'QBR', 'coaching', 'ramp time', 'win rate', 'ACV'],
        exampleBullets: [
            'Led 9-person enterprise sales team to 134% of $4.2M ARR target; promoted 2 AEs to senior roles, reduced average ramp time from 6.2 to 3.8 months through structured coaching programme and deal review cadence.',
            'Expanded EMEA territory from $1.1M to $3.8M ARR in 24 months by building partner channel (8 SIs), launching outbound SDR motion, and closing 3 strategic accounts with TCV >$400K.',
            'Implemented MEDDIC qualification framework across 7-rep team; improved pipeline accuracy from ±34% to ±9% enabling CFO-level confidence in quarterly forecast and reducing sandbagging incidents.',
            'Hired and onboarded 6 AEs in 9 months during rapid scale period; maintained 91% retention at 12 months through structured PIP process and weekly 1:1 coaching with Gong call review.'
        ],
        faqs: [
            { q: 'How do I write a sales manager resume when my quota was missed?', a: 'Be honest but contextualise. If you missed quota due to territory restructure, headcount reduction, or a market-wide downturn, note the context briefly. If you missed due to performance, focus on what you learned and changed. ATS does not screen for attainment percentage — it screens for the word "quota" — so lead with attainment in a favourable way and address context in interviews.' },
            { q: 'What sales metrics should I include on my resume?', a: 'Lead with quota attainment (%) and total ARR/revenue managed. Then add deal size (ACV), sales cycle length, win rate, and any team performance metrics (average team attainment, ramp time, retention rate). The more specific the number, the more credible it reads.' }
        ],
        relatedSlugs: ['account-executive-resume-example', 'marketing-manager-resume-example', 'operations-manager-resume-example']
    },
    {
        slug: 'account-executive-resume-example',
        templateId: 'ats-classic',
        industry: 'Sales',
        title: 'Account Executive Resume Example',
        name: 'ATS Classic',
        description: 'Free account executive resume example 2025. Quota attainment, prospecting, and CRM keywords. ATS-compliant for SaaS, enterprise, and field sales AE roles.',
        sampleDataKey: 'account-executive',
        atsScore: 99,
        whyItWorks: 'AE resumes are pure performance documents. Quota attainment in the first line of every role, deal sizes, and sales methodology keywords do all the filtering work. This clean single-column template keeps the focus entirely on numbers.',
        bestFor: 'Account executives at all stages — SDRs moving into closing roles, mid-market AEs, enterprise AEs — across SaaS, technology, and B2B services.',
        howToWrite: {
            intro: `Account executive resumes live and die by quota attainment. Your summary must state your attainment percentage (e.g., "consistently 120%+ of quota"), your primary segment (SMB, mid-market, enterprise), and your deal size range. Sales managers reviewing AE resumes spend under 10 seconds confirming these three data points before deciding whether to read further.`,
            experience: `Open every role with quota attainment and total ARR or revenue booked. Then add three to five bullets covering: how you sourced pipeline (self-generated vs inbound), the largest deal you closed with deal context, any outbound prospecting motion you built, and any awards or rankings within your sales team. Specificity signals credibility — "President's Club" or "Top 10% of 140 reps" are stronger than bare attainment percentages.`,
            skills: `CRM and enablement tools: Salesforce, HubSpot, Outreach, Salesloft, LinkedIn Sales Navigator, ZoomInfo, Gong, Chorus, Clari. Sales methodology: MEDDIC, Challenger, SPIN, Command of the Message, Sandler. Other: discovery questioning, multi-threading, executive presence, contract negotiation, procurement navigation.`,
            formatting: `One page for 0–5 years; up to two pages for enterprise AEs with complex deal histories. Quota attainment percentage in every experience header. Awards and rankings (President's Club, Top Rep) deserve a bullet of their own — do not bury them.`
        },
        keySkills: ['quota attainment', 'pipeline generation', 'Salesforce', 'outbound prospecting', 'MEDDIC', 'discovery', 'deal closing', 'contract negotiation', 'LinkedIn Sales Navigator', 'Outreach', 'Gong', 'multi-threading', 'executive engagement', 'ACV', 'sales cycle management', 'forecasting', 'cold calling', 'email prospecting'],
        exampleBullets: [
            'Closed $2.4M ARR in FY24 (127% of $1.9M quota); sourced 68% of pipeline through self-generated outbound including 3 strategic accounts >$200K ACV won against 2 incumbents.',
            'Named to President\'s Club (top 8% of 210 AEs globally) in FY23 with 138% attainment; largest deal $440K TCV, 4-month sales cycle, beaten 3 competitors including incumbent.',
            'Rebuilt mid-market segment territory from 0 after restructure; built $3.2M pipeline in 9 months through LinkedIn Sales Navigator prospecting and event-based pipeline generation, closing $780K ARR.',
            'Collaborated with SDR team to design outbound sequence for new vertical (legal tech); sequence generated 34 first meetings in 6 weeks at a 12% email reply rate, 3× above company average.'
        ],
        faqs: [
            { q: 'Should I list President\'s Club on my AE resume?', a: 'Absolutely — it is one of the strongest signals on a sales resume. List it as a bullet in the relevant role, note the year, your ranking or percentile, and the attainment threshold required to qualify.' },
            { q: 'How do I write an AE resume without strong quota numbers?', a: 'Focus on other sales metrics: pipeline generated, win rate, average deal size, and number of deals closed. If you are an SDR moving into an AE role, lead with outbound meeting generation metrics (meetings booked, show rate, pipeline influenced). Context matters — note your territory size, market conditions, and team average for comparison.' }
        ],
        relatedSlugs: ['sales-manager-resume-example', 'marketing-manager-resume-example', 'business-analyst-resume-example']
    },

    // ── EDUCATION ─────────────────────────────────────────────────────────────
    {
        slug: 'teacher-resume-example',
        templateId: 'ats-academic',
        industry: 'Education',
        title: 'Teacher Resume Example',
        name: 'ATS Academic',
        description: 'Free teacher resume example 2025. Curriculum design, classroom management, and assessment keywords. ATS-compliant for primary, secondary, and further education roles.',
        sampleDataKey: 'teacher',
        atsScore: 97,
        whyItWorks: 'Teaching resumes are screened for QTS/PGCE status, subject specialism, key stage experience, and Ofsted-relevant vocabulary. This template surfaces all four in the opening section — the exact priority order used by school hiring coordinators.',
        bestFor: 'Qualified and newly qualified teachers applying to primary, secondary, and further education institutions in the UK, US, and international settings.',
        howToWrite: {
            intro: 'Teaching resumes must immediately establish your qualified teacher status (QTS, PGCE, PGDE, or state certification equivalent), your subject specialism, and your key stage experience. UK school hiring coordinators and international school applicant tracking systems filter on these criteria before reading the personal statement.',
            experience: 'For each teaching role, specify the school type (academy, grammar, independent, international), the student age range, class sizes, and your key stage coverage. Include any exam results you can quantify: "A-level Chemistry cohort — 78% A/B grades against school average of 64%." Note any additional responsibilities: head of year, form tutor, curriculum lead, NQT mentor, Ofsted lead, revision programme coordinator.',
            skills: 'Pedagogical approaches: differentiated instruction, formative assessment, AfL (Assessment for Learning), retrieval practice, spaced repetition, metacognition. Technology: Google Classroom, Microsoft Teams, Seesaw, SIMS, iSAMS, Classcharts. Specialist skills by subject — note exam board specifications you have taught (AQA, Edexcel, OCR, IB, AP).',
            formatting: 'Two pages. QTS status and subject specialism in the opening line of your personal profile. List CPD and professional development separately — SENCO qualification, NPQSL, or NPQ programmes are strong differentiators for leadership roles. References from headteachers are standard and expected at interview stage.'
        },
        keySkills: ['QTS', 'curriculum design', 'differentiated instruction', 'formative assessment', 'classroom management', 'AQA', 'Edexcel', 'behaviour management', 'SEND', 'safeguarding', 'Google Classroom', 'SIMS', 'progress monitoring', 'parent communication', 'revision strategies', 'AfL', 'retrieval practice', 'pastoral care'],
        exampleBullets: [
            'Taught GCSE and A-level Biology to Years 10–13; 2024 A-level cohort achieved 74% A*/A grades against school average of 58%, with 6 students progressing to Russell Group medicine programmes.',
            'Designed and delivered new Year 9 STEM elective programme adopted across 3 parallel classes; student satisfaction rated 4.7/5.0 in end-of-year survey, highest-rated elective in school.',
            'Led school\'s Reading Recovery intervention for Year 7 students at risk; 14 of 18 students in programme met expected reading age within one academic year.',
            'Coordinated GCSE revision programme (40 students, 6 subjects, 8 weeks); programme participants outperformed non-participants by average 0.8 grade per subject in 2024 results.'
        ],
        faqs: [
            { q: 'Should I include my NQT year on my teaching resume?', a: 'Yes, as a distinct entry in your experience section. Note the school, year group, subjects taught, and any targets achieved during the induction period. Most schools view a completed NQT year positively — it demonstrates you have been through the formal development process.' },
            { q: 'How long should a teacher\'s CV be?', a: 'Two pages is standard. School business managers and headteachers review large volumes of applications and appreciate concise, well-structured CVs. Longer CVs (3+ pages) are appropriate for experienced teachers applying for leadership roles (HOD, SENCO, Deputy Head) where a full CPD record is expected.' }
        ],
        relatedSlugs: ['professor-resume-example', 'social-worker-resume-example']
    },
    {
        slug: 'professor-resume-example',
        templateId: 'ats-academia-cv',
        industry: 'Education',
        title: 'Professor / Academic CV Example',
        name: 'ATS Academia CV',
        description: 'Free professor and academic CV example 2025. Publications, grants, teaching, and research keywords. Full academic CV format for lecturer, senior lecturer, and professorial roles.',
        sampleDataKey: 'professor',
        atsScore: 96,
        whyItWorks: 'Academic CVs follow a different convention from commercial resumes — they are longer, publications-first, and structured around research impact. This template uses academic CV conventions while remaining machine-readable for university HR systems that use ATS.',
        bestFor: 'Lecturers, senior lecturers, readers, and professors in UK, US, and international higher education institutions applying for academic and research posts.',
        howToWrite: {
            intro: 'Academic CVs are significantly different from commercial resumes. They are typically 4–8 pages for established academics, lead with research and publications rather than employment history, and include sections not found in commercial formats: grants and funding, PhD supervision, editorial and reviewing roles, conference presentations, and media/public engagement. There is no one-page rule in academia.',
            experience: 'List teaching experience by module, level (undergraduate/postgraduate), year, and student numbers. Include course design, new module development, and student satisfaction scores where available. Research experience should centre on project titles, funding sources, collaborators, and outputs. Administrative experience (programme leader, admissions tutor, committee membership) demonstrates institutional engagement valued in promotion decisions.',
            skills: 'Research methods by discipline, statistical software (SPSS, R, NVivo, ATLAS.ti, Stata), grant application experience (ESRC, AHRC, EPSRC, Leverhulme, Wellcome, ERC, NIH — specify amounts secured), supervision of postgraduate research students, journal editorial experience, and peer review record. Teaching qualifications: HEA Fellowship (Associate, Fellow, Senior, Principal) should be prominently noted.',
            formatting: 'Multiple pages (4–8) for established academics; 2–3 for early-career researchers. Sections in standard academic order: Education, Academic Appointments, Publications (peer-reviewed/books/chapters/reports), Grants and Funding, Teaching, PhD Supervision, Presentations, Professional Activities, Media Engagement. Publications must follow the citation format of your discipline.'
        },
        keySkills: ['research', 'publications', 'grant writing', 'teaching', 'PhD supervision', 'peer review', 'ESRC', 'HEA fellowship', 'curriculum design', 'research methods', 'NVivo', 'R', 'Stata', 'module leadership', 'postgraduate teaching', 'journal editing', 'conference presentations', 'academic writing'],
        exampleBullets: [
            'Published 24 peer-reviewed journal articles (14 in REF 2* or above outlets) with h-index of 16 and 1,840 Google Scholar citations; 3 articles ranked top 5% by Altmetric in year of publication.',
            'Secured and led £780K ESRC standard grant (2021–2024, co-I with 2 universities) producing 6 journal articles, 1 policy report cited in parliamentary debate, and 4 PhD completions.',
            'Designed and delivered 3 postgraduate modules (70–120 students each) with average student satisfaction rating of 4.6/5.0 — within top 15% of department across 4 consecutive years.',
            'Supervised 9 PhD students to successful completion; 7 secured academic appointments, 2 moved to senior policy roles — supervision record recognised in Faculty Teaching Excellence Award 2023.'
        ],
        faqs: [
            { q: 'How long should an academic CV be?', a: 'There is no page limit in academia. Early-career researchers (postdoc, first lectureship) typically have 2–4 pages. Mid-career academics 4–8 pages. Senior professors with extensive publication and grant records may have 10+ pages. The convention is comprehensiveness, not conciseness.' },
            { q: 'Should publications go at the top or bottom of an academic CV?', a: 'Publications are typically listed in a dedicated section after academic appointments and before grants in most UK and US conventions. For research-intensive roles, publications should precede teaching experience. For teaching-focused roles (teaching fellow, senior lecturer with significant teaching load), teaching may come before publications.' }
        ],
        relatedSlugs: ['teacher-resume-example']
    },

    // ── CREATIVE ──────────────────────────────────────────────────────────────
    {
        slug: 'graphic-designer-resume-example',
        templateId: 'ats-bauhaus',
        industry: 'Creative',
        title: 'Graphic Designer Resume Example',
        name: 'ATS Bauhaus',
        description: 'Free graphic designer resume example 2025. Adobe Creative Suite, brand design, and typography keywords. ATS-compliant with portfolio-ready formatting.',
        sampleDataKey: 'graphic-designer',
        atsScore: 95,
        whyItWorks: 'Graphic designer resumes face a dual challenge: they must satisfy ATS keyword matching while also signalling visual sophistication. This template is typographically distinctive without using multi-column layouts, tables, or graphics that would break ATS parsing.',
        bestFor: 'Graphic designers, visual designers, and brand designers applying to agencies, in-house creative teams, and studios with 1–8 years of experience.',
        howToWrite: {
            intro: 'Graphic design resumes must include a portfolio link in the header — it is more important than any other element on the page. Your summary should name your design specialisation (brand identity, publication design, packaging, motion, digital/UI), your software stack, and the types of clients or industries you have worked with. "Creative designer with a passion for great work" is immediately discarded.',
            experience: 'Describe design work in terms of scope (project type, deliverables, client scale) and outcome (business result, campaign reach, award recognition). "Designed brand identity for start-up" is weak; "Developed complete brand identity system (logo, typography, colour, tone of voice guidelines, 60-page brand book) for Series B SaaS company; identity used across $4M product launch" is strong. Note client names where possible — they establish your commercial experience level.',
            skills: 'Software: Adobe Illustrator, Photoshop, InDesign, After Effects, Premiere Pro, Figma, Sketch, Cinema 4D. Specialisms: brand identity, logo design, editorial/print, packaging, motion graphics, digital advertising, social media design, typography. Production: print-ready artwork, pre-press, press checking, digital asset management.',
            formatting: 'One page. Portfolio URL in the header — no exceptions. If your portfolio is password-protected, include access instructions. Standard chronological format. Resist using a heavily designed resume as a "creative showcase" — most ATS systems and many creative agencies parse them incorrectly. Your portfolio is where creativity is demonstrated.'
        },
        keySkills: ['Adobe Illustrator', 'Photoshop', 'InDesign', 'Figma', 'brand identity', 'typography', 'logo design', 'editorial design', 'packaging design', 'motion graphics', 'After Effects', 'print production', 'visual communication', 'art direction', 'colour theory', 'campaign design', 'social media design', 'UI design'],
        exampleBullets: [
            'Led complete brand identity project for Series A fintech (£18M raise); delivered logo, typography system, colour palette, brand guidelines (92 pages), and 240 digital asset templates — identity rolled out across product, marketing, and investor materials.',
            'Designed annual report for FTSE 250 client (220 pages, print run 4,000); project delivered in 6-week timeline with 3 press passes, zero print errors, and shortlisted for DBA Design Effectiveness Award.',
            'Created paid social creative for £1.2M campaign across 6 markets (18 formats, 120 variants); creative testing showed 38% uplift in click-through rate vs. previous campaign creative.',
            'Won 3 D&AD Pencils (2 Wood, 1 Graphite) across packaging and publication categories over 4 years of agency tenure.'
        ],
        faqs: [
            { q: 'Should a graphic designer use a designed resume?', a: 'Use a visually considered but ATS-safe resume — not a multi-column, heavily designed PDF that breaks parsers. Your portfolio demonstrates design ability. Your resume should confirm your skills and experience. A typographically careful single-column PDF scores well on both ATS and human review.' },
            { q: 'What should a graphic designer portfolio include?', a: 'Three to six projects that show range and process. For each project, show the brief, your approach (including early concepts where possible), the final deliverables, and the outcome (client feedback, campaign results, award nominations). Quality over quantity — five excellent case studies beat fifteen mediocre ones.' }
        ],
        relatedSlugs: ['ux-designer-resume-example', 'content-writer-resume-example', 'marketing-manager-resume-example']
    },

    // ── HR ────────────────────────────────────────────────────────────────────
    {
        slug: 'hr-manager-resume-example',
        templateId: 'ats-professional',
        industry: 'Human Resources',
        title: 'HR Manager Resume Example',
        name: 'ATS Professional',
        description: 'Free HR manager resume example 2025. HRBP, employee relations, talent acquisition, and CIPD keywords. ATS-optimised for generalist and specialist HR manager roles.',
        sampleDataKey: 'hr-manager',
        atsScore: 98,
        whyItWorks: 'HR manager resumes are filtered for specific HR qualifications (CIPD), employment law knowledge, HRIS platforms, and headcount management scale. This template surfaces all four in the format HR recruiting teams recognise and trust.',
        bestFor: 'HR managers, HRBPs, and senior HR advisors applying to generalist, specialist, or business partner roles across all industries.',
        howToWrite: {
            intro: 'HR manager resumes must lead with your CIPD qualification level (Level 3, 5, or 7) or equivalent qualification — it is the primary filter applied in UK HR recruiting. Your summary should specify whether you are a generalist HRBP or a specialist (talent acquisition, L&D, reward, ER), the headcount you have supported, and your industry experience. The scale of your HR operation (number of employees supported, number of direct reports) belongs in the summary.',
            experience: 'For each role, specify the total employee headcount you supported, the size of your HR team, and the nature of your HR work (standalone, centre of excellence, HRBP embedded in business). Quantify: time-to-fill for talent acquisition, attrition rate improvements, engagement score increases, L&D uptake rates, and ER case resolution times. HR metrics are under-used on most HR resumes — use them to differentiate.',
            skills: 'Employment law: UK Employment Law, TUPE, redundancy process, disciplinary and grievance, ACAS Codes of Practice. HRIS/ATS platforms: Workday, SAP SuccessFactors, BambooHR, Personio, Lever, Greenhouse. Specialist: job evaluation (Hay/Korn Ferry), compensation benchmarking, talent acquisition, L&D, succession planning, TUPE management, wellbeing programme design.',
            formatting: 'Two pages. CIPD level prominently stated in your name section or personal profile. Standard chronological format. Avoid jargon that is specific to your current employer (internal programme names, custom process names) — describe the HR activity in universal terms.'
        },
        keySkills: ['CIPD Level 7', 'employment law', 'HRBP', 'talent acquisition', 'employee relations', 'Workday', 'SuccessFactors', 'TUPE', 'redundancy', 'performance management', 'L&D', 'succession planning', 'compensation and benefits', 'engagement surveys', 'HR policy', 'grievance and disciplinary', 'ACAS', 'workforce planning'],
        exampleBullets: [
            'Supported 1,200-employee manufacturing division as standalone HRBP, managing full generalist remit including ER (average 18 active cases), talent acquisition (40 hires/year), L&D (£280K budget), and reward review.',
            'Led TUPE transfer of 340 employees across 4 sites following business acquisition; zero Employment Tribunal claims filed, 97% employee retention at 12 months post-transfer — outcome cited in group HR annual report.',
            'Designed and implemented structured performance management framework replacing annual review process; manager completion rate increased from 61% to 94% within 2 cycles, and voluntary attrition fell from 18% to 11%.',
            'Reduced time-to-fill for salaried roles from 67 to 38 days through ATS optimisation (Greenhouse), interview process redesign, and agency panel renegotiation saving £124K in first year of implementation.'
        ],
        faqs: [
            { q: 'Is CIPD qualification required for HR manager roles?', a: 'For most HR manager and HRBP roles in the UK, CIPD Level 5 is expected and Level 7 is preferred for senior roles. Some organisations recruit talented HR practitioners without CIPD and support them through qualification, but having it removes a significant barrier. If you are studying, note your expected completion date.' },
            { q: 'How do I write an HR manager resume when moving from specialist to generalist?', a: 'Emphasise the breadth of your specialist experience and any cross-functional exposure you have had. Note any project work that touched other HR disciplines. Express genuine motivation for the generalist move in your summary and consider taking on a secondment or project in an unfamiliar area before applying.' }
        ],
        relatedSlugs: ['recruiter-resume-example', 'operations-manager-resume-example', 'project-manager-resume-example']
    },
    {
        slug: 'recruiter-resume-example',
        templateId: 'ats-metro',
        industry: 'Human Resources',
        title: 'Recruiter Resume Example',
        name: 'ATS Metro',
        description: 'Free recruiter resume example 2025. Talent acquisition, ATS platforms, and sourcing keywords. ATS-optimised for in-house, agency, and RPO recruiter roles.',
        sampleDataKey: 'recruiter',
        atsScore: 98,
        whyItWorks: 'Recruiting resumes are evaluated on volume metrics, time-to-fill, quality of hire, and sourcing channel diversity. This template puts your fill metrics and technical sourcing skills at the top — the exact data points recruiting managers evaluate at a glance.',
        bestFor: 'In-house talent acquisition specialists, agency recruiters, executive search consultants, and RPO delivery leads at all experience levels.',
        howToWrite: {
            intro: 'Recruiter resumes are screened for the same metrics recruiters use to screen candidates. Your summary must state your annual hire volume, your specialisation (technical, commercial, executive, volume), your industry focus, and your ATS platforms. Without volume numbers in the summary, your resume looks like every other recruiter application.',
            experience: 'Quantify every role: annual hire volume, time-to-fill (versus target), offer acceptance rate, source-of-hire breakdown, cost-per-hire if managed, and quality-of-hire metrics (90-day retention, hiring manager satisfaction). Agency recruiters should include billed revenue, billings against target, and retained versus contingency split. Note the seniority bands you recruit for — it signals your commercial exposure.',
            skills: 'ATS and sourcing tools: Greenhouse, Lever, Workday Recruiting, SmartRecruiters, LinkedIn Recruiter, LinkedIn Talent Insights, Indeed, Seek, Glassdoor, GitHub, Boolean search. Agency: Bullhorn, Vincere, JobAdder. Assessment: SHL, Korn Ferry Leadership Assessments, HireVue, Codility, TestGorilla. Methodology: structured interviews, competency frameworks, diversity sourcing, employer branding.',
            formatting: 'One to two pages. Annual hire volume and time-to-fill in the first bullet of every role. Agency recruiters should state billed revenue per year — it is the primary signal read by agency directors. Standard chronological format.'
        },
        keySkills: ['talent acquisition', 'LinkedIn Recruiter', 'Greenhouse', 'Boolean search', 'candidate sourcing', 'stakeholder management', 'offer management', 'time-to-fill', 'employer branding', 'diversity hiring', 'technical recruiting', 'agency recruiting', 'executive search', 'ATS administration', 'interview design', 'compensation benchmarking', 'pipeline management'],
        exampleBullets: [
            'Delivered 140 hires annually (75% technical, 25% commercial) in-house for 800-person SaaS company; maintained 34-day median time-to-fill against 45-day company target and 94% offer acceptance rate.',
            'Billed £380K in FY24 (127% of £300K target) across permanent technology placements in the £60K–£140K range; sourced 62% of placements through direct LinkedIn outreach, reducing client reliance on job boards.',
            'Built and managed graduate talent pool of 340 pre-qualified candidates for FMCG client through campus partnerships; reduced agency spend by £190K/year and improved graduate retention to 89% at 12 months.',
            'Designed structured interview framework for engineering function (12 interviewers, 4 stages); standardisation improved hiring manager satisfaction from 3.2 to 4.6/5.0 and reduced time to hiring decision by 8 days.'
        ],
        faqs: [
            { q: 'Should an agency recruiter use the same resume for in-house applications?', a: 'Tailor it. In-house roles value stakeholder management, process improvement, and quality-of-hire metrics. Reframe agency billing achievements as business development and client management skills. Emphasise your in-house secondments or retained-style work where possible.' },
            { q: 'What metrics matter most on a recruiter resume?', a: 'Hire volume, time-to-fill, and offer acceptance rate for in-house roles. Billed revenue and billings-vs-target for agency roles. Quality-of-hire (90-day retention, hiring manager NPS) is a differentiator that most recruiters do not include and that stands out immediately to TA leaders.' }
        ],
        relatedSlugs: ['hr-manager-resume-example', 'sales-manager-resume-example', 'operations-manager-resume-example']
    },

    // ── OPERATIONS ────────────────────────────────────────────────────────────
    {
        slug: 'project-manager-resume-example',
        templateId: 'ats-gold-standard',
        industry: 'Operations',
        title: 'Project Manager Resume Example',
        name: 'ATS Gold Standard',
        description: 'Free project manager resume example 2025. PMP, PRINCE2, Agile, and stakeholder management keywords. ATS-optimised for IT, construction, and corporate PM roles.',
        sampleDataKey: 'project-manager',
        atsScore: 98,
        whyItWorks: 'Project manager resumes are screened for certifications (PMP, PRINCE2, AgilePM), project scale (budget, team size, timeline), and delivery record (on-time, on-budget). This layout gives each dimension its own visual weight so ATS and human readers can assess them independently.',
        bestFor: 'Project managers across IT, construction, transformation, and corporate functions applying for PM, senior PM, and programme management roles.',
        howToWrite: {
            intro: 'Project management resumes must lead with your certification (PMP, PRINCE2, AgilePM, MSP), your primary methodology (waterfall, agile, hybrid), and the scale of projects you have managed (budget, team size, duration, and number of stakeholders). Hiring managers in this field filter on certification first — position it prominently in your summary and consider including it in your name section.',
            experience: 'For each project or role, lead with project budget, team size, duration, and delivery outcome (on-time/on-budget percentage, savings achieved, business benefit realised). The three-line structure that works: (1) Project scope, (2) Methodology and process used, (3) Outcome and business impact. RAID log management, stakeholder reporting, and change control are expected — only mention them when quantified or at an interesting scale.',
            skills: 'Methodologies: PRINCE2, PMP, Agile, Scrum, Kanban, SAFe, MSP, AgilePM. Tools: MS Project, Jira, Asana, Monday.com, Smartsheet, Confluence, Miro, Power BI. Governance: risk management, RAID logs, change control, steering committees, benefits realisation, programme reporting.',
            formatting: 'Two pages for experienced PMs. Certifications prominently placed — consider a dedicated "Certifications" section rather than burying them in education. Each experience entry should include project budget and team size in the opening line or header. Standard chronological format.'
        },
        keySkills: ['PMP', 'PRINCE2', 'agile', 'Scrum', 'stakeholder management', 'risk management', 'MS Project', 'Jira', 'budget management', 'programme management', 'change management', 'RAID log', 'delivery governance', 'benefits realisation', 'SAFe', 'waterfall', 'project governance', 'reporting', 'cross-functional leadership'],
        exampleBullets: [
            'Delivered £14M ERP migration programme (SAP S/4HANA, 18 months, 3 workstreams, 40-person project team) 3 weeks ahead of schedule and £380K under budget; zero business-critical incidents in first 90 days post go-live.',
            'Managed portfolio of 12 concurrent technology projects (total budget £8.2M) for financial services client; maintained 91% on-time delivery rate across 24 months through enhanced RAID governance and fortnightly steering committee cadence.',
            'Recovered failing infrastructure refresh project (6 months delayed, £1.2M over budget at handover); diagnosed root causes, restructured programme governance, and delivered completion 11 weeks later with no further budget increase.',
            'Implemented agile transformation for 60-person engineering function (SAFe, 8 teams, 6-month programme); sprint predictability improved from 54% to 87% and team velocity increased 31% within 3 quarters of full adoption.'
        ],
        faqs: [
            { q: 'Is PMP certification worth getting for a project manager resume?', a: 'Yes — for mid-to-senior PM roles, particularly in the US, PMP certification is widely required or strongly preferred. PRINCE2 is the equivalent standard in the UK. AgilePM or SAFe certification adds value for agile delivery environments. Certifications are ATS keywords that many systems filter on explicitly.' },
            { q: 'How do I write a project manager resume without formal PM certification?', a: 'Focus on project scale, delivery record, and governance experience. Quantify budget, team size, and on-time delivery rate. Note any methodology training (Scrum Master, agile workshops). Many organisations will support PM certification once you are in role — express your intention to certify in your cover letter.' }
        ],
        relatedSlugs: ['operations-manager-resume-example', 'business-analyst-resume-example', 'hr-manager-resume-example']
    },
    {
        slug: 'operations-manager-resume-example',
        templateId: 'ats-professional',
        industry: 'Operations',
        title: 'Operations Manager Resume Example',
        name: 'ATS Professional',
        description: 'Free operations manager resume example 2025. Process improvement, P&L, and operational KPI keywords. ATS-optimised for logistics, manufacturing, and corporate operations roles.',
        sampleDataKey: 'operations-manager',
        atsScore: 97,
        whyItWorks: 'Operations manager resumes are filtered for P&L scope, headcount managed, and measurable operational improvements. This template places financial and people management scale at the top of each role entry — where operations hiring managers look first.',
        bestFor: 'Operations managers in logistics, manufacturing, retail, hospitality, healthcare, and corporate services managing teams of 10–200 people.',
        howToWrite: {
            intro: 'Operations manager resumes must open with your operational scale: P&L responsibility (or budget managed), direct and indirect headcount, number of sites or facilities, and operational throughput (units, transactions, revenue, patients, students). The rest of your profile should address your improvement track record and methodology.',
            experience: 'Every role should contain three types of numbers: scale (budget, headcount, throughput), improvement (cost reduction, efficiency gain, error rate reduction, productivity improvement), and context (industry, environment, complexity). Lean, Six Sigma, and operational excellence methodology should be named where used, with the outcomes those approaches delivered.',
            skills: 'Operational methodology: Lean, Six Sigma (DMAIC), 5S, Kaizen, OEE, PDCA, TQM, ISO standards. Operations tools: SAP, Oracle, WMS platforms, ERP systems, Power BI, Excel (advanced). Specific to logistics/manufacturing: supply chain management, inventory management, capacity planning, demand forecasting, fleet management, warehouse management systems.',
            formatting: 'Two pages. P&L scope and headcount in the first line of each role. Methodologies (Lean Six Sigma, ISO) prominently listed. Standard chronological format.'
        },
        keySkills: ['P&L management', 'Lean', 'Six Sigma', 'process improvement', 'supply chain', 'inventory management', 'budget management', 'KPI reporting', 'SAP', 'capacity planning', 'team leadership', 'continuous improvement', 'ISO standards', 'logistics', 'warehouse management', 'demand forecasting', 'cost reduction', 'operational efficiency', 'DMAIC'],
        exampleBullets: [
            'Managed £22M operational budget across 4 distribution centres (320 FTE, 1.8M units/month throughput); implemented Lean 5S programme reducing picking errors by 61% and increasing fulfilment capacity by 23% with zero capex.',
            'Led operational turnaround of underperforming manufacturing site (85 FTE, £8.4M turnover); reduced unit cost by 18%, improved OEE from 54% to 79%, and achieved ISO 9001:2015 certification within 14 months.',
            'Managed network redesign project consolidating 7 depots to 4 regional hubs; project delivered £2.1M annualised cost saving against £340K project cost, completed 3 weeks ahead of 9-month schedule.',
            'Built and implemented real-time operational dashboard (Power BI, SAP) used by 12 site managers; visibility improvement enabled proactive resource allocation reducing overtime cost by £180K/year.'
        ],
        faqs: [
            { q: 'What qualifications help an operations manager resume?', a: 'Lean Six Sigma certification (Green Belt or Black Belt), CIPS qualification (for procurement/supply chain), CILT (logistics), IOSH or NEBOSH (health and safety), and project management certification (PMP, PRINCE2) are all valued depending on your sector. Qualification combined with quantified operational improvement is the strongest resume combination.' },
            { q: 'How do I write an operations manager resume when changing industries?', a: 'Lead with transferable operational frameworks (Lean, Six Sigma, P&L management, continuous improvement) rather than sector-specific terminology. Quantify your operational achievements in universal metrics (cost reduction, efficiency improvement, error rate, throughput). Most operations principles transfer across sectors — make this explicit in your summary.' }
        ],
        relatedSlugs: ['project-manager-resume-example', 'hr-manager-resume-example', 'financial-analyst-resume-example']
    },
    {
        slug: 'business-analyst-resume-example',
        templateId: 'ats-chronograph',
        industry: 'Operations',
        title: 'Business Analyst Resume Example',
        name: 'ATS Chronograph',
        description: 'Free business analyst resume example 2025. Requirements gathering, process mapping, and stakeholder management keywords. ATS-optimised for IT and corporate BA roles.',
        sampleDataKey: 'business-analyst',
        atsScore: 97,
        whyItWorks: 'BA resumes must demonstrate analytical rigour (requirements quality, process improvement), stakeholder engagement at senior levels, and technical fluency with BA tooling. This timeline layout shows career progression clearly while surfacing the methodology keywords ATS systems filter on.',
        bestFor: 'Business analysts in technology, financial services, consulting, and corporate transformation applying to junior, senior, and lead BA roles.',
        howToWrite: {
            intro: 'Business analyst resumes must establish your BA methodology (waterfall, agile, BDD), your technical depth (data analysis, SQL, process modelling), and the complexity of your stakeholder landscape. Your summary should name your domain (IT systems, finance, operations, digital transformation), your certification (BCS, CBAP, ECBA) if applicable, and one project with a measurable business outcome.',
            experience: 'For each project or role, specify the project type (system implementation, process redesign, data migration, regulatory change), the number of requirements documented, your stakeholder spread (C-suite, end users, development teams), and the business benefit delivered. "Gathered requirements for CRM implementation" is insufficient. "Elicited and documented 340 functional and non-functional requirements for Salesforce CRM implementation across 4 business divisions (800 users); requirements approved at first governance review — no change requests raised during UAT" demonstrates rigour.',
            skills: 'BA methodology: requirements elicitation, use cases, user stories, process mapping (BPMN, swim lanes, value stream mapping), gap analysis, impact assessment. Tools: Jira, Confluence, Visio, Lucidchart, ARIS, MS Excel, SQL, Tableau. Frameworks: MoSCoW, SWOT, PESTLE, RACI, BCS Business Analysis framework, Agile/Scrum. Certifications: BCS Foundation, BCS Practitioner, CBAP, ECBA, PMI-PBA.',
            formatting: 'Two pages. Project scale (budget, user base, requirement count) in the opening of each entry. Methodology and tools prominently listed. Standard chronological format.'
        },
        keySkills: ['requirements elicitation', 'stakeholder management', 'process mapping', 'BPMN', 'user stories', 'Jira', 'Confluence', 'SQL', 'gap analysis', 'MoSCoW', 'UAT', 'agile', 'Visio', 'business case development', 'impact assessment', 'change management', 'BCS', 'CBAP', 'system analysis', 'data analysis'],
        exampleBullets: [
            'Elicited and documented 280 functional requirements for core banking system replacement (£4.2M programme, 2,400 users) using structured workshops, interviews, and JAD sessions; zero scope creep incidents during 18-month delivery.',
            'Led process redesign for mortgage origination workflow (14 sub-processes, 6 departments); future-state design reduced processing time from 23 days to 9 days, saving £640K annually in manual processing cost.',
            'Managed stakeholder engagement programme for GDPR remediation project across 8 business units (140+ stakeholders, C-suite to operational level); achieved 100% business sign-off within project timeline.',
            'Built Power BI reporting suite replacing 12 manual Excel reports (8 hours/week preparation time); suite used by 34 managers, saving 416 person-hours annually and enabling same-day operational decisions.'
        ],
        faqs: [
            { q: 'Is BCS certification worth getting for a business analyst resume?', a: 'Yes. BCS Foundation in Business Analysis is the entry-level standard for UK BA roles and is frequently listed as a requirement or strong preference. BCS Practitioner or CBAP are valuable differentiators for senior roles. Many employers sponsor study and exam fees — it is worth pursuing even if self-funded.' },
            { q: 'How do I differentiate my BA resume from generic project management resumes?', a: 'Emphasise analytical outputs: requirements documents, process maps, business cases, data models. Quantify requirements produced (not just "gathered requirements"), stakeholders managed, and business benefit from your analysis. BA value is in the quality of thinking before delivery — make that rigour visible on the page.' }
        ],
        relatedSlugs: ['project-manager-resume-example', 'operations-manager-resume-example', 'financial-analyst-resume-example']
    },

    // ── GENERAL ───────────────────────────────────────────────────────────────
    {
        slug: 'entry-level-resume-example',
        templateId: 'ats-classic',
        industry: 'General',
        title: 'Entry Level Resume Example',
        name: 'ATS Classic',
        description: 'Free entry level resume example 2025. No experience required. Skills-first ATS layout for graduates, career starters, and first-time job seekers. Download and customise in minutes.',
        sampleDataKey: 'entry-level',
        atsScore: 96,
        whyItWorks: 'Entry-level resumes succeed by leading with transferable skills and quantified evidence from non-traditional sources. This layout elevates your skills and education before work experience — the correct priority order when your experience is limited.',
        bestFor: 'Recent graduates, school leavers, career starters with fewer than two years of work experience, and those re-entering the workforce after a break.',
        howToWrite: {
            intro: 'Entry-level resumes face a specific challenge: demonstrating value without a conventional employment history. Your personal statement should focus on the skills you offer (not the job you want), the transferable experience you have from education, volunteering, internships, or personal projects, and your motivation for the specific role. Do not apologise for inexperience — frame what you have as the genuine foundation it is.',
            experience: 'If you have any paid work experience (part-time, temporary, seasonal), list it first. Then list internships, work placements, and volunteer roles on equal footing. For each entry, extract transferable skills and quantify even small accomplishments: number of customers served per day, funds raised, project team size, event attendance numbers. University projects with quantified outcomes (word count is not a metric; user testing participants, engagement rate, or grade received is) demonstrate research and delivery capability.',
            skills: 'Lead your skills section with technical skills relevant to the role you are targeting: software, platforms, programming languages, lab techniques, languages spoken. Soft skills should appear as evidence in your bullets, not as a self-assessed list. Most entry-level job descriptions include explicit skill requirements — match your skills section to these exact terms.',
            formatting: 'One page, no exceptions. Education first if you are a recent graduate. Include your degree classification and relevant modules where they demonstrate subject matter knowledge. A link to a portfolio, GitHub, or relevant online presence (where appropriate) can compensate for limited experience. Leave no unexplained gaps — account for every period with a brief note.'
        },
        keySkills: ['Microsoft Office', 'communication', 'teamwork', 'customer service', 'research', 'data analysis', 'problem solving', 'time management', 'adaptability', 'attention to detail', 'social media', 'content creation', 'project coordination', 'stakeholder management'],
        exampleBullets: [
            'Managed social media accounts for university charity partnership (Instagram, Twitter, Facebook — 3,400 followers combined); content strategy increased post engagement by 240% and raised £4,200 in one fundraising campaign.',
            'Led 6-person group research project for final-year dissertation (Grade: 1st, 82%); coordinated weekly meetings, assigned tasks, synthesised 34 academic sources into original analysis framework.',
            'Served 120–150 customers per day during peak retail season (Sainsbury\'s, December 2023); maintained customer satisfaction above 4.8/5.0 as measured by post-transaction survey.',
            'Built personal finance tracking app (Python, SQLite) as independent project; deployed to 3 family members and iterated on feature requests over 4 months, adding budgeting, export, and category visualisation.'
        ],
        faqs: [
            { q: 'How do I write a resume with no work experience?', a: 'Lead with a strong skills section, then list university projects, volunteering, internships, and any part-time or casual work. Quantify everything — even small numbers demonstrate initiative. A relevant personal project (app built, research conducted, event organised) can carry significant weight when employment history is limited.' },
            { q: 'Should a student include GPA on their resume?', a: 'In the US, include it if it is 3.5 or above. In the UK, include your predicted or achieved degree classification (First, 2:1) and note any relevant prizes or distinctions. Omit GPA or classification if it is below average — focus on other strengths instead.' },
            { q: 'How long should an entry-level resume be?', a: 'One page. Hiring managers for entry-level roles review high volumes of applications — a concise, well-structured one-page resume demonstrates professional awareness and editing ability. Never pad to fill space with irrelevant content.' }
        ],
        relatedSlugs: ['software-engineer-resume-example', 'marketing-manager-resume-example', 'account-executive-resume-example']
    },
    {
        slug: 'executive-resume-example',
        templateId: 'ats-executive-cv',
        industry: 'General',
        title: 'Executive Resume Example (CEO / VP / Director)',
        name: 'ATS Executive CV',
        description: 'Free executive resume example 2025. C-suite, VP, and director-level leadership keywords. Board-ready format with P&L, transformation, and governance experience.',
        sampleDataKey: 'executive',
        atsScore: 97,
        whyItWorks: 'Executive resumes operate in a different market to most professional resumes — they are often presented directly to board members or executive search firms without ATS filtering. This template is polished enough for direct presentation while remaining parseable for the organisations that do use ATS at C-suite level.',
        bestFor: 'CEOs, MDs, CFOs, COOs, CMOs, CTOs, VPs, and non-executive directors seeking board-level, C-suite, or senior leadership roles.',
        howToWrite: {
            intro: 'Executive resumes are leadership narratives, not task lists. Your summary should articulate your leadership identity: the type of organisation you lead best (scale-up, turnaround, corporate transformation, PE-backed), the functions you have owned, and your most significant organisational achievement. Avoid the biography trap — a strong executive summary is forward-looking and positions you for what you want to do next, not just what you have done.',
            experience: 'For each role, lead with organisational context (revenue, headcount, market position at time of appointment) and the mandate you were given. Then write three to five bullets covering: the most significant strategic decision you led, a measurable commercial or operational outcome, a change management or transformation you delivered, and any governance or board-level contribution. Avoid listing governance responsibilities as if they are achievements — focus on outcomes and decisions.',
            skills: 'Executive competencies: P&L ownership, board governance, M&A (identification, due diligence, integration), fundraising (PE, VC, IPO, debt), regulatory and government relations, international expansion, digital transformation, organisational design. Note sector credentials and any board membership, advisory roles, or NED positions.',
            formatting: 'Two to three pages at executive level. A strong executive biography (two to three paragraphs, third-person, polished) is often requested separately by search firms — prepare this alongside your resume. Avoid one-page formats — they signal a mismatch with the seniority of the role being sought.'
        },
        keySkills: ['P&L ownership', 'board governance', 'M&A', 'digital transformation', 'strategy development', 'organisational design', 'fundraising', 'stakeholder management', 'international operations', 'change management', 'executive leadership', 'NED', 'risk governance', 'investor relations', 'turnaround management', 'ESG'],
        exampleBullets: [
            'Led company from £8M to £34M revenue over 4 years through geographic expansion (3 new markets), product portfolio extension (6 new lines), and acquisition of 2 bolt-on businesses (total EV £12M); business sold at 7.2× EBITDA.',
            'Appointed to turnaround loss-making division (£42M revenue, -£3.1M EBITDA); restored to profitability within 18 months through portfolio rationalisation, headcount restructuring (18% reduction), and pricing model reform (+12% blended margin).',
            'Raised £24M Series B funding (led investor roadshow of 14 meetings, closed in 6 weeks) enabling 40 FTE headcount expansion and international market entry across 3 countries within 12 months.',
            'Chaired Audit and Risk Committee for FTSE 250 company (5 years); oversaw risk framework design post-COVID, led selection of Big 4 audit firm, and sponsored internal audit function expansion reducing material control weaknesses from 7 to 0.'
        ],
        faqs: [
            { q: 'Should an executive use a resume or a CV?', a: 'In the US, "resume" is standard regardless of seniority. In the UK, senior professionals typically use "CV" and executive CVs follow a longer format (2–3 pages) with a greater emphasis on narrative. Both should be tailored — executive search firms frequently ask for a specific format and length.' },
            { q: 'Do C-suite roles use ATS?', a: 'Less commonly, but not never. Executive search firms (headhunters) rarely use ATS — they work from direct referral networks and their own candidate management systems. However, direct applications to large corporates or public sector organisations at VP and Director level frequently pass through ATS. Maintaining an ATS-safe format does not compromise executive presentation.' }
        ],
        relatedSlugs: ['financial-analyst-resume-example', 'operations-manager-resume-example', 'hr-manager-resume-example']
    },
    {
        slug: 'career-change-resume-example',
        templateId: 'ats-modern',
        industry: 'General',
        title: 'Career Change Resume Example',
        name: 'ATS Modern',
        description: 'Free career change resume example 2025. Transferable skills, functional format, and pivot-ready keywords. ATS-optimised for professionals transitioning between industries or roles.',
        sampleDataKey: 'career-change',
        atsScore: 95,
        whyItWorks: 'Career change resumes work when they foreground transferable skills and reframe past experience in the language of the target role. This skills-forward layout is optimised for pivots — your most relevant capabilities appear at the top, not buried under an employment history that looks superficially unrelated.',
        bestFor: 'Professionals transitioning between industries, functions, or career levels who need to reframe past experience for a new target role.',
        howToWrite: {
            intro: 'Career change resumes solve a specific narrative problem: your employment history tells the wrong story at first glance. Your summary is the most critical section — it must explicitly bridge your past and target future, naming the transferable skills that make you a credible candidate despite a non-linear path. Address the career change directly and confidently rather than hoping the reader will make the connection themselves.',
            experience: 'For each past role, rewrite your bullets through the lens of your target career. A teacher moving into L&D should reframe lesson delivery as instructional design, classroom management as facilitation, and student assessment as learning evaluation. A financial analyst moving into product management should reframe modelling as data-driven decision-making and stakeholder reporting as cross-functional communication. The facts remain true — the framing changes.',
            skills: 'Lead with a skills section that explicitly maps your existing capabilities to the target role vocabulary. If moving into tech, list any coding you have done (even self-taught). If moving into marketing, list any content you have created, campaigns you have run, or analytics tools you have used. Any formal upskilling (bootcamp, online certification, evening class) should be prominently highlighted — it demonstrates commitment and closes the credibility gap.',
            formatting: 'A hybrid or skills-first format works better than pure reverse-chronological for career changers. Open with a strong summary, then a skills or achievements section, then employment history. One to two pages. Address the career change directly in your summary — trying to hide it makes it more conspicuous.'
        },
        keySkills: ['transferable skills', 'adaptability', 'stakeholder management', 'project coordination', 'analytical thinking', 'communication', 'problem solving', 'continuous learning', 'cross-functional collaboration', 'digital literacy'],
        exampleBullets: [
            'Designed and delivered 40-hour professional development curriculum for 120 mid-level managers (previously: high school teacher); course achieved 4.7/5.0 satisfaction rating and 89% knowledge-gain score on post-assessment.',
            'Built end-to-end automation for quarterly financial reporting process using Python and Excel VBA (self-taught during 6-month career transition programme); reduced manual preparation time from 3 days to 4 hours.',
            'Managed £2.4M community development grant portfolio across 14 partner organisations; transferred contract management, impact reporting, and stakeholder communication skills directly applicable to programme management.',
            'Completed Google Project Management Certificate and PMP examination during active job search; applied methodology immediately by leading 3-month office relocation project (12 stakeholders, £80K budget) in current role.'
        ],
        faqs: [
            { q: 'Should I use a functional or chronological resume for a career change?', a: 'A hybrid format works best: open with a strong skills summary that maps to the target role, then provide a standard reverse-chronological employment history. Pure functional resumes (no dates, skills-grouped) are distrusted by many ATS systems and hiring managers who suspect they are concealing employment gaps or tenure issues.' },
            { q: 'How do I explain a career change on a resume?', a: 'Address it directly and positively in your professional summary. "Eight years in financial services, now transitioning to product management — bringing deep analytical experience and cross-functional stakeholder skills to product development" is honest, confident, and immediately positions your value. Trying to obscure the change makes it more suspicious, not less.' },
            { q: 'Do I need to retrain before a career change?', a: 'Retraining signals commitment and closes credibility gaps — but it is not always required. Assess whether your target role requires specific technical skills you do not have (coding for tech, clinical skills for healthcare) versus transferable skills you already possess (communication, analysis, management). Targeted upskilling (bootcamp, certification, evening course) in parallel with job searching is often more effective than full retraining before applying.' }
        ],
        relatedSlugs: ['entry-level-resume-example', 'executive-resume-example', 'project-manager-resume-example']
    }
]

export const FILTER_CATEGORIES = [
    'All',
    'Technology',
    'Healthcare',
    'Finance',
    'Marketing',
    'Sales',
    'Education',
    'Creative',
    'Human Resources',
    'Operations',
    'General',
]

export function getTemplateBySlug(slug: string): SeoTemplate | undefined {
    return SEO_TEMPLATES.find(t => t.slug === slug)
}

// ─────────────────────────────────────────────────────────────────────────────
// Industry descriptions for the /resume-examples collection page.
// Shown above each industry grid to add substantive text content for SEO.
// ─────────────────────────────────────────────────────────────────────────────
export const INDUSTRY_DESCRIPTIONS: Record<string, { heading: string; body: string }> = {
    Technology: {
        heading: 'Technology Resume Examples',
        body: 'Technology roles are some of the most heavily keyword-screened in any industry. Every example below is built around the specific ATS terms, tool names, and seniority signals that engineering managers, technical recruiters, and automated screening systems look for in 2025. Use the framework for your role, swap in your own technologies and metrics, and download a PDF that clears the screening filter.',
    },
    Healthcare: {
        heading: 'Healthcare Resume Examples',
        body: 'Healthcare and clinical resumes must satisfy both ATS keyword matching and strict regulatory requirements — registration numbers, certification codes, and clinical terminology must appear in exactly the right format. Each example below follows the section order and vocabulary used by NHS Trac, NHS Jobs, and major private sector ATS platforms, with role-specific clinical skills and outcome metrics built in.',
    },
    Finance: {
        heading: 'Finance Resume Examples',
        body: 'Finance resumes are evaluated on qualification status, technical modelling skills, and deal or portfolio scale. Investment banks, Big 4 firms, and corporate finance teams use ATS to filter explicitly on qualification acronyms (ACA, ACCA, CFA, CPA) and financial software before a human reads the file. Each example below leads with the credentials and scale markers that finance recruiting teams prioritise.',
    },
    Marketing: {
        heading: 'Marketing Resume Examples',
        body: 'Marketing roles span a wide spectrum of specialisations — and each one is screened for different keywords. A demand generation manager needs pipeline and HubSpot experience on the first page; a content specialist needs organic traffic metrics and editorial tools. Each example below is built for a specific marketing sub-discipline with the channel-specific terminology and performance metrics that hiring managers scan for first.',
    },
    Sales: {
        heading: 'Sales Resume Examples',
        body: "Sales resumes live and die by numbers. Quota attainment percentage, ARR managed, deal size, and sales cycle length are the metrics every sales hiring manager checks before reading a single line. Each example below puts performance data front and centre and includes the CRM, methodology, and sales motion keywords that ATS systems and sales leaders search for when building pipeline-oriented teams.",
    },
    Education: {
        heading: 'Education Resume Examples',
        body: 'Teaching and academic CVs follow different conventions depending on sector and seniority — from QTS-focused school teacher CVs screened by Ofsted-aligned criteria to long-form academic CVs leading with publications and grant income. Each example below follows the format and vocabulary expected by school governing bodies, MATs, universities, and international education institutions.',
    },
    Creative: {
        heading: 'Creative Resume Examples',
        body: 'Creative resumes face a dual challenge: satisfying ATS keyword matching while signalling visual and conceptual sophistication. Multi-column, graphical, or heavily styled CVs frequently fail ATS parsing — losing the candidate before a human ever sees the work. Each example below is typographically considered but structurally ATS-safe, with portfolio links and tool-specific keywords built into the format.',
    },
    'Human Resources': {
        heading: 'Human Resources Resume Examples',
        body: 'HR resumes are screened for CIPD qualification level, employment law familiarity, HRIS platform experience, and the scale of workforce supported — in that priority order for most UK HR roles. Each example below uses the HR-specific vocabulary that ATS systems and HR directors filter on, with quantified metrics (headcount, time-to-fill, attrition rate) that most HR resumes omit.',
    },
    Operations: {
        heading: 'Operations Resume Examples',
        body: 'Operations roles are hired on measurable improvement: cost reduction, efficiency gain, throughput improvement, and process reliability. P&L scope and headcount managed establish seniority; Lean, Six Sigma, and methodology certifications establish credibility. Each example below is structured around operational scale and improvement metrics, with the methodology keywords that operations hiring managers screen for.',
    },
    General: {
        heading: 'General Resume Examples',
        body: 'Not every job search fits a single industry category. These general resume examples cover the most universal career situations — entry-level applicants building their first professional resume, executives presenting board-level credentials, and career changers reframing transferable skills for a new direction. Each example is built for the specific structural and narrative challenge of that situation.',
    },
}
