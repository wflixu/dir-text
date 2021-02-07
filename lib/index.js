"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dirText = void 0;
const fs = require('fs');
const path = require('path');
function dirText(base = './', target = './dirtext.text', ignores = ['node_modules', '.git']) {
    let basePath = path.resolve(base);
    let output = {};
    readDir(basePath, output, ignores); //
    let targetPath = path.resolve(target);
    generateText(output, targetPath, basePath);
}
exports.dirText = dirText;
function readDir(targetPath, output, blackList) {
    let arr = fs.readdirSync(targetPath);
    arr.forEach((item) => {
        const curPath = path.resolve(targetPath, item);
        let isDirectory = fs.statSync(curPath).isDirectory();
        if (isDirectory) {
            if (!isIgnore(item, blackList)) {
                output[item] = {};
                readDir(curPath, output[item]);
            }
        }
        else {
            output[item] = item;
        }
    });
}
function isIgnore(item, blackList) {
    return (Array.isArray(blackList) && blackList.includes(item));
}
function generateText(data, targetPath, basePath) {
    let str = basePath + '\n';
    str += dir(data, 1);
    fs.writeFileSync(targetPath, str);
}
function row(level, last, name) {
    return '│   '.repeat(level - 1) + (last ? '└── ' : '├── ') + name + '\n';
}
function dir(data, level) {
    let str = '';
    Object.keys(data).forEach((item, index, arr) => {
        let isLast = index === arr.length - 1;
        str = str + row(level, isLast, item);
        if (typeof data[item] !== 'string') {
            str += dir(data[item], level + 1);
        }
    });
    return str;
}
