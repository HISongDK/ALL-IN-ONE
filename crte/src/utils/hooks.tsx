import React, { useState, useEffect } from 'react'

export const useFetch = (url: string, options: any) => {
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<any>(null)
  const [abort, setAbort] = useState<() => void>(() => () => {})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const controller = new AbortController()
        const { signal } = controller
        setAbort(() => () => controller.abort)
        const res = await fetch(url, { ...options, signal })
        const json = await res.json()
        setResponse(json)
      } catch (err) {
        setError(err)
      }
    }
    fetchData()
    return () => {
      abort()
      /**
       * debug 相关
       * 从昨天刚随敲完这段代码就跑不起来，有问题，报非法调用
       * 我还以为是 fetch api 的问题，一直搜不到相关的问题解答
       * 刚才试了下把不了解的 abortController 相关代码先注释掉，竟然就可以跑了，也就确定是这个 abort 调用的问题
       * 果然一查就查到结果了，大概说是调用上下文丢失 this 指向不对，所以报错
       * 解决方法也很清晰的说明了，还是用原来的对象调用，赋值的时候再套个函数完事了。(或者用bind绑定会原对象也行，我更喜欢函数套娃)
       * 再加上用的 setState 本身一个函数的话会被当作函数传参处理，所以还得再套一层
       */

      /**
       * useEffect return function 相关
       * 先清理副作用，天然防抖的好办法啊
       */
    }
  }, [])

  return { response, error, abort }
}

export default useFetch
