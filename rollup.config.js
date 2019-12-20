import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.module,
            format: 'es',
            sourcemap: false,
            globals: {
                lodash: '_'
            }
        },
        {
            file: pkg.main,
            format: 'umd',
            name: pkg.name,
            sourcemap: false,
            globals: {
                lodash: '_'
            }
        }
    ],
    plugins: [
        resolve({
            jsnext: true,
            preferBuiltins: true
        }),
        typescript({
            declaration: true
        }),
        commonjs({
            extensions: ['.js', '.ts', '.json'],
            namedExports: []
        }),
        terser()
    ],
    external: ['']
};
