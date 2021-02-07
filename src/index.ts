const fs = require('fs');
const path = require('path');

export function dirText(
  base: string = './',
  target: string = './dirtext.text',
  ignores: Array<string> = ['node_modules','.git']
): void {
  let basePath = path.resolve(base);
  let output = {};
  readDir(basePath, output, ignores); //
  let targetPath = path.resolve(target);
  generateText(output, targetPath, basePath);
}

function readDir(targetPath: string, output: any, blackList?: Array<string>) {
  let arr = fs.readdirSync(targetPath);
  arr.forEach((item: string) => {
    const curPath = path.resolve(targetPath, item);
    let isDirectory = fs.statSync(curPath).isDirectory();
    if (isDirectory) {
      if (!isIgnore(item, blackList)) {
        output[item] = {};
        readDir(curPath, output[item]);
      }
    } else {
      output[item] = item;
    }
  });
}

function isIgnore(item: string, blackList?: Array<string>): boolean {
  return (Array.isArray(blackList) && blackList.includes(item));
}

function generateText(data: any, targetPath: string, basePath: string): void {
  let str = basePath + '\n';
  str += dir(data, 1);
  fs.writeFileSync(targetPath, str);
}

function row(level: number, last: boolean, name: string): string {
  return '│   '.repeat(level - 1) + (last ? '└── ' : '├── ') + name + '\n';
}
function dir(data: any, level: number): string {
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
