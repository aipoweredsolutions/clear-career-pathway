/**
 * Puppeteer Screenshot Generator
 * 
 * This script uses Puppeteer to capture screenshots of template HTML files
 * and save them as preview images.
 */

const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

async function generateScreenshots() {
    console.log('📸 Starting screenshot generation with Puppeteer...\n')

    const htmlDir = path.join(process.cwd(), 'temp', 'preview-html')
    const outputDir = path.join(process.cwd(), 'public', 'templates')

    // Check if HTML directory exists
    if (!fs.existsSync(htmlDir)) {
        console.error('❌ HTML directory not found. Please run: npm run generate-previews first')
        process.exit(1)
    }

    // Create output directory
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }

    // Get all HTML files
    const htmlFiles = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'))

    if (htmlFiles.length === 0) {
        console.error('❌ No HTML files found. Please run: npm run generate-previews first')
        process.exit(1)
    }

    console.log(`Found ${htmlFiles.length} HTML files to process\n`)

    // Launch browser
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    let successCount = 0
    let failCount = 0

    for (const htmlFile of htmlFiles) {
        try {
            const htmlPath = path.join(htmlDir, htmlFile)
            const templateName = htmlFile.replace('.html', '')
            const outputPath = path.join(outputDir, `${templateName}-preview.png`)

            console.log(`Processing: ${templateName}`)

            const page = await browser.newPage()

            // Set viewport to A4 size at 96 DPI
            await page.setViewport({
                width: 794,  // 210mm at 96 DPI
                height: 1123, // 297mm at 96 DPI
                deviceScaleFactor: 2 // Higher quality
            })

            // Load HTML file
            const htmlContent = fs.readFileSync(htmlPath, 'utf-8')
            await page.setContent(htmlContent, {
                waitUntil: 'networkidle0'
            })

            // Wait for fonts to load
            await page.evaluateHandle('document.fonts.ready')

            // Take screenshot
            await page.screenshot({
                path: outputPath,
                fullPage: false,
                type: 'png'
            })

            await page.close()

            console.log(`  ✓ Saved: ${templateName}-preview.png`)
            successCount++

        } catch (error) {
            console.error(`  ✗ Error processing ${htmlFile}:`, error.message)
            failCount++
        }
    }

    await browser.close()

    console.log('\n' + '='.repeat(70))
    console.log(`✓ Successfully generated: ${successCount}/${htmlFiles.length} screenshots`)
    if (failCount > 0) {
        console.log(`✗ Failed: ${failCount}`)
    }
    console.log('='.repeat(70))
    console.log(`\n📁 Preview images saved to: ${outputDir}`)
    console.log('\n✨ Done! Your template previews are ready.')
}

generateScreenshots().catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
})
