import chalk from 'chalk' // 导入时 package.json 需指定 type:module
const { log } = console

log(chalk.yellow('你好'))

log(chalk.blue('Hello') + ' World' + chalk.red('!'))

log(chalk.green('Successful'))

log(chalk.bgGreenBright.bold.red.underline('Hello World'))
