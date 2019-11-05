import React, { useState, useEffect } from 'react'

function HookTest(props) {

  // 接受一个参数 为 其中的状态赋初始值 返回一个数组
  // 数组第一项为一个状态 第二项为更改状态的方法
  const [count, setCount] = useState(0);

  // 多个状态
  const [age] = useState(20);
  const [fruit, setFruit] = useState({name: '香蕉'});
  const [fiuits, setFruits] = useState([
    {
      name: '香蕉'
    },
    {
      name: '苹果'
    },
  ]);

  // 副作钩子 在每次渲染的时候都会执行
  useEffect(() => {
    // document.title = `点击了${count}此`
    console.log('每次渲染都执行')
  });


  // 只依赖与count
  useEffect(() => {
    document.title = `点击了${count}此`
  }, [count]);

  // 只打调用一次 依赖数组 无依赖
  useEffect(() => {
    console.log('只调用一次的api调用')
  }, []);

  return (
    <div>
      <p>点击了{count}次</p>
      <button onClick={() => setCount(count + 1)}>点击+1</button>
      <hr />

      <p>年龄{age}</p>
      <p>选择的水果{fruit.name}</p>
      <ul>
        <p>水果列表</p>
        {
          // 点击水果 进行更新
          fiuits.map(item => <li key={item.name} onClick={() => setFruit({...item})}>{item.name}</li> )
        }
      </ul>
    </div>
  );
}

export default HookTest;