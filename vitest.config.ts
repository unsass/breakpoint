// ============================================================================================= //
//                                            VITEST                                             //
// ============================================================================================= //

import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
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
                    outputFile: './junit.xml'
                }
            ]
        ]
    }
});
