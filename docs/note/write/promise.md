# 手写promise

::: tip 
Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。而且也是面试当中必问之一，而考验你对promise火候的关键就在于有没有自己动手实现过promise

:::

参考promiseA+规范总结: 
+ 我们知道promise中共有三种状态
    * pending 过渡态
    * fulfilled 完成态
    * rejected 失败态