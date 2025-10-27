// Copyright Epic Games, Inc. All Rights Reserved.

const { merge } = require('webpack-merge');
const common = require('./webpack.base.js');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
      usedExports: true,
      minimize: true,
      minimizer: [new TerserPlugin({
        extractComments: false,
      })],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: 'src/assets',
                    to: 'assets',
                }
            ]
        })
    ],
    stats: 'errors-only',
    performance: {
        hints: false
    }
});