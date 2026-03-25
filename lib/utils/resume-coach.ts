import { ResumeDocument } from '@/lib/types/resume'

export interface CoachSuggestion {
    id: string
    type: 'warning' | 'error' | 'success' | 'tip'
    title: string
    message: string
    category: 'impact' | 'clarity' | 'structure' | 'keywords'
    section: string
    originalText?: string
    suggestedText?: string
    fieldPath: string // e.g. 'workExperience.0.achievements.1.achievementText'
}

const WEAK_VERBS = {
    'responsible for': 'Led',
    'duties included': 'Executed',
    'helped with': 'Collaborated on',
    'worked on': 'Developed',
    'assisted in': 'Partnered to',
    'handled': 'Managed',
    'participated in': 'Contributed to',
    'was in charge of': 'Spearheaded'
}

const PASSIVE_VOICE_REGEX = /\b(am|is|are|was|were|be|been|being)\s+([a-z]+ed)\b/i
const METRIC_REGEX = /\d+%|\d+\s?%|\$\d+|\d+\s?k|\d+\s?million|\d+\s?users/i

export function analyzeWithCoach(data: ResumeDocument): CoachSuggestion[] {
    const suggestions: CoachSuggestion[] = []

    // 1. Professional Summary Check
    const summary = data.professionalSummary?.summaryText || ''
    if (summary.length > 0) {
        if (summary.length < 100) {
            suggestions.push({
                id: 'sum-short',
                type: 'warning',
                title: 'Short Summary',
                message: 'Your summary is a bit brief. Aim for 3-4 sentences highlighting your biggest wins.',
                category: 'clarity',
                section: 'Summary',
                fieldPath: 'professionalSummary.summaryText'
            })
        }
        if (summary.length > 600) {
            suggestions.push({
                id: 'sum-long',
                type: 'warning',
                title: 'Dense Summary',
                message: 'Long paragraphs are hard to scan. Try to keep your summary under 500 characters.',
                category: 'clarity',
                section: 'Summary',
                fieldPath: 'professionalSummary.summaryText'
            })
        }
    }

    // 2. Work Experience Analysis
    data.workExperience?.forEach((exp, expIdx) => {
        exp.achievements?.forEach((ach, achIdx) => {
            const text = ach.achievementText
            const fieldPath = `workExperience.${expIdx}.achievements.${achIdx}.achievementText`

            // Detect Weak Verbs
            for (const [weak, strong] of Object.entries(WEAK_VERBS)) {
                if (text.toLowerCase().includes(weak)) {
                    suggestions.push({
                        id: `weak-verb-${expIdx}-${achIdx}`,
                        type: 'warning',
                        title: 'Weak Action Verb',
                        message: `Swap "${weak}" with a high-impact verb like "${strong}".`,
                        category: 'impact',
                        section: 'Experience',
                        originalText: weak,
                        suggestedText: strong,
                        fieldPath
                    })
                }
            }

            // Detect Passive Voice
            if (PASSIVE_VOICE_REGEX.test(text)) {
                suggestions.push({
                    id: `passive-${expIdx}-${achIdx}`,
                    type: 'warning',
                    title: 'Passive Language',
                    message: 'Use active voice to show direct ownership of results.',
                    category: 'clarity',
                    section: 'Experience',
                    fieldPath
                })
            }

            // Detect Missing Metrics
            if (!METRIC_REGEX.test(text) && text.length > 20) {
                suggestions.push({
                    id: `no-metric-${expIdx}-${achIdx}`,
                    type: 'tip',
                    title: 'Missing Metrics',
                    message: 'Quantify this win. (e.g., "Increased X by 20%" or "Saved $10k").',
                    category: 'impact',
                    section: 'Experience',
                    fieldPath
                })
            }

            // Detect Long Bullets
            if (text.length > 200) {
                suggestions.push({
                    id: `long-bullet-${expIdx}-${achIdx}`,
                    type: 'warning',
                    title: 'Wordy Bullet Point',
                    message: 'Recruiters spend 6 seconds per resume. Keep bullets under 2 lines.',
                    category: 'clarity',
                    section: 'Experience',
                    fieldPath
                })
            }
        })
    })

    // 3. Skills Check
    if (data.skills && data.skills.length > 0 && data.skills.length < 8) {
        suggestions.push({
            id: 'low-skills',
            type: 'warning',
            title: 'Low Skill Count',
            message: 'Add more industry keywords to pass ATS filters. Aim for 10-15 skills.',
            category: 'keywords',
            section: 'Skills',
            fieldPath: 'skills'
        })
    }

    return suggestions
}
