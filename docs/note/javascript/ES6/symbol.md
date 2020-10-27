
# Symbol

::: tip
ES6 增加了Symbol基础数据类型
:::

唯一，永不相等
```js
let a1 = Symbol();
let a2 = Symbol();

console.log(a1 === a2);  //false
```

增加标识
```js
let a = Symbol('这是一个标识');

```
不可枚举
```js
let obj = {
    age: 10
};
let name = Symbol('name');
obj[name] = name;
for(let key in obj){
    console.log(key)//  只能遍历出age属性  symbol属性name 无法被遍历
}
//如果要获取对象中的 symbol属性
let sbs = Object.getOwnPropertySymbols(obj);
console.log(sbs);

```
Symbol.for
```js
// 创建一个symbol yi  如果存在就直接取值后赋值  如果不存在 先创建 yi 后赋值
let s1 = Symbol.for('yi');
let s2 = Symbol.for('yi');

console.log(s1 === s2); //ture

```
### Symbol和元编程

1. species
```js
//衍生对象
class Warr extends Array{  //创建一个类newArr 继承 Array类
    constructor(...arg){
        //在这里super相当于把Array的constructor给执行了,并且让方法中的this是Warr的实例
        super(...arg);
    }
}
let v = new Warr(1,2,3);
let c = v.map(item=>item*2);
//问题
console.log(c instanceof Warr);  //true
//   c 的指针应该是指向 Array 才是我们要的结果
//解决
// class Warr extends Array{
//     constructor(...arg){
//         super(...arg);
//     }
//     static get [Symbol.species](){
//         return Array;
//     }
// }
// cosnole.log(c instanceof Warr)  //false

```
2. toPrimitive
```js
//数据类型转换
let obj = {
    [Symbol.toPrimitive](type){
        return 100;
    }
};
console.log(obj+'1'); // 1001
```