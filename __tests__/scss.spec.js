// ============================================================================================= //
//                                             TESTS                                             //
// ============================================================================================= //

import fs from 'fs';
import path from 'path';
import sassTrue from 'sass-true';

function getScssTestFiles(dir) {
    const results = [];
    const entries = fs.readdirSync(dir, {
        withFileTypes: true
    });

    entries.forEach(entry => {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory() && entry.name !== 'node_modules') {
            results.push(...getScssTestFiles(fullPath));
        }

        if (entry.isFile() && entry.name.endsWith('.spec.scss')) {
            results.push(fullPath);
        }
    });

    return results;
}

const sassTestFiles = getScssTestFiles(process.cwd());

sassTestFiles.forEach((file) => {
    sassTrue.runSass({
        describe,
        it
    }, file, {
        loadPaths: [
            'node_modules'
        ]
    });
});
