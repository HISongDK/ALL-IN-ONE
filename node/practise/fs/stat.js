import fs from 'fs'
// 获取文件属性信息

fs.stat('/testNodeFileFd.txt', (err, stats) => {
    if (err) return

    console.log('stat: ', stats)
})

try {
    const stats = fs.statSync('/testNodeFileFd.txt')
    console.log('statSync: ', stats)

    console.log('\n*** stats.isFile  ***\n', stats.isFile())

    console.log('\n=== stats.isDirectory  ===\n', stats.isDirectory())

    console.log('\n=== stats.isSymbolicLink  ===\n', stats.isSymbolicLink())

    console.log('\n=== stats.size  ===\n', stats.size)
} catch (err) {
    console.error(err)
}

// 文件信息是获取到了，问题是属实看不明白啊
// 乍一看还以为是打印的错误信息
