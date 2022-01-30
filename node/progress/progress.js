import progressBar from 'progress' // 更好一点的进度条库是 ora 吧？
import chalk from 'chalk'

const bar = new progressBar(':bar', { total: 10 })

const timer = setInterval(() => {
    bar.tick()
    if (bar.complete) {
        console.log(chalk.bgBlue.green('\ncomplete\n'))
        clearInterval(timer)
    }
}, 100)
