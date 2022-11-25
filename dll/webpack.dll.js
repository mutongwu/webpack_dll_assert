// 文件目录：configs/webpack.dll.js
// 代码太长可以不看

'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        vendor: ['lodash'],
    },
    // 这个是输出 dll 文件
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'dll_[name].js',
        library: 'dll_[name]',
    },
    // 这个是输出映射表
    plugins: [
        new webpack.DllPlugin({ 
            // context: '.', // 默认是webpack当前上下文
            format: true,
            name: 'dll_[name]', // name === output.library
            path: path.resolve(__dirname, './dist/[name].manifest.json'),
        })
    ]
};
