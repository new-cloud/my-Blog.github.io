# 手写call、apply、bind

::: tip
实现call、apply、bind
:::

### call

```js
Function.prototype.myCall=function(context,...arg){ //这是传入...是将context后面的所有参数合并为一个数组
  // call方法只能是方法才能调用
  // if(typeof this !== "function"){
  //   throw new TypeError("Error");
  // }
  let fn = Symbol('临时属性');
  context[fn] = this;
  context[fn](...arg);  //扩展运算符将arg数组打散开来
  delete context[fn];

}
//Symbol 定义的变量肯定是唯一的,  不会顶替掉对象原来的 属性.  但他毕竟是临时变量  删除是为了不污染这个变量
function ass(a){
    console.log(this.name+a)
}
let lilei = {
  name: 'lilei'
}
ass.myCall(lilei,1,3);
ass.myCall(lilei,2);

```