
import React from 'react';
import { renderToFile } from '@react-pdf/renderer';
import { ResumePDF } from '../lib/pdf/ResumePDF';
import { MOCK_PREVIEW_DATA } from '../lib/constants/mock-data';
import { templateRegistry } from '../lib/templates/registry';
import fs from 'fs';
import path from 'path';

async function testPdfGeneration() {
    const outputDir = path.join(process.cwd(), 'temp', 'pdf_test');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log('🚀 Starting PDF Generation Tests...');

    let successCount = 0;
    let failCount = 0;

    console.log('Available templates:', templateRegistry.map(t => t.id).join(', '));
    for (const template of templateRegistry) {
        const templateId = template.id;
        console.log(`\nTesting template: ${templateId}`);

        try {
            const data = {
                ...MOCK_PREVIEW_DATA,
                templateId: templateId
            };

            const outputPath = path.join(outputDir, `${templateId}.pdf`);

            // We use renderToFile from @react-pdf/renderer
            await renderToFile(<ResumePDF data={data} />, outputPath);

            console.log(`✅ Success: ${templateId}`);
            successCount++;
        } catch (error: any) {
            console.error(`❌ FAILED: ${templateId}`);
            console.error(error);
            failCount++;
        }
    }

    console.log('\n==========================================');
    console.log(`Summary: ${successCount} passed, ${failCount} failed.`);
    console.log('==========================================');
}

testPdfGeneration();
