import fs from 'fs';

const filePath = 'd:\\Project\\Nishyash\\Nisyahs Mobilereport.json';

try {
    if (fs.existsSync(filePath)) {
        const rawData = fs.readFileSync(filePath, 'utf8');
        const report = JSON.parse(rawData);

        console.log(`\n--- Analysis for Mobile Report ---`);

        // Categories Scores
        const categories = report.categories;
        console.log('Categories:');
        if (categories) {
            Object.values(categories).forEach(cat => {
                console.log(`  ${cat.title}: ${(cat.score * 100).toFixed(0)}`);
            });
        } else {
            console.log('No categories found in report.');
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

    } else {
        console.log(`File not found: ${filePath}`);
    }
} catch (err) {
    console.error(`Error processing mobile report:`, err);
}
