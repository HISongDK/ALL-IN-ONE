// react snippets
// hook 组件: rcfe
import React, { useState } from "react";
import ExampleWithManyStates from "./ExampleWithManyStates"

function Example() {
  // 声明一个叫做 count 的 state 变量.
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>你点了我 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>点我</button>
      <ExampleWithManyStates/>
    </div>
  );
}

export default Example;
