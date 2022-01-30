/**
 * module.exports & exports[key] 赋值导出模块
 */

const objModule = {
    name: 'module 1',
}

const proModule = {
    name: 'module 2',
}

module.exports = objModule // module.exports 优先级高
exports.propertyModules = proModule // 二者同时使用 export[key] 不生效
