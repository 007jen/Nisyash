import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
    'd:\\Project\\Nishyash\\nisyash Desktop report.json',
    'd:\\Project\\Nishyash\\Nisyahs Mobilereport.json'
];

files.forEach(filePath => {
    try {
        if (fs.existsSync(filePath)) {
            const rawData = fs.readFileSync(filePath, 'utf8');
            const report = JSON.parse(rawData);

            console.log(`\n--- Analysis for ${path.basename(filePath)} ---`);

            // Categories Scores
            const categories = report.categories;
            console.log('Categories:');
            if (categories) {
                Object.values(categories).forEach(cat => {
                    console.log(`  ${cat.title}: ${(cat.score * 100).toFixed(0)}`);
                });
            }

            // Key Metrics
            const audits = report.audits;
            console.log('Key Metrics:');
            const metrics = [
                'first-contentful-paint',
                'largest-contentful-paint',
                'total-blocking-time',
                'cumulative-layout-shift',
                'speed-index',
                'interactive'
            ];

            metrics.forEach(id => {
                const audit = audits[id];
                if (audit) {
                    console.log(`  ${audit.title} (${id}): ${audit.displayValue} (Score: ${audit.score})`);
                }
            });

            // Failed Audits (Score < 0.9 and not manual/informative)
            console.log('Significant Failed Audits:');
            Object.values(audits).forEach(audit => {
                if (audit.score !== null && audit.score < 0.9 && audit.scoreDisplayMode !== 'manual' && audit.scoreDisplayMode !== 'notApplicable' && audit.scoreDisplayMode !== 'informative') {
                    console.log(`  [${audit.score}] ${audit.title}`);
                }
            });

        } else {
            console.log(`File not found: ${filePath}`);
        }
    } catch (err) {
        console.error(`Error processing ${filePath}:`, err.message);
    }
});
