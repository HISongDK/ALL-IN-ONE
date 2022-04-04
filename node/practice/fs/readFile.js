import fs from 'fs'

fs.readFile('./readFile.js', 'utf-8', (err, data) => {
    if (err) {
        return console.log(err)
    }
    console.log('\n--- 标准异步读取文件 ---\n\n', data)
})

try {
    const data = fs.readFileSync('./readFile.js', 'utf-8')
    console.log('\n--- 同步方式读取文件  ---\n\n', data)
} catch (error) {
    console.error(error)
}
