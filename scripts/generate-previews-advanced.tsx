/**
 * Advanced Template Preview Generator
 * 
 * This script generates accurate preview images for all resume templates
 * by rendering actual React components and capturing screenshots.
 */

import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { templateRegistry } from '../lib/templates/registry'
import { MOCK_PREVIEW_DATA } from '../lib/constants/mock-data'
import fs from 'fs'
import path from 'path'

// Import all templates
import { ClassicTemplate } from '../components/templates/ClassicTemplate'
import { ModernTemplate } from '../components/templates/ModernTemplate'
import { MinimalTemplate } from '../components/templates/MinimalTemplate'
import { ProfessionalTemplate } from '../components/templates/ProfessionalTemplate'
import { CreativeTemplate } from '../components/templates/CreativeTemplate'
import { ExecutiveTemplate } from '../components/templates/ExecutiveTemplate'
import { TechTemplate } from '../components/templates/TechTemplate'
import { StartupTemplate } from '../components/templates/StartupTemplate'
import { ATSClassicTemplate } from '../components/templates/ATSClassicTemplate'
import { ATSProfessionalTemplate } from '../components/templates/ATSProfessionalTemplate'
import { ATSStandardTemplate } from '../components/templates/ATSStandardTemplate'
import { ATSTechnicalTemplate } from '../components/templates/ATSTechnicalTemplate'

// Template component mapping
const templateComponents: Record<string, any> = {
    'classic': ClassicTemplate,
    'modern': ModernTemplate,
    'minimal': MinimalTemplate,
    'professional': ProfessionalTemplate,
    'creative': CreativeTemplate,
    'executive': ExecutiveTemplate,
    'tech': TechTemplate,
    'startup': StartupTemplate,
    'ats-classic': ATSClassicTemplate,
    'ats-professional': ATSProfessionalTemplate,
    'ats-standard': ATSStandardTemplate,
    'ats-technical': ATSTechnicalTemplate,
}

// Get accent color for template
function getAccentColor(templateId: string, colorId: string = 'standard'): string {
    const template = templateRegistry.find(t => t.id === templateId)
    const color = template?.colors?.find(c => c.id === colorId)

    if (color?.className) {
        return color.className
    }

    // Default colors based on template type
    const defaultColors: Record<string, string> = {
        'classic': 'text-blue-800',
        'modern': 'text-purple-600',
        'minimal': 'text-neutral-900',
        'professional': 'text-blue-900',
        'creative': 'text-pink-600',
        'executive': 'text-neutral-900',
        'tech': 'text-cyan-600',
        'startup': 'text-orange-600',
        'ats-classic': 'text-blue-800',
        'ats-professional': 'text-neutral-900',
        'ats-standard': 'text-neutral-900',
        'ats-technical': 'text-neutral-900',
    }

    return defaultColors[templateId] || 'text-blue-800'
}

// Generate HTML for template
function generateTemplateHTML(templateId: string, colorId: string = 'standard'): string {
    const TemplateComponent = templateComponents[templateId]

    if (!TemplateComponent) {
        console.warn(`Template component not found for: ${templateId}`)
        return ''
    }

    const accentColor = getAccentColor(templateId, colorId)

    try {
        const markup = renderToStaticMarkup(
            <TemplateComponent
                data={MOCK_PREVIEW_DATA}
                accentColor={accentColor}
                className="w-full h-full"
            />
        )

        return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${templateId} Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: white;
    }
    
    .resume-container {
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      background: white;
      box-sizing: border-box;
    }
    
    /* Ensure proper rendering */
    * {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  </style>
</head>
<body>
  <div class="resume-container">
    ${markup}
  </div>
</body>
</html>
    `
    } catch (error) {
        console.error(`Error rendering template ${templateId}:`, error)
        return ''
    }
}

async function generatePreviews() {
    console.log('🎨 Starting advanced template preview generation...\n')

    const outputDir = path.join(process.cwd(), 'public', 'templates')
    const htmlDir = path.join(process.cwd(), 'temp', 'preview-html')

    // Create directories
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }
    if (!fs.existsSync(htmlDir)) {
        fs.mkdirSync(htmlDir, { recursive: true })
    }

    console.log(`✓ Output directory: ${outputDir}`)
    console.log(`✓ HTML directory: ${htmlDir}\n`)

    let successCount = 0
    let failCount = 0

    for (const template of templateRegistry) {
        try {
            console.log(`Processing: ${template.name} (${template.id})`)

            // Generate HTML for each color variant
            const colors = template.colors || [{ id: 'standard', name: 'Standard' }]

            for (const color of colors) {
                const html = generateTemplateHTML(template.id, color.id)

                if (html) {
                    const htmlFilename = `${template.id}-${color.id}.html`
                    const htmlPath = path.join(htmlDir, htmlFilename)

                    fs.writeFileSync(htmlPath, html, 'utf-8')
                    console.log(`  ✓ Generated HTML: ${htmlFilename}`)
                }
            }

            successCount++

        } catch (error) {
            console.error(`  ✗ Error processing ${template.name}:`, error)
            failCount++
        }
    }

    console.log('\n' + '='.repeat(70))
    console.log(`✓ Successfully processed: ${successCount}/${templateRegistry.length}`)
    if (failCount > 0) {
        console.log(`✗ Failed: ${failCount}`)
    }
    console.log('='.repeat(70))

    console.log('\n📝 Next Steps:')
    console.log('1. Install puppeteer: npm install puppeteer')
    console.log('2. Run the puppeteer screenshot script')
    console.log('3. HTML files are in: temp/preview-html/')
    console.log('4. You can open these in a browser to verify they look correct')
    console.log('\nAlternatively, use the simple screenshot script:')
    console.log('  npm run generate-screenshots')
}

generatePreviews().catch(console.error)
