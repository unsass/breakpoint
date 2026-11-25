// ============================================================================================= //
//                                            VITEST                                             //
// ============================================================================================= //

import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        name: {
            label: 'sass',
            color: 'green'
        },
        globals: true,
        watch: false,
        reporters: [
            [
                'default', {
                    summary: false
                }
            ],
            [
                'junit', {
                    suiteName: 'Tests',
                    outputFile: './junit.xml'
                }
            ]
        ]
    }
});
