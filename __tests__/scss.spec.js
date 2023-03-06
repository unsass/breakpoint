// ============================================================================================= //
//                                             TESTS                                             //
// ============================================================================================= //

const path = require('path');
const sassTrue = require('sass-true');
const glob = require('glob');

const sassTestFiles = glob.sync(path.resolve(process.cwd(), './**/*.spec.scss'), {
    ignore: [
        '**/node_modules/**'
    ]
});

sassTestFiles.forEach((file) => {
    sassTrue.runSass(
        {
            describe,
            it
        }, file,
        {
            loadPaths: [
                'node_modules'
            ]
        }
    );
});
