# 函数高级
::: tip TIP
函数进阶运用
:::


## 高阶函数
::: tip TIP
High-Order Function
在数学和计算机科学中，高阶函数是至少满足下列一个条件的函数：

* 接受一个或多个函数作为输入
* 输出一个函数

:::
根据以上定义,发现平时使用过很多高阶函数。数组的一些高阶函数使用得尤为频繁.

例如: 
``` js 
[1, 2, 3, 4].forEach(function(item, index, arr) {
  console.log(item, index, arr)
})
[1, 2, 3, 4].map(item => `小老弟${item}`)

```
* forEach和map的就是一个函数

假设有这么一个需求，存在一个数组，数组元素都是表示人的对象，我们想从数组中选出年纪最大的人。

这个时候，就需要一个高阶函数来完成。
``` js
/**
 * 根据求值条件判断数组中最大的项
 * @param {Array} arr 数组
 * @param {String|Function} iteratee 
 * 返回一个求值表达式，可以根据对象属性的值求出最大项，比如item.age。也可以通过自定义函数返回求值表达式。
 */
function maxBy(arr, iteratee) {
    let values = [];
    if (typeof iteratee === 'string') {
        values = arr.map(item => item[iteratee]);
    } else if (typeof iteratee === 'function') {
        values = arr.map((item, index) => {
            return iteratee(item, index, arr);
        });
    }
    const maxOne = Math.max(...values);
    const maxIndex = values.findIndex(item => item === maxOne);
    return arr[maxIndex];
}

```
利用这个高阶函数，我们就可以求出数组中年纪最大的那个人。
``` js
var list = [
  {name: '小明', age: 18},
  {name: '小红', age: 19},
  {name: '小李', age: 20}
]
// 根据age字段求出最大项，结果是小李。
var maxItem = maxBy(list, 'age');

```
我们甚至可以定义更复杂的求值规则，比如我们需要根据一个字符串类型的属性来判定优先级。

这个时候，就必须传一个自定义的函数作为参数了。

``` js
const list = [
  {name: '小明', priority: 'middle'},
  {name: '小红', priority: 'low'},
  {name: '小李', priority: 'high'}
]
const maxItem = maxBy(list, function(item) {
  const { priority } = item
  let obj = {
      low: 1,
      middle: 2,
      high: 3
  }
  const priorityValue = obj[priority];
  return priorityValue;
});

```
<font color=#FF0000 >maxBy</font>
接受的参数最终都应该能转化为一个
<font color=#FF0000 >Math.max</font>
可度量的值，否则就没有可比较性了。

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
::: tip TIP
在计算机科学中，柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。

:::
