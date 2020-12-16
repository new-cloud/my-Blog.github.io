# 函数高级

::: tip TIP
High-Order Function
在数学和计算机科学中，高阶函数是至少满足下列一个条件的函数：

* 接受一个或多个函数作为输入
* 输出一个函数

:::

## 惰性函数
::: tip TIP
惰性函数表示函数执行的分支只会在函数第一次调用的时候执行。后续我们所使用的就是这个函数执行的结果。
:::

相信大家在兼容事件监听时，都写过这样的代码。
``` js
function addEvent(element, type, handler) {
  if (window.addEventListener) {
    element.addEventListener(type, handler, false);
  } else if (window.attachEvent){
    element.attachEvent('on' + type, handler);
  } else {
    element['on' + type] = handler;
  }
}

```
仔细看下，我们会发现，每次调用addEvent，都会做一次if-else的判断，这样的工作显然是重复的。这个时候就用到惰性函数了

利用惰性函数的思维，我们可以改造下上述代码。
``` js
function addEvent(element, type, handler) {
  if (window.addEventListener) {
    addEvent = function(element, type, handler) {
      element.addEventListener(type, handler, false);
    }
  } else if (window.attachEvent){
    addEvent = function(element, type, handler) {
      element.attachEvent('on' + type, handler);
    }
  } else {
    addEvent = function(element, type, handler) {
      element['on' + type] = handler;
    }
  }
  addEvent(element, type, handler);
}

```
这代码看起来有点low，但是它确实减少了重复的判断。在这种方式下，函数第一次执行时才确定真正的值。

我们还可以利用IIFE匿名函数自调提前确定函数真正的值。
``` js
var addEvent = (function() {
  if (window.addEventListener) {
    return function(element, type, handler) {
      element.addEventListener(type, handler, false);
    }
  } else if (window.attachEvent){
    return function(element, type, handler) {
      element.attachEvent('on' + type, handler);
    }
  } else {
    return function(element, type, handler) {
      element['on' + type] = handler;
    }
  }
}())

```
## 函数柯里化