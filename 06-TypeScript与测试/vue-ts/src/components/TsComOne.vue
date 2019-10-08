<template>
  <div>
    <h1>DWDWWWWW</h1>
    <h1>{{ msg }}</h1>
    <h1>{{ name2 }}</h1>
    <div>
      <input type="text" placeholder="输入特性" @keyup.enter="addItem">
    </div>
    <ul>
      <li v-for="item in list" :key="item">
        {{ item }}
      </li>
    </ul>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

class Feature {
  constructor (public id: number, public name: string, public version: string) {}
}

/**
 * 装饰器就是工厂函数 传入一个对象 输出处理后的新对象
 * 用在 TsComOne 上面 就装饰 TsComOne 
 * 可以把 TsComOne（普通的类） 变成一个组件
 */
@Component
export default class TsComOne extends Vue {
  /**
   * 装饰器
   *  -感叹号是必填项
   * 传入一个普通的变量 转换成组件中可以使用的属性
   */
  @Prop() private msg!: string; // 成员属性
  @Prop({
    default: 'zhaosi'
    // ？ 就是可选参数
  }) private name2?: string;
  @Prop() private obj!: object

  // 字符串数组 (data 中的数据)
  private list: string[] = ['dwd', 'dwdw2', 'dwdw3']

  // 符合格式
  private features: Feature[] = [
    {
      id: 1,
      name: '静态类型',
      version: '1.0'
    },
    {
      id: 1,
      name: '静态类型',
      version: '1.0'
    }
  ]

  addItem(event: any) {
    this.list.push(event.target.value)
  }

}


// 类型注解
let title: string;
// 类型的推论 就是字符串
let name = 'zhaosi';

// 数组类型 [简单类型这样写]
let names: (string)[];

// 任意类型
let list: any;

// 在函数中使用 约束形参和返回值的类型
function greeting(name1: string): string {
  console.log('hello' + name1);
  return 'hello' + name1;
}

// 空返回值
function warn(): void {
  console.log('无返回值的函数')
}

// 必选参数(参数是必填的))
function sayHello(name1: string, age: number): string {
  return name1 + '' + age
}

// 不传就错了
// sayHello('20', 11)
// sayHello('20')

// 可选参(加上问好 变成可选参数)
// function sayHello1(name1: string, age?: number): string {
// 默认值
function sayHello1(name1: string, age: number = 20): string {
  return name1 + '' + age
}

// 返回多种类型
function sayHello2(name1: string, age: number = 20): string|number {
  return name1 + '' + age
}

// 函数的重载
function info(a: {name: string}): string;
function info(a: string): object;
function info(a: any): any {
  if (typeof a === 'object') {
    return a.name
  } else {
    return { name: a }
  }
}


title = 'dwnkd';

name = 'dwd';

names = ['dwd', 'dwdw1', 'dwdw2', 'dwd3'];

list = 'dwdw';

greeting('zhaosi');

// 接口
// 接口约束结构
interface Person {
  firstName: string
  lastName: string
}

function greeting1(person: Person) {
  return `${person.firstName}和${person.lastName}`
}

greeting1({
  firstName: 'zhao',
  lastName: 'si'
})

// 泛型
interface Result<T> {
  ok: 0 | 1
  // data 一定是T类型构成的数组
  data: T[]
}

// 泛型函数
// 返回值是接口Result 类型 会传入一个T类型
function getData<T>(): Result<T> {
  const data: any[] = [
    {
      id: 1,
      name: '类型注解',
      version: '1.0'
    },
    {
      id: 2,
      name: '类型编译',
      version: '2.0'
    }
  ]

  return {
    ok: 0,
    data
  }
}

let features: Feature[]
// 传入一个类型 data 一定是Feature 构成的数组
features = getData<Feature>().data



</script>

<style scoped lang="scss">
  
</style>