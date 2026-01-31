/**
 * Simple Template Preview Generator
 * 
 * This creates a standalone HTML page that renders all templates
 * which you can then screenshot manually or with a browser automation tool.
 */

import { templateRegistry } from '../lib/templates/registry'
import fs from 'fs'
import path from 'path'

function generatePreviewPage() {
    console.log('🎨 Generating template preview page...\n')

    const outputPath = path.join(process.cwd(), 'public', 'template-previews.html')

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Template Previews - Clear Career Path</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
    
    body {
      margin: 0;
      padding: 40px;
      font-family: 'Inter', sans-serif;
      background: #f5f5f5;
    }
    
    .template-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 40px;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .template-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .template-preview {
      width: 100%;
      aspect-ratio: 210/297;
      background: white;
      border: 1px solid #e5e7eb;
      overflow: hidden;
      position: relative;
    }
    
    .template-info {
      padding: 20px;
    }
    
    .template-name {
      font-size: 18px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 8px;
    }
    
    .template-id {
      font-size: 12px;
      color: #6b7280;
      font-family: monospace;
      background: #f3f4f6;
      padding: 4px 8px;
      border-radius: 4px;
      display: inline-block;
    }
    
    .template-description {
      font-size: 14px;
      color: #4b5563;
      margin-top: 12px;
      line-height: 1.5;
    }
    
    .template-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }
    
    .tag {
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .tag-ats {
      background: #dcfce7;
      color: #166534;
    }
    
    .tag-creative {
      background: #fce7f3;
      color: #9f1239;
    }
    
    .tag-corporate {
      background: #dbeafe;
      color: #1e40af;
    }
    
    .tag-premium {
      background: #fef3c7;
      color: #92400e;
    }
    
    h1 {
      text-align: center;
      font-size: 36px;
      font-weight: 800;
      color: #111827;
      margin-bottom: 16px;
    }
    
    .subtitle {
      text-align: center;
      font-size: 18px;
      color: #6b7280;
      margin-bottom: 60px;
    }
    
    .instructions {
      background: #eff6ff;
      border: 2px solid #3b82f6;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 40px;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .instructions h2 {
      color: #1e40af;
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 12px;
    }
    
    .instructions ol {
      margin-left: 20px;
      color: #1e3a8a;
    }
    
    .instructions li {
      margin-bottom: 8px;
    }
    
    .placeholder-preview {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      text-align: center;
    }
    
    .placeholder-preview h3 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 12px;
    }
    
    .placeholder-preview p {
      font-size: 14px;
      opacity: 0.9;
    }
  </style>
</head>
<body>
  <h1>📄 Template Preview Gallery</h1>
  <p class="subtitle">All ${templateRegistry.length} Resume Templates</p>
  
  <div class="instructions">
    <h2>📸 How to Generate Preview Images</h2>
    <ol>
      <li>Open this page in your browser</li>
      <li>Use browser DevTools to screenshot each template preview area (right-click → "Capture node screenshot")</li>
      <li>Or use a browser extension like "Full Page Screen Capture"</li>
      <li>Save images as: <code>public/templates/{template-id}-preview.png</code></li>
      <li>Alternatively, integrate actual template components here and use Puppeteer</li>
    </ol>
  </div>
  
  <div class="template-grid">
    ${templateRegistry.map(template => `
      <div class="template-card" id="${template.id}">
        <div class="template-preview">
          <div class="placeholder-preview">
            <h3>${template.name}</h3>
            <p>${template.description}</p>
            <div style="margin-top: 20px; font-size: 12px; opacity: 0.8;">
              ${template.id}
            </div>
          </div>
        </div>
        <div class="template-info">
          <div class="template-name">${template.name}</div>
          <div class="template-id">${template.id}</div>
          <div class="template-description">${template.description}</div>
          <div class="template-tags">
            ${template.id.startsWith('ats-') ? '<span class="tag tag-ats">ATS Optimized</span>' : ''}
            ${template.suitableFor.jobTypes.includes('creative') ? '<span class="tag tag-creative">Creative</span>' : ''}
            ${template.suitableFor.jobTypes.includes('corporate') ? '<span class="tag tag-corporate">Corporate</span>' : ''}
            ${template.isPremium ? '<span class="tag tag-premium">Premium</span>' : ''}
          </div>
        </div>
      </div>
    `).join('\n')}
  </div>
  
  <script>
    console.log('Template Preview Page Loaded');
    console.log('Total templates:', ${templateRegistry.length});
    
    // You can add JavaScript here to dynamically load actual template components
    // if you set up a proper React rendering system
  </script>
</body>
</html>
  `

    fs.writeFileSync(outputPath, html, 'utf-8')

    console.log(`✓ Preview page generated: ${outputPath}`)
    console.log('\n📝 Next steps:')
    console.log('1. Open http://localhost:3000/template-previews.html in your browser')
    console.log('2. Screenshot each template preview')
    console.log('3. Save to public/templates/{template-id}-preview.png')
    console.log('\nOr use the Puppeteer script for automation.')
}

generatePreviewPage()
