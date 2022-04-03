import path from 'path'

const curPath = 'node/practice/fs/path.js'

console.log(path.dirname(curPath))
console.log(path.basename(curPath))
console.log(path.basename(curPath, path.extname(curPath)))
console.log(path.extname(curPath))
/**
 * node/practice/fs
 * path.js
 * path
 * .js
 */

const curParentDir = 'fs'
console.log(path.join('node/practice', curParentDir, 'path.js'))
/**
 * node/practice/fs/path.js
 */

console.log(path.resolve(curPath))
console.log(path.resolve('test', curPath))
console.log(path.resolve('/test', curPath))
/**
 * 显而易见这种重复该是用错了
 * /home/dksong/ALL-IN-ONE/node/practice/fs/node/practice/fs/path.js
 * /home/dksong/ALL-IN-ONE/node/practice/fs/test/node/practice/fs/path.js
 * /test/node/practice/fs/path.js
 */

console.log(path.normalize('././..//chalk/index.js'))
/**
 * ../chalk/index.js
 */
