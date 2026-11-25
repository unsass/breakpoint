// ============================================================================================= //
//                                            ERRORS                                             //
// ============================================================================================= //

import { compileString } from 'sass';

const compile = (scss) => compileString(`@use "index" as breakpoint;\n${scss}`, {
    loadPaths: [
        process.cwd()
    ]
});

describe('errors', () => {
    describe.each([
        'up',
        'down',
        'only'
    ])('%s()', (mixin) => {
        it('Should throw on an unknown token.', () => {
            expect(() => compile(`.test { @include breakpoint.${mixin}("nope") { color: darkcyan; } }`))
                .toThrow('Invalid token, `nope` doesn\'t exist.');
        });
    });

    describe('between()', () => {
        it('Should throw on an unknown min token.', () => {
            expect(() => compile('.test { @include breakpoint.between("nope", "xl") { color: darkcyan; } }'))
                .toThrow('Invalid token, `nope` doesn\'t exist.');
        });

        it('Should throw on an unknown max token.', () => {
            expect(() => compile('.test { @include breakpoint.between("md", "nope") { color: darkcyan; } }'))
                .toThrow('Invalid token, `nope` doesn\'t exist.');
        });

        it('Should throw when min is larger than max.', () => {
            expect(() => compile('.test { @include breakpoint.between("xl", "md") { color: darkcyan; } }'))
                .toThrow('Invalid range, `xl` must be smaller than `md`.');
        });

        it('Should throw when min equals max.', () => {
            expect(() => compile('.test { @include breakpoint.between("md", "md") { color: darkcyan; } }'))
                .toThrow('Invalid range, `md` must be smaller than `md`.');
        });
    });
});
