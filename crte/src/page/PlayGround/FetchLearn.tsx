import React from 'react'

const fetchLearn = async () => {
  const url =
    'https://s.cn.bing.net/th?id=OHR.MountFryatt_ZH-CN0611142036_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&qlt=30'
  try {
    const res = await fetch(url)
    console.log('\n--- res  ---\n\n', res)
    // fetch 响应数据为stream，需要异步处理，可查看同步属性
    console.log('\n---  res.status  ---\n', res.status)
    console.log('\n---  res.statusText  ---\n', res.statusText)

    // fetch 响应中包含一个可迭代的 Headers 对象
    res.headers.forEach((value, key) => {
      console.log(`${key}：`, value)
    })
    // headers.get() 稍微常用一点
    console.log(
      '\n--- headers.get("content-length")  ---\n\n',
      res.headers.get('content-length'),
    )

    // response.body 是返回的 ReadableStream 对象，可以分块读取内容，应用之一为显示下载进度
    const resBackup = res.clone()
    const reader = resBackup.body?.getReader()
    // eslint-disable-next-line no-constant-condition
    while (1) {
      // @ts-ignore
      // eslint-disable-next-line
      const { done, value } = await reader?.read()
      if (done) break
      console.log(`Received ${value.length} bytes`)
    }

    // fetch 只有网络错误才会 reject 4xx 5xx 也会当作请求成功，需判断处理
    // 不用考虑 3xx fetch 会将跳转的状态码转为 200
    if (res.status >= 200 && res.status < 300) {
      // Response 对象提供了包括 response.json() 在内的 5 种读取不同类型响应数据的方法
      // 但由于 response.body 是可读流对象，读取后就不存在了，可以使用 response.clone() 生成副本
      // return await res.json()
      // return await res.formData()
      return await res.blob()
    }

    throw new Error(res.statusText)

    // 或
    // if(res.ok) { return await res.json() } throw new Error(res.statusText)
  } catch (err) {
    console.log('Request failed: ', err)
    throw new Error(err as string)
  }
}

function FetchLearn() {
  fetchLearn()
  return (
    <p>
      <br />
      请打开控制台，查看请求结果
    </p>
  )
}

export default FetchLearn
