// ============================================================================================= //
//                                             TESTS                                             //
// ============================================================================================= //

import { globSync } from 'node:fs';
import sassTrue from 'sass-true';

const sassTestFiles = globSync('**/*.spec.scss', {
    exclude: [
        'node_modules'
    ]
});

sassTestFiles.forEach((file) => {
    sassTrue.runSass({
        describe,
        it
    }, file);
});
