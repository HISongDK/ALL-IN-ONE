/* eslint-disable no-console */
const areas1 = require('./省市')
const areas2 = require('./省市区县')

// console.log('---  areas  ---\n', areas)

/**
 * 省市文件处理
 */

// const areaObj = {}
// areas1.forEach((area) => {
//   areaObj[area.provinceName] = area.citys.map((city) => city.citysName)
// })

/**
 * 省市区县文件处理
 */

const areaObj = {}
areas2.forEach((area) => {
  areaObj[area.name] = area.cityList.map((city) => {
    if (['北京市', '天津市', '上海市', '重庆市'].includes(city.name)) {
      return city.areaList.map((areaItem) => areaItem.name)
    }
    return city.name
  })
})

// areas2.forEach((area) => {
//   if (['北京市', '天津市', '上海市', '重庆市'].includes(area.name)) {
//     const areaList = area.cityList.map((city) =>
//       city.areaList.map((item) => item.name),
//     )
//     areaObj[area.name] = areaList
//   }

//   areaObj[area.name] = area.cityList.map((city) => city.name)
// })

/**
 * 输出 stdout
 */

console.log(areaObj)
