/**
|--------------------------------------------------
| 1. 实现原生的 ajax 请求
|--------------------------------------------------
*/
const ajax = {
    get(url, fn) {
        // 创建 xhr 实例
        const xhr = new XMLHttpRequest()
        // 调用 open 方法指定请求方式和路径,及是否异步执行
        xhr.open('GET', url, true)
        // 指定请求后的处理函数
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                fn(xhr.responseText)
            }
        }
        // 发送请求
        xhr.send()
    },
    post(url, data, fn) {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', url, true)
        xhr.setRequestHeader(
            'Content-type',
            'application/x-www-form-urlencoded',
        )
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                fn(xhr.responseText)
            }
        }
        xhr.send(data)
    },
}

/**
|--------------------------------------------------
| 2. 手写 new 操作符过程 
|--------------------------------------------------
*/

// 第一个参数接收函数，其余参数统一到 args
function myNew(fn, ...args) {
    // 创建一个对象
    const obj = {}
    // 为该对象绑定原型
    obj.__proto__ = fn.prototype
    // 绑定 this 指向
    fn.apply(obj, args)
    // 返回对象
    return obj
}

function Constructor(name, age) {
    this.name = name
    this.age = age
}

let dog = new Constructor('monkeyD', 2)
let cat = myNew(Constructor, 'catD', 3)

console.log(dog, cat)

/**
|--------------------------------------------------
| 3. instanceof 关键字
|--------------------------------------------------
*/
function instanceOf(father, child) {
    const prototype = father.prototype
    const proto = child.__proto__

    while (proto) {
        if (proto === prototype) {
            return true
        }
        proto = proto.__proto__
    }

    return false
}
/**
|--------------------------------------------------
| 4. 实现防抖函数
|--------------------------------------------------
*/
function debounce(fn, delay = 500) {
    let timer

    return function () {
        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, delay)
    }
}

window.addEventListener(
    'resize',
    debounce(() => {
        // 向防抖函数传参的时候 debounce 就调用过了
        // 所以真正的时间监听函数其实是 debounce 返回的函数
        console.log('页面尺寸变化')
    }),
)
/**
|--------------------------------------------------
| 5. 实现节流函数
|--------------------------------------------------
*/
function throttle(fn, delay = 200) {
    let canRun = true
    return function () {
        if (!canRun) return

        canRun = false
        setTimeout(() => {
            fn.apply(this, arguments)
            canRun = true
        }, delay)
    }
}
/**
|--------------------------------------------------
| 6. 实现数组去重
|--------------------------------------------------
*/
// 第一种：map 记录
function removeDuplicate1(arr) {
    const result = []
    arr.reduce((pre, next) => {
        if (!pre[next]) {
            pre[next] = 1
            result.push(next)
        }
        return pre
    }, {})
}
// 第二种：set 去重
function removeDuplicate2(arr) {
    return [...new Set(arr)]
}
/**
|--------------------------------------------------
| 7. 用 setTimeout 实现 setInterval
|--------------------------------------------------
*/
function mySetInterval(fn, delay) {
    let timer // 定义保存延时器的变量，以便清除
    const interval = () => {
        fn() // 调用要执行的函数
        timer = setTimeout(interval, delay) // 递归调用
    }
    // 初始延时调用
    setTimeout(interval, delay)

    // 函数调用后，返回一个带有清除延时器方法的对象
    return {
        cancel() {
            clearTimeout(timer)
        },
    }
}

// usage
const { cancel } = mySetInterval(() => console.log('延时器模拟定时器'), 1000)
setTimeout(() => cancel(), 5000)
/**
|--------------------------------------------------
| 8. 用 setInterval 实现 setTimeout
|--------------------------------------------------
*/
function mySetTimeout(fn, delay) {
    const timer = setInterval(() => {
        fn()
        clearInterval(timer) // 是哈，直接执行完请了这个定时器那不就是只执行一次的延时器么
    }, delay)
}

mySetTimeout(() => {
    console.log('使用定时器模拟延时器')
}, 1000)
/**
|--------------------------------------------------
| 9. 实现一个 compose 函数
|--------------------------------------------------
*/
// 题目说明：实现以下效果
function fn1(x) {
    return x + 1
}
function fn2(x) {
    return x + 2
}
function fn3(x) {
    return x + 3
}
function fn4(x) {
    return x + 4
}

const a = compose(fn1, fn2, fn3, fn4)
console.log(a, a(1))

// 实现如下：
function compose(...fns) {
    // 未传入参数 返回一个直接返回入参的函数
    if (!fns.length) return (num) => num
    // 只有一个参数，返回改参数
    if (fns.length === 1) return fns[0]
    // 返回合并处理相同入参的函数
    return fns.reduce((pre, next) => {
        // 有点绕，看不太懂先放着
        return (num) => next(pre(num))
    })
}
/**
|--------------------------------------------------
| 10. 实现一个柯里化函数
|--------------------------------------------------
*/
// 题目要求：
const add = (a, b, c) => a + b + c
const curryAdd = currying(add, 1)(2)(3)
console.log(curryAdd) // 1 + 2 + 3 = 6
// 实现如下：

function currying(fn, ...args1) {
    // 读取 fn 参数有几个
    const { length } = fn // 才知道函数的 length 属性是入参个数
    // NOTE:这一步比较关键，弄一个闭包，我刚开始还以为是冗余代码，给写在内层函数里面，就实现不了了
    let allArgs = [...args1]

    const res = (...args2) => {
        // NOTE:每次调用，参数都会合并到 allArgs
        allArgs = [...allArgs, ...args2]
        // 长度相等就返回执行结果
        if (allArgs.length === length) {
            return fn(...allArgs)
        } else {
            // 不相等继续返回函数
            return res
        }
    }

    return res
}
/**
|--------------------------------------------------
| 11. 实现一个 LRU 缓存函数
|--------------------------------------------------
*/

/**
 * 题目说明：运用你所掌握的数据结构，设计和实现一个 LRU (最近最少使用)缓存机制。它应该支持以下操作：
 * 获取数据 get 和写入数据 put
 * 获取数据 get(key) - 如果密钥（key）存在于缓存中，则获取密钥的值（总是正数），否则返回 -1。
 * 写入数据 put(key, value) - 如果密钥已经存在，则变更其数据值；如果密钥不存在，则插入该组【密钥/数据值】。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。
 *
 * 示例：
 * LRUCache cache = new LRUCache(2 /* 缓存容量 *\/)
 * cache.put(1, 1)
 * cache.put(2, 2)
 * cache.get(1)         // 返回 1
 * cache.put(3, 3)      // 存入 3 ，作废 2
 * cache.get(2)         // 返回 -1
 * cache.put(4, 4)      // 存入 4 ，作废 1
 * cache.get(3)         // 返回 3
 * cache.get(4)         // 返回 4
 */

// 实现如下：
class LRUCache {
    // ES6 的 class 类
    // 内置一个 constructor 函数，像是构造函数
    // TODO: Question,ES6 的类和普通构造函数的区别
    constructor(size) {
        this.size = size
        // NOTE：使用 map 数据类型
        // 特点：
        this.cache = new Map()
    }
    get(key) {
        const hasKey = this.cache.has(key)

        // if (!hasKey) return -1 // 这么写可读性有点差

        // const val = this.cache.get(key)
        // this.cache.delete(key)
        // this.cache.set(key, val)
        // return val

        if (hasKey) {
            const val = this.cache.get(key)
            this.cache.delete(key)
            this.cache.set(key, val)

            return val
        } else {
            return -1
        }
    }
    put(key, val) {
        const hasKey = this.cache.has(key)

        // 存在 key 值就删掉，存新的
        if (hasKey) {
            this.cache.delete(key)
        }
        this.cache.set(key, val)
        // 超过缓存数量，就删掉最久未使用的
        if (this.cache.size > this.size) {
            this.cache.delete(
                /* 属实不了解 map 的这么多方法 */
                this.cache.keys().next().value,
            )
        }
    }
}
/**
|--------------------------------------------------
| 12. 简单实现发布订阅
|--------------------------------------------------
*/
// 题目描述：实现一个发布订阅模式拥有 on emit once off 方法
class EventEmitter {
    constructor() {
        // 挂载到实例上一个可进行操作的对象
        this.cache = {}
    }
    // ON 方法
    on(name, fn) {
        // 获取是否已经有监听的名称
        const tasks = this.cache[name]
        if (tasks) {
            // 如果已添加过监听，就把继续添加监听的执行函数
            this.cache[name].push(fn)
        } else {
            // 之前无添加监听,将执行函数作为数组项赋值给该名称
            this.cache[name] = [fn]
        }
    }
    // OFF 方法
    off(name, fn /* 移除对某个名称的某个执行函数的监听 */) {
        const tasks = this.cache[name]
        if (tasks) {
            // 获取数组中该执行函数的索引
            const index = tasks.findIndex((item) => item === fn)
            if (index > -1) {
                this.cache[name].splice(index, 1)
            }
        }
    }
    // EMIT 触发对应的监听名称
    emit(name, once = false, ...args) {
        // 复制一份，防止回调中继续 on 导致死循环 （没太理解先跳过）
        const tasks = this.cache[name]?.slice()

        if (tasks) {
            for (const task of tasks) {
                task(...args)
            }
        }

        if (once) {
            // 只触发一次，就是触发后删除对该名称的订阅
            delete this.cache[name]
        }
    }
    // ONCE 方法，只触发一次，就是调用 emit 时 once 参数为 true
    once(name, ...args) {
        // 挺有意思的，这种封装
        this.emit(name, true, ...args)
    }
}
/**
|--------------------------------------------------
| 13. 实现 JSON.parse
|--------------------------------------------------
*/
function parse(json) {
    return eval(`(${json})`)
}
console.log(JSON.stringify({ name: 'song', age: 24 }))
console.log(parse('{"name":"song","age":24}'))
/**
|--------------------------------------------------
| 14. 将 DOM 转化为 树结构对象
|--------------------------------------------------
*/
/**
 *  题目描述：
    <div>
        <span></span>
        <ul>
            <li></li>
            <li></li>
        </ul>
    </div>
 *  将上方的DOM转化为下面的树结构对象
    {
        tag: 'DIV',
        children: [
            { tag: 'SPAN', children: [] },
            {
                tag: 'UL',
                children: [
                    { tag: 'LI', children: [] },
                    { tag: 'LI', children: [] }
                ]
            }
        ]
    }
 */

// 实现如下：
function dom2tree(dom /* 直接接受 dom 节点么，good idea */) {
    // 肯定是要递归的
    let obj = {}
    obj.children = []
    obj.tag = dom.tagName

    Array.from(dom.children).forEach((item) =>
        obj.children.push(dom2tree(item)),
    )

    return obj
}
const domNode = document.getElementById('dom2tree')
console.dir(domNode)
console.log(dom2tree(domNode))
