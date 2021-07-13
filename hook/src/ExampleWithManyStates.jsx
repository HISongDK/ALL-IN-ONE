import React, { useState } from "react";

function ExampleWithManyStates() {
  // 声明多个变量
  const [age] = useState(24);
  const [fruit] = useState("apple");
  const [todos] = useState([{ text: "Learn Hooks" }]);
  return (
    <div>
      <p>年龄: {age}</p>
      <p>水果: {fruit}</p>
      <p>代办清单: {todos[0].text}</p>
    </div>
  );
}

export default ExampleWithManyStates;
