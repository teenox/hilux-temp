// Copyright Epic Games, Inc. All Rights Reserved.

import tseslint from 'typescript-eslint';
import tsdocPlugin from 'eslint-plugin-tsdoc';
import baseConfig from '../eslint.config.mjs'

export default tseslint.config(
    baseConfig,
    {
        ignores: [],
    },
    {
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: 'tsconfig.cjs.json',
            },
        },
        files: ["src/**/*.ts"],
        plugins: {
            'tsdoc': tsdocPlugin,
        },
        rules: {
            "tsdoc/syntax": "warn",
            "@typescript-eslint/require-array-sort-compare": "error",
            "no-unused-vars": "off",
            "@typescript-eslint/no-misused-promises": "off", // http.createServer(app) is throwing this
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    "argsIgnorePattern": "^_",
                    "varsIgnorePattern": "^_",
                    "caughtErrorsIgnorePattern": "^_"
                }
            ]
        }
    }
);
