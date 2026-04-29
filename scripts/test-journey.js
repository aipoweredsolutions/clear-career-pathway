const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function runTest() {
    console.log('🚀 Starting Final E2E Journey Test...');
    const browser = await puppeteer.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const artifactsDir = path.join(process.cwd(), 'artifacts');
    if (!fs.existsSync(artifactsDir)) fs.mkdirSync(artifactsDir);

    try {
        console.log('🔗 Navigating to Login...');
        await page.goto('http://localhost:3001/auth/login', { waitUntil: 'domcontentloaded' });
        
        console.log('🖱️ Performing Test Login...');
        await page.evaluate(() => {
            const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('One-Click Test Login'));
            if (btn) btn.click();
        });
        
        console.log('⌛ Waiting for Dashboard...');
        await page.waitForFunction(() => window.location.pathname === '/dashboard', { timeout: 60000 });
        await page.screenshot({ path: 'artifacts/test_dashboard_final.png' });
        console.log('✅ Dashboard Reached.');

        console.log('🔗 Navigating to Editor (Heavy Page)...');
        // Use domcontentloaded for heavy pages to avoid timeout on static assets
        await page.goto('http://localhost:3001/editor/new?template=ats-classic', { 
            waitUntil: 'domcontentloaded',
            timeout: 180000 
        });
        
        console.log('⌛ Waiting for Editor UI elements...');
        await page.waitForFunction(() => {
            return document.body.textContent.includes('Download PDF') || document.body.textContent.includes('Templates');
        }, { timeout: 120000 });
        
        await page.screenshot({ path: 'artifacts/test_editor_final.png' });
        console.log('✅ Editor Reached.');

        console.log('🖱️ Clicking Download...');
        await page.evaluate(() => {
            const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Download PDF'));
            if (btn) btn.click();
        });
        
        await page.waitForTimeout(5000);
        await page.screenshot({ path: 'artifacts/test_download_final.png' });
        console.log('✨ Test Completed!');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        await page.screenshot({ path: 'artifacts/test_error_final.png' });
    } finally {
        await browser.close();
    }
}

runTest();
