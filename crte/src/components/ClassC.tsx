/**
 * 一、组件声明
 */

// react 中组件声明方式分为：1.类组件 2.函数组件。
// 以下两种组件声明时如何定义组件类型：

/**
 * 1. 类组件
 * 类组件的定义有两种：
 * React.Component<P,S={}>
 * React.pureComponent<P,S={},SS={}>
 * 它们都是泛型接口接收两个可选参数：
 * 第一个是 props 的类型定义
 * 第二个是 state 的类型定义
 */
import * as React from 'react'

interface IProps {
  name: string
}
interface IState {
  count: number
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      count: 0,
    }
  }

  public render() {
    const { name } = this.props
    const { count } = this.state
    return (
      <div>
        {name}
        {count}
      </div>
    )
  }
}
export default App
