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
并且我们定义两个fulfilledCallbacks和rejectedCallbacks数组，作用暂且不管
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
在.then函数里面首先需要判断当前调用.then时的状态,如果是等待状态就将onFulfilled函数添加进我们上一步定义的: 成功的回调栈中
``` js
MyPromise.prototype.then = function (onFulfilled,onRejected) {
    const _this = this;
    //如果是同步状态,成功或者失败,直接执行当前的回调
    if (_this.state === FULFILLED) {
        onFulfilled(this.value);
    }
    if (_this.state === REJECTED) {
        onRejected(this.value);
    }
    //等待异步状态，则添加回调函数到栈中
    if (_this.state === PENDING) {
        _this.fulfilledCallbacks.push(()=>{
            onFulfilled(this.value);
        });
        _this.rejectedCallbacks.push(()=>{
            onRejected(this.value);
        })
    }
}
```
然后在回调栈去调用成功或者失败的回调
``` js
function resolve(value) {
    if (_this.state === PENDING) {
        _this.state = FULFILLED;
        //执行回调方法，reject函数同理
        _this.fulfilledCallbacks.forEach(myFn => myFn());
    }
}
function reject(value) {
    if (_this.state === PENDING) {
        _this.state = REJECTED;
        _this.rejectedCallbacks.forEach(myFn => myFn());
    }
}
```
当我们的Promise写到这一步,就已经可以完成.then方法的调用,但是却并不能实现.then方法最重要的链式调用
所以我们继续改造我们的.then方法
``` js
MyPromise.prototype.then = function (onFulfilled,onRejected) {
    const _this = this;
    //要达到链式调用的效果,那么每一个.then返回的必须是一个新的Promise对象
    const proMise2 = new MyPromise((resolve,reject)=>{
        //等待异步状态，则添加回调函数到栈中
        if (_this.state === PENDING) {
            _this.fulfilledCallbacks.push(() => {
                //监听上一次.then是否有返回错误信息
                try{
                    let x = onFulfilled(_this.value);
                    resolve(x);  //完成链式调用
                } catch(err) {
                    reject(err);
                }
            });
            _this.rejectedCallbacks.push(() => {
                try{
                    let x = onRejected(_this.value);
                    resolve(x)
                } catch(err) {
                    reject(err);
                }
            })
        }
        //如果是同步状态,成功或者失败
        if (_this.state === FULFILLED) {
            try{
                let x = onFulfilled(_this.value);
                resolve(x);
            } catch(e) {
                reject(e);
            }
        }
        if (_this.state === REJECTED) {
            try{
                let x = onRejected(_this.value);
                resolve(x);
            } catch(e) {
                reject(e);
            }
        }
    })
    return proMise2;
}
```
初步完成.then方法的调用之后,我们还需要解决一些其他问题,比如: 类型上的校验等
那么根据Promise+的规范,我们还需要在外层添加一个resolvePromise函数去做相应的处理
那么首先在要将.then方法内的resolve(x)全部替换为resolvePromise函数执行,继续改造.then函数
``` js
MyPromise.prototype.then = function (onFulfilled,onRejected) {
    const _this = this;
    const proMise2 = new MyPromise((resolve,reject)=>{
        if (_this.state === PENDING) {
            //为了在resolvePromise方法中能获取到proMise2 要将resolvePromise放入事件队列中最后执行
            setTimeout(()=>{
                    _this.fulfilledCallbacks.push(() => {
                        try{
                            let x = onFulfilled(_this.value);
                            resolvePromise(proMise2,x,resolve,reject);
                        } catch(err) {
                            reject(err);
                        }
                    });
                    _this.rejectedCallbacks.push(() => {
                        try{
                            let x = onRejected(_this.value);
                            resolvePromise(proMise2,x,resolve,reject)
                        } catch(err) {
                            reject(err);
                        }
                    })
            },0)
        }
        if (_this.state === FULFILLED) {
            setTimeout(()=>{
                try{
                    let x = onFulfilled(_this.value);
                    resolvePromise(proMise2,x,resolve,reject);
                } catch(e) {
                    reject(e);
                }
                
            },0)
        }
        if (_this.state === REJECTED) {
            setTimeout(()=>{
                try{
                    let x = onRejected(_this.value);
                    resolvePromise(proMise2,x,resolve,reject);
                } catch(e) {
                    reject(e);
                }
            },0)
        }
    })
    return proMise2;
}
```
resolvePromise函数
``` js
function resolvePromise(proMise2,x,resolve,reject){
    //首先判断上一次.then中返回的x和这一次的proMise2是否为同一个promise
    if(proMise2===x){
        return reject(new TypeError("禁止循环引用!"))
    }
    //判断如果.then中return的是一个Promise  以及一些类型的校验
    if(x !==null && typeof x === 'object' || typeof x ==='function'){
        try{
            const then = x.then;
            then.call(x, y=>{
                resolve(y);
                // this.resolvePromise(newPromise, y, resolve, reject);
            },r=>{
                reject(r);
            })
        }catch(err){
            reject(err);
        }
    }else{
        resolve(x);
    }
}
```
我们的Promise进行到这一步已经初步完成我了我们最常用的.then的异步同步调用.then的链式调用等重要的功能
但根据Promise+的规范后期还需要进行很多细节上的处理,以及all和race的方法的实现等,这里就不再展开