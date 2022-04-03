/**
 * 使用 readline 模块，进行命令行交互
 */

import readline from 'readline'
import chalk from 'chalk'

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

// readlineInterface.question('name?', (name) => {
//     console.log(`Hello ${chalk.green(name)} !`)
//     readlineInterface.close()
// })

/**
 * 引入 Inqurer.js 进行交互
 */

import inquirer from 'inquirer'

const msgs = [
    {
        type: 'input',
        name: 'firstLine',
        message: '第一行：',
    },
    {
        type: 'input',
        name: 'secondLine',
        message: '第二行：',
    },
]

inquirer.prompt(msgs).then((answers) => {
    console.log(`首行输入： ${chalk.green(answers.firstLine)}`)
    console.log(`次行输入： ${chalk.yellow(answers.secondLine)}`)
})
