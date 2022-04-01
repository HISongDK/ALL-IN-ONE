import fs from 'fs'
// 获取文件描述符

// 这文件描述符到底是什么东西，怎么还一会一变，而且还两个不一样呢
fs.open('/testNodeFileFd.txt', 'r', (err, fd) => {
    console.error(err)
    console.log('open: ', fd)
})

try {
    const fd = fs.openSync('/testNodeFileFd.txt', 'r')
    console.log('openSync: ', fd)
} catch (error) {
    console.error(error)
}
