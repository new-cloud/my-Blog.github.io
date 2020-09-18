# 手写promise

::: tip 
Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。而且也是面试当中必问之一，而考验你对Promise火候的关键就在于有没有自己动手实现过Promise

:::

参考PromiseA+规范总结: 
+ 我们知道Promise中共有三种状态
    * pending       过渡态
    * fulfilled     完成态
    * rejected      失败态

所以首先上来第一步我们定义三种状态
``` js
//首先定义3个状态
const PENDING = 'pending';     //等待
const FULFILLED = 'fulfilled'; //成功
const REJECTED = 'rejected';   //失败
```
紧接着我们定义Promise的构造函数: MyPromise，以及回调函数中的resolve函数和reject函数
并且我们定义两个fulfilledCallbacks和rejectedCallbacks数组,作用暂且不管
``` js
function MyPromise(fn){
    const _this = this;
    _this.state = PENDING;   //默认初始状态为等待
    _this.fulfilledCallbacks = [];  //成功的回调栈
    _this.rejectedCallbacks = [];   //失败的回调栈
    function resolve(value) {
        //首先判断状态是在等待中才能执行resolve或者reject
        if (_this.state === PENDING) {
            //并且一旦成功或者失败_this.state的状态将不再改变
            _this.state = FULFILLED;
        }
    }
    function reject(value) {
        if (_this.state === PENDING) {
            _this.state = REJECTED;
        }
    }
    try{
        fn(resolve, reject)
    }catch(e) {
        reject(e);
    }
}
```
然后所有的Promise对象都有.then方法,并且.then方法里面会有成功的回调函数onFulfilled和失败的回调函数onRejected
在.then函数里面首先需要判断当前调用.then时的状态,如果是等待状态就将onFulfilled函数
``` js
MyPromise.prototype.then = function (onFulfilled,onRejected) {
        //等待异步状态，则添加回调函数到栈中
        if (_this.state === PENDING) {
            _this.fulfilledCallbacks.push(()=>{
                onFulfilled(this.value);
            });
            _this.rejectedCallbacks.push(()=>{
                onRejected(this.value);
            })
        }
        //如果是同步状态,成功或者失败,直接执行当前的回调
        if (_this.state === FULFILLED) {
            onFulfilled(this.value);
        }
        if (_this.state === REJECTED) {
            onRejected(this.value);
        }
}
```