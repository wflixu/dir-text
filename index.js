const fs = require('fs');
const path = require('path');


module.exports = function (target, ignores) {
    let base = target || './';
    let basePath = path.resolve(base);
    let output = {};
    readDir(basePath, output,ignores); //
    let targetPath = path.resolve('./dirText.text');
    generateText(output, targetPath);

}

function readDir(targetPath, output,blackList) {
   
    let arr = fs.readdirSync(targetPath);
    arr.forEach(item => {
        const curPath = path.resolve(targetPath, item);
        let isDirectory = fs.statSync(curPath).isDirectory();
        if (isDirectory) {
            if (isIgnore(blackList, item)) {
                // do nothing
            } else {
                output[item] = {};
                readDir(curPath, output[item]);
            }

        } else {
            output[item] = item;
        }
    })
}

function isIgnore(blackList, item) {
    return ((/^\.\w+/ig).test(item) || (Array.isArray(blackList) && blackList.includes(item)));
}

function generateText(data, targetPath) {
    //   let str = JSON.stringify(data,null,2);
    let str = '';
    str += dir(data, 1)
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
    })

    return str;
}



