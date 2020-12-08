# 接口

::: tip TIP
TypeScript的核心原则之一是对值所具有的结构进行类型检查。
接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约

:::

## 执行原理
``` js
function f(o: { label: string }) {
  console.log(o.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
f(myObj);
```
f有一个参数，并要求这个对象参数有一个名为label类型为string的属性。
需要注意的是，我们传入的对象参数实际上会包含很多属性，但是编译器只会检查那些必需的属性是否存在，并且其类型是否匹配。 
然而，有些时候TypeScript却并不会这么宽松，我们下面会稍做讲解。

* 下面我们以上面的例子用接口重写一个例子
``` js
interface LabelledValue {
    label: string,
    color?: number,  //color 可选属性 不是必有
    readonly x: number, // x 只读属性 只能在对象刚刚创建的时候修改其值
    sayHi: ()=>string 
  }
  
  function f(o: LabelledValue):void {
    console.log(o.label);
  }
  
  let myObj = {size: 10, label: "Size 10 Object", x: 20, sayHi: ():string =>{return "Hi there"}};
  //x 一经创建 值就无法修改
  f(myObj);

```